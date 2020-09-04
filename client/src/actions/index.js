import axios from 'axios';
import dnd5eapi from '../apis/dnd5eapi';

// Check Log in status
export const checkLogInStatus = () => async (dispatch, getState) => {
    try {
        await axios.get('/api/status');
        dispatch({ type: 'LOG_IN_STATUS_SUCCESS' });
        return true;
    } catch (err) { // backend status is not good
        dispatch({ type: 'LOG_IN_STATUS_FAIL' });
        dispatch({
            type: 'ACTIVATE_ERROR_MESSAGE',
            payload: { type: 'Log in currently unavailable', message: 'We are currently facing an issue with our log in service. Sorry!' }
        });
        throw err;
    }
};

// Check if current user is logged in, and if so, serialize spell names from user lists into spells from api
export const getCurrentUser = () => async (dispatch, getState) => {
    try {
        const { apiData } = getState();
        const res = await axios.get('/api/current_user');
        const serializedSpellBookSpells = apiData.spells.filter(spell => res.data.spellBookSpells.includes(spell.slug));
        const serializedDailySpells = apiData.spells.filter(spell => res.data.dailySpells.includes(spell.slug));
        dispatch(
            {
                type: 'FETCH_USER',
                payload: { ...res.data, spellBookSpells: serializedSpellBookSpells, dailySpells: serializedDailySpells }
            });
        return true;
    } catch (err) {
        dispatch({ type: 'FETCH_USER', payload: '' });
        return false;
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
        return true;
    } catch (err) {
        console.log(err);
        dispatch({ type: 'API_DATA_ERROR' });
        throw err;
    }
};

// App ready to render action
export const appReadytoRender = () => {
    return {
        type: 'APP_READY',
    };
};

// Select Spellbook Spell Action Creator
export const selectSpellbookSpell = (spell) => async (dispatch, getState) => {
    const { currentUser, dailySpells } = getState();
    // Check if user signed in
    if (currentUser) {
        try {
            const currentDailySpells = dailySpells;
            const newDailySpells = currentDailySpells.some(el => el.slug === spell.slug) ?
                currentDailySpells.filter(spellInDailySpell => spellInDailySpell.slug !== spell.slug) : [...currentDailySpells, spell];
            await axios.post('/api/current_user/dailyspells', { dailySpells: newDailySpells.map(spell => spell.slug) });
        } catch {
            dispatch({ // error in saving spell book spell to account
                type: 'ACTIVATE_ERROR_MESSAGE',
                payload: { type: 'Error in selecting spellbook spell', message: 'Could not save spellbook spell selection to your account.' }
            });
        }
    }
    dispatch({ type: 'SPELLBOOK_SPELL_SELECT', payload: spell });
};

// Select All Spell Action Creator
export const selectAllSpellsSpell = (spell) => async (dispatch, getState) => {
    const { currentUser, spellbookSpells, dailySpells } = getState();
    // Check if user signed in
    if (currentUser) {
        try {
            const currentUserSpellBook = spellbookSpells;
            const newSpellBookSpells = currentUserSpellBook.some(el => el.slug === spell.slug) ?
                currentUserSpellBook.filter(spellInBook => spellInBook.slug !== spell.slug) : [...currentUserSpellBook, spell];
            await axios.post('/api/current_user/spellbookspells', { spellBookSpells: newSpellBookSpells.map(spell => spell.slug) });
            // Do we need to remove a spell from Daily spell?
            if (dailySpells.some(el => el.slug === spell.slug)) {
                const newDailySpells = dailySpells.filter(spellInDailySpell => spellInDailySpell.slug !== spell.slug);
                await axios.post('/api/current_user/dailyspells', { dailySpells: newDailySpells.map(spell => spell.slug) });
            }
        } catch { // error in saving all spell select to account
            dispatch({
                type: 'ACTIVATE_ERROR_MESSAGE',
                payload: { type: 'Error in selecting spell', message: 'Could not save spell select to your account.' }
            });
        }

    }
    dispatch({ type: 'ALL_SPELLS_SPELL_SELECT', payload: spell });
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
        try {
            const newSpellSlots = spellSlots.map((el, index) => index + 1 === spellLevel ? [el[0] - 1, el[1]] : el);
            await axios.post('/api/current_user/spellslots', { spellSlots: newSpellSlots });
        } catch { // error in saving spell cast to account
            dispatch({
                type: 'ACTIVATE_ERROR_MESSAGE',
                payload: { type: 'Error in casting spell', message: 'Could not save spell cast to your account.' }
            });
        }
    }
    dispatch({ type: 'CAST_SPELL', payload: { spellLevel: spellLevel } });
};

// Refill spell slots on Daily Spells Tab
export const refillSpellSlots = () => async (dispatch, getState) => {
    const { currentUser, spellSlots } = getState();
    // check if user is signed in
    if (currentUser) {
        try {
            const newSpellSlots = spellSlots.map(el => [el[1], el[1]]);
            await axios.post('/api/current_user/spellslots', { spellSlots: newSpellSlots });
        } catch { // error in saving refill spell slots to account
            dispatch({
                type: 'ACTIVATE_ERROR_MESSAGE',
                payload: { type: 'Error in refilling spell slots', message: 'Could not save spell slot refill to your account.' }
            });
        }
    }
    dispatch({ type: 'REFILL_SPELL_SLOTS' });
};

// Set max spell slots on Daily Spells Tab
export const setMaxSpellSlots = (spellLevel, maxSpellSlots) => async (dispatch, getState) => {
    if (!maxSpellSlots || maxSpellSlots < 0) {
        maxSpellSlots = 0;
    }
    const { currentUser, spellSlots } = getState();
    // check if user is signed in
    if (currentUser) {
        try {
            const currentSpellSlots = spellSlots;
            const newCurSpellSlots = (currentSpellSlots[spellLevel - 1][0] > maxSpellSlots) ? maxSpellSlots : spellSlots[spellLevel - 1][0]
            const newSpellSlots = currentSpellSlots.map((el, index) => ((index + 1) === spellLevel) ? [newCurSpellSlots, maxSpellSlots] : el);
            await axios.post('/api/current_user/spellslots', { spellSlots: newSpellSlots });
        } catch { // error in setting max spell slot to account
            dispatch({
                type: 'ACTIVATE_ERROR_MESSAGE',
                payload: { type: 'Error in setting spell slots', message: 'Could not save spell slots change to your account.' }
            });
        }
    }
    dispatch({ type: 'SET_MAX_SPELL_SLOTS', payload: { spellLevel: spellLevel, maxSpellSlots: maxSpellSlots } });
};

// Close Error Message Action Creator
export const closeErrorMessage = () => {
    return {
        type: 'CLOSE_ERROR_MESSAGE'
    };
};