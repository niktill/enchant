import { combineReducers } from 'redux';

// Reducer for fetching API data
const fetchAPIDataReducer = (apiData = {}, action) => {
    if (action.type === 'API_DATA_FETCHED') {
        apiData = action.payload;
        apiData.complete = 1;
    } else if (action.type === 'API_DATA_ERROR') {
        apiData = { ...apiData, error: 1 };
    }
    return apiData;
};

// Reducer that manages spells in spell book
const spellbookSpellsReducer = (spellBookSpells = [], action) => {
    if (action.type === 'ALL_SPELLS_SPELL_SELECT') {
        if (spellBookSpells.includes(action.payload)) {
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
    dailySpells: 'level_int',
    spellBookSpells: 'level_int',
    allSpells: 'level_int'
}
const selectSortingReducer = (spellSorters = sortDefault, action) => {
    if (action.type === 'SORT_SPELLS_SELECT') {
        return { ...spellSorters, [action.payload.tabName]: action.payload.sorterName };
    }
    return spellSorters;
};

// Reducer for spells slots used
// format of spellSlotsDefault array: index = spell level (0 is cantrips), 
// each sub-array element in array is [currentSpellSlots, maxSpellSlot] 
// (e.g. spellSlotsDefault[1][0] = current spell slots left for 1st level spells)
const spellSlotsDefault = [[0,0],[1,1],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]];
const spellSlotsReducer = (spellSlots = spellSlotsDefault, action) => {
    if (action.type === 'REFILL_ALL_SPELL_SLOTS') {
        return spellSlotsDefault.map(el => el[0] = el[1]);
    } else if (action.type === 'CAST_SPELL') {
        return spellSlotsDefault.map(el => el[1] === action.payload.spellLevel ? [el[0] - 1, el[1]] : el);
    }
    return spellSlots;
};

export default combineReducers({
    apiData: fetchAPIDataReducer,
    spellbookSpells: spellbookSpellsReducer,
    dailySpells: dailySpellsReducer,
    selectedFilters: selectFilterReducer,
    selectedSorter: selectSortingReducer,
    spellSlots: spellSlotsReducer
});