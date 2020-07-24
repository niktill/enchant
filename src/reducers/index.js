import { combineReducers } from 'redux';

// Reducer for fetching API data
const fetchAPIDataReducer = (apiData = {}, action) => {
    if (action.type === 'API_DATA_FETCHED') {
        apiData = action.payload;
        apiData.complete = 1;
    }
    return apiData;
};

// Reducer that manages spells in spell book
const spellbookSpellsReducer = (spellBookSpells = [], action) => {
    if (action.type === 'ADD_SPELL_TO_SPELLBOOK') {
        return [...spellBookSpells, action.payload];
    } else if (action.type === 'REMOVE_SPELL_FROM_SPELLBOOK') {
        return spellBookSpells.filter( spell => spell.slug !== action.payload.slug);
    }
    return spellBookSpells;
};

// Reducer that manages selected spells (daily spells)
const selectSpellbookSpellReducer = (selectedSpellbookSpells = [], action) => {
    if (action.type === 'SPELLBOOK_SPELL_SELECT') {
        if (selectedSpellbookSpells.map( spell => spell.slug).includes(action.payload.slug)) {
            return selectedSpellbookSpells.filter( spell => spell.slug !== action.payload.slug);
        }
        return [...selectedSpellbookSpells, action.payload];
    } else if (action.type === 'REMOVE_SPELL_FROM_SPELLBOOK') {
        return selectedSpellbookSpells.filter( spell => spell.slug !== action.payload.slug);
    }
    return selectedSpellbookSpells;
};

export default combineReducers({
    apiData: fetchAPIDataReducer,
    spellbookSpells: spellbookSpellsReducer,
    selectedSpellbookSpells: selectSpellbookSpellReducer
});