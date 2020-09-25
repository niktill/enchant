import React, { Component } from "react";
import { connect } from "react-redux";
import { Icon } from "semantic-ui-react";
import FilterSpells from './FilterSpells';
import SortSpells from './SortSpells';
import SpellList from './SpellList';
import { selectSpellbookSpell } from "../actions";

class Spellbook extends Component {
  render() {
    return (
      <div className='tabContent'>
        <FilterSpells tabName='spellBookSpells' />
        <SortSpells tabName='spellBookSpells' />
        {this.props.appView.mobile ? <h3 style={{textAlign: 'center'}}><Icon name='book' /> Spell Book </h3> : null}
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
    dailySpells: state.dailySpells,
    appView: state.appView
  };
};

export default connect(mapStateToProps, { selectSpellbookSpell })(Spellbook);
