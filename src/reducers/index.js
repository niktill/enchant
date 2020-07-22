import { combineReducers } from 'redux';

const fetchAllSpellsReducer = (allSpells = [], action) => {
    if (action.type === 'FETCH_ALL_SPELLS') {
        const fetchedSpells = (action.payload.results) ? action.payload.results : [];
        return [...fetchedSpells];
    }
    return allSpells;
};

const spellbookSpellsReducer = (spellBookSpells = [], action) => {
    if (action.type === 'ADD_SPELL_TO_SPELLBOOK') {
        return [...spellBookSpells, action.payload];
    } else if (action.type === 'REMOVE_SPELL_FROM_SPELLBOOK') {
        return spellBookSpells.filter( spell => spell.slug !== action.payload.slug);
    } else {
        return spellBookSpells;
    }
};

const selectSpellbookSpellReducer = (selectedSpellbookSpells = [], action) => {
    if (action.type === 'SPELLBOOK_SPELL_SELECT') {
        if (selectedSpellbookSpells.map( spell => spell.slug).includes(action.payload.slug)) {
            return selectedSpellbookSpells.filter( spell => spell.slug !== action.payload.slug);
        }
        return [...selectedSpellbookSpells, action.payload];
    }
    return selectedSpellbookSpells;
};

export default combineReducers({
    allSpells: fetchAllSpellsReducer,
    spellbookSpells: spellbookSpellsReducer,
    selectedSpellbookSpells: selectSpellbookSpellReducer
});