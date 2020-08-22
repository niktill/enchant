import { combineReducers } from 'redux';

// Reducer for fetching API data
const fetchAPIDataReducer = (apiData = {}, action) => {
    if (action.type === 'API_DATA_FETCHED') {
        apiData = action.payload;
        apiData.complete = 1;
    } else if (action.type === 'API_DATA_ERROR') {
        apiData = {...apiData, error: 1};
    }
    return apiData;
};

// Reducer that manages spells in spell book
const spellbookSpellsReducer = (spellBookSpells = [], action) => {
    if (action.type === 'ALL_SPELLS_SPELL_SELECT') {
        if (spellBookSpells.includes(action.payload)){
            return spellBookSpells.filter(spell => spell.slug !== action.payload.slug);
        }
        return [...spellBookSpells, action.payload]
    }
    return spellBookSpells;
};

// Reducer that manages daily spells
const dailySpellsReducer = (dailySpells = [], action) => {
    if (action.type === 'SPELLBOOK_SPELL_SELECT') {
        if (dailySpells.includes(action.payload)) {
            return dailySpells.filter(spell => spell.slug !== action.payload.slug);
        }
        return [...dailySpells, action.payload];
    } else if (action.type === 'ALL_SPELLS_SPELL_SELECT') {
        return dailySpells.filter(spell => spell.slug !== action.payload.slug);
    }
    return dailySpells;
};

//Reducer that manages spell filters for different tabs
const filterDefault = {
    dailySpells: { classes: [], level: [] },
    spellBookSpells: { classes: [], level: [] },
    allSpells: { classes: [], level: [] }
}
const selectFilterReducer = (spellFilters = filterDefault, action) => {
    if (action.type === 'SPELL_FILTER_CLASS_SELECT') {
        let newFilters = JSON.parse(JSON.stringify(spellFilters));
        let classFilterList = newFilters[action.payload.tabName].classes;
        if (classFilterList.includes(action.payload.spellFilterClassName)) {
            newFilters[action.payload.tabName].classes = classFilterList.filter(
                spellFilterClassName => spellFilterClassName !== action.payload.spellFilterClassName);
            return newFilters;
        }
        newFilters[action.payload.tabName].classes = [...classFilterList, action.payload.spellFilterClassName];
        return newFilters;
    }
    return spellFilters;
};

//Reducer that manages spell sorting for different tabs
const sortDefault = {
    dailySpells: 'alpha-down',
    spellBookSpells: 'alpha-down',
    allSpells: 'alpha-down'
}
const selectSortingReducer = (spellSorters = sortDefault, action) => {
    if (action.type === 'SORT_SPELLS_SELECT') {
        return { ...spellSorters, [action.payload.tabName]: action.payload.sorterName };
    }
    return spellSorters;
};

export default combineReducers({
    apiData: fetchAPIDataReducer,
    spellbookSpells: spellbookSpellsReducer,
    dailySpells: dailySpellsReducer,
    selectedFilters: selectFilterReducer,
    selectedSorter: selectSortingReducer
});