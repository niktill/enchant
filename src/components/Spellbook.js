import React, { Component } from "react";
import { connect } from "react-redux";
import FilterSpells from './FilterSpells';
import SpellList from './SpellList';
import { selectSpellbookSpell } from "../actions";

class Spellbook extends Component {
  render() {
    return (
      <div>
        <FilterSpells spellTabName='spellBookSpells' />
        <SpellList spellTabName='spellBookSpells'
          spells={this.props.spellbookSpells}
          spellListMonitors={this.props.selectedSpellbookSpells}
          selectSpellAction={spell => this.props.selectSpellbookSpell(spell)} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    spellbookSpells: state.spellbookSpells,
    selectedSpellbookSpells: state.selectedSpellbookSpells
  };
};

export default connect(mapStateToProps, { selectSpellbookSpell })(Spellbook);
