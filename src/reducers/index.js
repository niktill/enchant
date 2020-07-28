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
        return spellBookSpells.filter(spell => spell.slug !== action.payload.slug);
    }
    return spellBookSpells;
};

// Reducer that manages selected spells (daily spells)
const selectSpellbookSpellReducer = (selectedSpellbookSpells = [], action) => {
    if (action.type === 'SPELLBOOK_SPELL_SELECT') {
        if (selectedSpellbookSpells.map(spell => spell.slug).includes(action.payload.slug)) {
            return selectedSpellbookSpells.filter(spell => spell.slug !== action.payload.slug);
        }
        return [...selectedSpellbookSpells, action.payload];
    } else if (action.type === 'REMOVE_SPELL_FROM_SPELLBOOK') {
        return selectedSpellbookSpells.filter(spell => spell.slug !== action.payload.slug);
    }
    return selectedSpellbookSpells;
};

const filterDefault = {
    dailySpells: { classes: [], level: [] },
    spellBookSpells: { classes: [], level: [] },
    allSpells: { classes: [], level: [] }
}
//Reducer that manages spell filters
const selectFilterReducer = (spellFilters = filterDefault, action) => {
    if (action.type === 'SELECT_SPELL_FILTER_CLASS') {
        let newFilters = JSON.parse(JSON.stringify(spellFilters));
        let classFilterList = newFilters[action.payload.spellTabName].classes;
        if (classFilterList.includes(action.payload.spellFilterClassName)) {
            newFilters[action.payload.spellTabName].classes = classFilterList.filter(
                spellFilterClassName => spellFilterClassName !== action.payload.spellFilterClassName);
            return newFilters;
        }
        newFilters[action.payload.spellTabName].classes = [...classFilterList, action.payload.spellFilterClassName];
        return newFilters;
    }
    return spellFilters;
};

export default combineReducers({
    apiData: fetchAPIDataReducer,
    spellbookSpells: spellbookSpellsReducer,
    selectedSpellbookSpells: selectSpellbookSpellReducer,
    selectedFilters: selectFilterReducer
});