import { combineReducers } from 'redux';

const spellbookSpellsReducer = () => {
    return [
        {name: 'Firebolt', damage: '1d6'},
        {name: 'Magic Missle', damage: '1d4'},
        {name: 'Silent Image', damage: 'N/A'},
        {name: 'Mend', damage: 'N/A'}
    ]
};

const selectSpellbookSpellReducer = (selectedSpellbookSpells = [], action) => {
    if (action.type === 'SPELLBOOK_SPELL_SELECT') {
        if (selectedSpellbookSpells.map( spell => spell.name).includes(action.payload.name)) {
            return selectedSpellbookSpells.filter( spell => spell.name != action.payload.name);
        }
        return [...selectedSpellbookSpells, action.payload];
    }
    return selectedSpellbookSpells;
};

export default combineReducers({
    spellbookSpells: spellbookSpellsReducer,
    selectedSpellbookSpells: selectSpellbookSpellReducer
});