import axios from 'axios';
import dnd5eapi from '../apis/dnd5eapi';

// Check if current user is logged in
export const getCurrentUser = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/current_user');
        dispatch({ type: 'FETCH_USER', payload: res.data });
    } catch (err) {
        console.log(err);
    }
}

// Fetch API data Action Creator
export const fetchAPIData = () => async (dispatch) => {
    const listOfNonSpellCasters = ['Barbarian', 'Fighter', 'Monk', 'Rogue'];
    let data = { spells: [], classes: [] }
    let pageNum = 1;
    const pageNumEnd = 7;
    try {
        // Fetch spell Data from API
        for (pageNum; pageNum < pageNumEnd + 1; pageNum++) {
            let response = await dnd5eapi.get('/spells/?page=' + pageNum.toString());
            if (response.status === 200) {
                data.spells = [...data.spells, ...response.data.results]
            }
        }
        // Fetch class data from API
        let response = await dnd5eapi.get('/classes');
        if (response.status === 200) {
            data.classes = response.data.results.filter(classFromAPI => !listOfNonSpellCasters.includes(classFromAPI.name));
        }
        dispatch({ type: 'API_DATA_FETCHED', payload: data });
    } catch (err) {
        console.log(err);
        dispatch({ type: 'API_DATA_ERROR' });
    }
};

// Select Spellbook Spell Action Creator
export const selectSpellbookSpell = (spell) => async (dispatch, getState) => {
    const { currentUser, dailySpells } = getState();
    // Check if user signed in
    if (currentUser) {
        const currentDailySpells = dailySpells;
        const newDailySpells = currentDailySpells.some(el => el.slug === spell.slug) ?
            currentDailySpells.filter(spellInDailySpell => spellInDailySpell.slug !== spell.slug) : [...currentDailySpells, spell];

        const updateDailySpells = await axios.post('/api/current_user/dailyspells', { dailySpells: newDailySpells });
        if (updateDailySpells.status === 200) {
            dispatch({ type: 'SPELLBOOK_SPELL_SELECT', payload: spell });
        } else {
            console.log('ERROR IN UPDATING DAILY SPELLS');
        }
    } else { // no user is signed in, no api calls needed
        dispatch({ type: 'SPELLBOOK_SPELL_SELECT', payload: spell });
    }
};

// Select All Spell Action Creator
export const selectAllSpellsSpell = (spell) => async (dispatch, getState) => {
    const { currentUser, spellbookSpells, dailySpells } = getState();
    // Check if user signed in
    if (currentUser) {
        const currentUserSpellBook = spellbookSpells;
        const newSpellBookSpells = currentUserSpellBook.some(el => el.slug === spell.slug) ?
            currentUserSpellBook.filter(spellInBook => spellInBook.slug !== spell.slug) : [...currentUserSpellBook, spell];

        const updateSpellBookSpells = await axios.post('/api/current_user/spellbookspells', { spellBookSpells: newSpellBookSpells });
        if (updateSpellBookSpells.status === 200) {
            // Do we need to remove a spell from Daily spell?
            if (dailySpells.some(el => el.slug === spell.slug)) {
                const newDailySpells = dailySpells.filter(spellInDailySpell => spellInDailySpell.slug !== spell.slug);
                const updateDailySpells = await axios.post('/api/current_user/dailyspells', { dailySpells: newDailySpells });
                if (updateDailySpells.status === 200) {
                    dispatch({ type: 'ALL_SPELLS_SPELL_SELECT', payload: spell });
                } else {
                    console.log('ERROR IN REMOVING DAILY SPELL');
                }
            } else { // No need to remove daily spell
                dispatch({ type: 'ALL_SPELLS_SPELL_SELECT', payload: spell });
            }
        } else {
            console.log('ERROR IN UPDATING SPELLBOOK');
        }
    } else { // no user is signed in, no api calls needed
        dispatch({ type: 'ALL_SPELLS_SPELL_SELECT', payload: spell });
    }
};

// Filter Spells by Dnd Class Action Creator
export const selectSpellFilterClass = (spellFilterClassName, tabName) => {
    return {
        type: 'SPELL_FILTER_CLASS_SELECT',
        payload: { spellFilterClassName: spellFilterClassName, tabName: tabName }
    };
};

// Sort Spells by Level Action Creator
export const selectSortSpellLevel = (sorterName, tabName) => {
    return {
        type: 'SORT_SPELLS_SELECT',
        payload: { sorterName: sorterName, tabName: tabName }
    };
};

// Cast spell from Daily Spells Tab
export const castSpell = (spellLevel) => async (dispatch, getState) => {
    const { currentUser, spellSlots } = getState();
    // check if user is signed in
    if (currentUser) {
        const newSpellSlots = spellSlots.map((el, index) => index + 1 === spellLevel ? [el[0] - 1, el[1]] : el);
        const updateSpellSlots = await axios.post('/api/current_user/spellslots', {spellSlots: newSpellSlots});
        if (updateSpellSlots.status === 200) {
            dispatch({ type: 'CAST_SPELL', payload : {spellLevel: spellLevel}});
        } else {
            console.log('ERROR IN CASTING SPELL');
        }
    } else { // no user is signed in, no api call needed
        dispatch({ type: 'CAST_SPELL', payload : {spellLevel: spellLevel}});
    }
};

// Refill spell slots on Daily Spells Tab
export const refillSpellSlots = () => async (dispatch, getState) => {
    const { currentUser, spellSlots } = getState();
    // check if user is signed in
    if (currentUser) {
        const newSpellSlots = spellSlots.map(el => [el[1], el[1]]);
        const updateSpellSlots = await axios.post('/api/current_user/spellslots', {spellSlots: newSpellSlots});
        if (updateSpellSlots.status === 200) {
            dispatch({ type: 'REFILL_SPELL_SLOTS'});
        } else {
            console.log('ERROR IN SETTING REFILLING SPELL SLOTS');
        }
    } else { // no user is signed in, no api call needed
        dispatch({ type: 'REFILL_SPELL_SLOTS'});
    }
};

// Set max spell slots on Daily Spells Tab
export const setMaxSpellSlots = (spellLevel, maxSpellSlots) => async (dispatch, getState) => {
    if (!maxSpellSlots) {
        maxSpellSlots = 0;
    }
    const { currentUser, spellSlots } = getState();
    // check if user is signed in
    if (currentUser) {
        const currentSpellSlots = spellSlots;
        const newCurSpellSlots = (currentSpellSlots[spellLevel - 1][0] > maxSpellSlots) ? maxSpellSlots : spellSlots[spellLevel - 1][0]
        const newSpellSlots = currentSpellSlots.map((el, index) => ((index + 1) === spellLevel) ? [newCurSpellSlots, maxSpellSlots] : el);
        const updateSpellSlots = await axios.post('/api/current_user/spellslots', {spellSlots: newSpellSlots});
        if (updateSpellSlots.status === 200) {
            dispatch({ type: 'SET_MAX_SPELL_SLOTS', payload: { spellLevel: spellLevel, maxSpellSlots: maxSpellSlots }});
        } else {
            console.log('ERROR IN SETTING MAX SPELL SLOTS');
        }
    } else { // no user is signed in, no api call needed
        dispatch({ type: 'SET_MAX_SPELL_SLOTS', payload: { spellLevel: spellLevel, maxSpellSlots: maxSpellSlots }});
    }
};