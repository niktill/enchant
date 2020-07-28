import React, { Component } from "react";
import { connect } from "react-redux";
import FilterSpells from './FilterSpells';
import SpellList from './SpellList';
import { addSpellToSpellbook, removeSpellFromSpellbook } from "../actions";

class AllSpells extends Component {
  render() {
    return (
      <div>
        <FilterSpells spellTabName='allSpells' />
        <SpellList spellTabName='allSpells'
          spells={this.props.apiData.spells}
          spellListMonitors={this.props.spellbookSpells}
          selectSpellAction={spell => this.props.addSpellToSpellbook(spell)} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    apiData: state.apiData,
    spellbookSpells: state.spellbookSpells,
    selectedFilters: state.selectedFilters
  };
};

export default connect(mapStateToProps, { addSpellToSpellbook, removeSpellFromSpellbook })(AllSpells);
