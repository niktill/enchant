import axios from 'axios';
import dnd5eapi from '../apis/dnd5eapi';

// Check if current user is logged in
export const getCurrentUser = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/current_user');
        dispatch({type: 'FETCH_USER', payload: res.data});
    } catch(err) {
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
    } catch(err) {
        console.log(err);
        dispatch({ type: 'API_DATA_ERROR' });
    }
};

// Select Spell Action Creator Action Creator
export const selectSpellbookSpell = (spell) => {
    return {
        type: 'SPELLBOOK_SPELL_SELECT',
        payload: spell
    };
};

// Add Spell to Spellbook Action Creator
export const selectAllSpellsSpell = (spell) => async (dispatch, getState) => {
    const { currentUser, spellbookSpells } = getState();
    if (currentUser) {
        const currentUserSpellBook = spellbookSpells;
        const newSpellBookSpells = currentUserSpellBook.some( el => el.slug === spell.slug) ?
        currentUserSpellBook.filter(spellInBook => spellInBook.slug !== spell.slug) : [...currentUserSpellBook, spell];

        const updateSpellBookSpells = await axios.post('/api/current_user/spellbookspells', {spellBookSpells: newSpellBookSpells});
        if (updateSpellBookSpells.status === 200) {
            dispatch({type: 'ALL_SPELLS_SPELL_SELECT', payload: spell});
        } else {
            console.log('ERROR IN UPDATING SPELLBOOK');
        }
    } else {
        dispatch({type: 'ALL_SPELLS_SPELL_SELECT', payload: spell});
    }
};

// Filter Spells by Dnd Class Action Creator
export const selectSpellFilterClass = (spellFilterClassName, tabName) => {
    return {
        type: 'SPELL_FILTER_CLASS_SELECT',
        payload: {spellFilterClassName: spellFilterClassName, tabName: tabName}
    };
};

// Sort Spells by Level Action Creator
export const selectSortSpellLevel = (sorterName, tabName) => {
    return {
        type: 'SORT_SPELLS_SELECT',
        payload: {sorterName: sorterName, tabName: tabName}
    };
};

// Cast spell from Daily Spells Tab
export const castSpell = (spellLevel) => {
    return {
        type: 'CAST_SPELL',
        payload: {spellLevel: spellLevel}
    };
};

// Refill spell slots on Daily Spells Tab
export const refillSpellSlots = () => {
    return {
        type: 'REFILL_SPELL_SLOTS'
    };
};

// Set max spell slots on Daily Spells Tab
export const setMaxSpellSlots = (spellLevel, maxSpellSlots) => {
    if (!maxSpellSlots) {
        maxSpellSlots = 0;
    }
    return {
        type: 'SET_MAX_SPELL_SLOTS',
        payload: {spellLevel: spellLevel, maxSpellSlots: maxSpellSlots}
    };
};