import dnd5eapi from '../apis/dnd5eapi';

// Select Spell Action Creator
export const selectSpellbookSpell = (spell) => {
    return {
        type: 'SPELLBOOK_SPELL_SELECT',
        payload: spell
    };
};

// Fetch all spells from API Action Creator
export const fetchAllSpells = () => async (dispatch) => {
    const response = await dnd5eapi.get('/spells');
    dispatch({ type: 'FETCH_ALL_SPELLS', payload: response.data})
};