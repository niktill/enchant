import React, { Component } from "react";
import { connect } from "react-redux";
import FilterSpells from './FilterSpells';
import SortSpells from './SortSpells';
import SpellList from './SpellList';
import { selectAllSpellsSpell } from "../actions";

class AllSpells extends Component {
  render() {
    return (
      <div>
        <FilterSpells tabName='allSpells' />
        <SortSpells tabName='allSpells' />
        <SpellList tabName='allSpells'
          spells={this.props.apiData.spells}
          spellListMonitors={this.props.spellbookSpells}
          selectSpellAction={spell => this.props.selectAllSpellsSpell(spell)} />
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

export default connect(mapStateToProps, { selectAllSpellsSpell })(AllSpells);
