import { combineReducers } from 'redux';

// reducer to check status of login
const loginStatusReducer = (loginStatus = 0, action) => {
  if (action.type === 'LOG_IN_STATUS_SUCCESS') {
    return true;
  } else if (action.type === 'LOG_IN_STATUS_FAIL') {
    return false;
  }
  return loginStatus;
};

// reducer to help determine if user is logged in
const authReducer = (user = null, action) => {
  if (action.type === 'FETCH_USER') {
    return action.payload || false;
  }
  return user;
};

// Reducer for fetching API data
const fetchAPIDataReducer = (apiData = {}, action) => {
  if (action.type === 'API_DATA_FETCHED') {
    apiData = { ...action.payload, complete: true };
  } else if (action.type === 'API_DATA_ERROR') {
    apiData = { ...apiData, error: true };
  }
  return apiData;
};

// Reducer to check when App is ready to render
const appReadyReducer = (appReady = false, action) => {
  if (action.type === 'APP_READY') {
    return true;
  }
  return appReady;
};

// Reducer to track app view and screen width
const currWindowWidth = document.documentElement.clientWidth;
const appViewReducer = (
  appView = { mobile: currWindowWidth <= 767, windowWidth: currWindowWidth },
  action
) => {
  if (action.type === 'SET_APP_VIEW') {
    const newWindowWidth = action.payload.windowWidth;
    return { mobile: newWindowWidth <= 767, windowWidth: newWindowWidth };
  }
  return appView;
};

// Reducer that manages spells in spell book
const spellbookSpellsReducer = (spellBookSpells = [], action) => {
  if (action.type === 'FETCH_USER') {
    if (action.payload.spellBookSpells) {
      return [...action.payload.spellBookSpells];
    }
  } else if (action.type === 'ALL_SPELLS_SPELL_SELECT') {
    if (spellBookSpells.some((spell) => spell.slug === action.payload.slug)) {
      return spellBookSpells.filter(
        (spell) => spell.slug !== action.payload.slug
      );
    }
    return [...spellBookSpells, action.payload];
  } else if (action.type === 'RESET_ACCOUNT') {
    return [];
  }
  return spellBookSpells;
};

// Reducer that manages daily spells
const dailySpellsReducer = (dailySpells = [], action) => {
  if (action.type === 'FETCH_USER') {
    if (action.payload.dailySpells) {
      return [...action.payload.dailySpells];
    }
  } else if (action.type === 'SPELLBOOK_SPELL_SELECT') {
    if (dailySpells.some((spell) => spell.slug === action.payload.slug)) {
      return dailySpells.filter((spell) => spell.slug !== action.payload.slug);
    }
    return [...dailySpells, action.payload];
  } else if (action.type === 'ALL_SPELLS_SPELL_SELECT') {
    return dailySpells.filter((spell) => spell.slug !== action.payload.slug);
  } else if (action.type === 'RESET_ACCOUNT') {
    return [];
  }
  return dailySpells;
};

//Reducer that manages spell filters for different tabs
const filterDefault = {
  dailySpells: { classes: [], level: [] },
  spellBookSpells: { classes: [], level: [] },
  allSpells: { classes: [], level: [] },
};
const selectFilterReducer = (spellFilters = filterDefault, action) => {
  if (action.type === 'SPELL_FILTER_CLASS_SELECT') {
    let newFilters = JSON.parse(JSON.stringify(spellFilters));
    let classFilterList = newFilters[action.payload.tabName].classes;
    if (classFilterList.includes(action.payload.spellFilterClassName)) {
      newFilters[action.payload.tabName].classes = classFilterList.filter(
        (spellFilterClassName) =>
          spellFilterClassName !== action.payload.spellFilterClassName
      );
      return newFilters;
    }
    newFilters[action.payload.tabName].classes = [
      ...classFilterList,
      action.payload.spellFilterClassName,
    ];
    return newFilters;
  }
  return spellFilters;
};

//Reducer that manages spell sorting for different tabs
const sortDefault = {
  dailySpells: 'level_int',
  spellBookSpells: 'level_int',
  allSpells: 'level_int',
};
const selectSortingReducer = (spellSorters = sortDefault, action) => {
  if (action.type === 'SORT_SPELLS_SELECT') {
    return {
      ...spellSorters,
      [action.payload.tabName]: action.payload.sorterName,
    };
  }
  return spellSorters;
};

// Reducer for spells slots used
// format of spellSlotsDefault array: index + 1 = spell level,
// each sub-array element in array is [currentSpellSlots, maxSpellSlot]
// (e.g. spellSlotsDefault[0][0] = current spell slots left for 1st level spells)
const spellSlotsDefault = [
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
];
const spellSlotsReducer = (spellSlots = spellSlotsDefault, action) => {
  if (action.type === 'FETCH_USER') {
    if (action.payload.spellSlots) {
      return action.payload.spellSlots;
    }
  } else if (action.type === 'REFILL_SPELL_SLOTS') {
    return spellSlots.map((el) => [el[1], el[1]]);
  } else if (action.type === 'CAST_SPELL') {
    return spellSlots.map((el, index) =>
      index + 1 === action.payload.spellLevel ? [el[0] - 1, el[1]] : el
    );
  } else if (action.type === 'SET_MAX_SPELL_SLOTS') {
    return spellSlots.map((el, index) =>
      index + 1 === action.payload.spellLevel
        ? [action.payload.maxSpellSlots, action.payload.maxSpellSlots]
        : el
    );
  } else if (action.type === 'RESET_ACCOUNT') {
    return spellSlotsDefault;
  }
  return spellSlots;
};

// Send error message reducer
const sendEnchantMessageReducer = (enchantMessage = {}, action) => {
  if (action.type === 'ACTIVATE_ERROR_MESSAGE') {
    return {
      header: action.payload.header,
      message: action.payload.message,
      type: 'error',
      active: true,
    };
  } else if (action.type === 'ACTIVATE_SUCCESS_MESSAGE') {
    return {
      header: action.payload.header,
      message: action.payload.message,
      type: 'success',
      active: true,
    };
  } else if (action.type === 'CLOSE_ENCHANT_MESSAGE') {
    return { ...enchantMessage, active: false };
  }
  return { ...enchantMessage };
};

export default combineReducers({
  apiData: fetchAPIDataReducer,
  spellbookSpells: spellbookSpellsReducer,
  dailySpells: dailySpellsReducer,
  selectedFilters: selectFilterReducer,
  selectedSorter: selectSortingReducer,
  spellSlots: spellSlotsReducer,
  currentUser: authReducer,
  enchantMessage: sendEnchantMessageReducer,
  loginStatus: loginStatusReducer,
  appReady: appReadyReducer,
  appView: appViewReducer,
});
