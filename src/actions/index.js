import dnd5eapi from '../apis/dnd5eapi';

// Fetch API data Action Creator
export const fetchAPIData = () => async (dispatch) => {
    const listOfNonSpellCasters = ['Barbarian', 'Fighter', 'Monk', 'Rogue'];
    let data = { spells: [], classes: [] }
    let pageNum = 1;
    const pageNumEnd = 7;
    try {
        // Fetch spell Data from API
        for (pageNum; pageNum < pageNumEnd + 1; pageNum++) {
            let response = await dnd5eapi.get('/spells?page=' + pageNum.toString());
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
export const addSpellToSpellbook = (spell) => {
    return {
        type: 'ADD_SPELL_TO_SPELLBOOK',
        payload: spell
    };
};

// Remove Spell from Spellbook Action Creator
export const removeSpellFromSpellbook = (spell) => {
    return {
        type: 'REMOVE_SPELL_FROM_SPELLBOOK',
        payload: spell
    };
};

// Filter Spells by Dnd Class Action Creator
export const selectSpellFilterClass = (spellFilterClassName) => {
    return {
        type: 'SELECT_SPELL_FILTER_CLASS',
        payload: spellFilterClassName
    };
};