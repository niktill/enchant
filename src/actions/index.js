import dnd5eapi from '../apis/dnd5eapi';

// Select Spell Action Creator
export const selectSpellbookSpell = (spell) => {
    return {
        type: 'SPELLBOOK_SPELL_SELECT',
        payload: spell
    };
};

// Add Spell to Spellbook
export const addSpellToSpellbook = (spell) => {
    return {
        type: 'ADD_SPELL_TO_SPELLBOOK',
        payload: spell
    };
};

// Remove Spell from Spellbook
export const removeSpellFromSpellbook = (spell) => {
    return {
        type: 'REMOVE_SPELL_FROM_SPELLBOOK',
        payload: spell
    };
};

// Fetch all spells from API Action Creator
export const fetchAllSpells = () => async (dispatch) => {
    let pageNum = 1;
    const pageNumEnd = 7;
    for (pageNum; pageNum < pageNumEnd + 1; pageNum++) {
        try {
            let response = await dnd5eapi.get('/spells?page=' + pageNum.toString());
            if (response.status === 200) {
                dispatch({ type: 'FETCH_ALL_SPELLS', payload: response.data })
            }
        } catch(err) {
            console.log(err);
        }
    }
};