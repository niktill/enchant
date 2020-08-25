import React, { Component } from "react";
import { connect } from "react-redux";
import FilterSpells from './FilterSpells';
import SortSpells from './SortSpells';
import SpellList from './SpellList';
import { selectSpellbookSpell } from "../actions";

class Spellbook extends Component {
  render() {
    return (
      <div>
        <FilterSpells tabName='spellBookSpells' />
        <SortSpells tabName='spellBookSpells' />
        <SpellList tabName='spellBookSpells'
          spells={this.props.spellbookSpells}
          spellListMonitors={this.props.dailySpells}
          selectSpellAction={spell => this.props.selectSpellbookSpell(spell)} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    spellbookSpells: state.spellbookSpells,
    dailySpells: state.dailySpells
  };
};

export default connect(mapStateToProps, { selectSpellbookSpell })(Spellbook);
