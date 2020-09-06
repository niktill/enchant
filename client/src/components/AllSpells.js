import React, { Component } from "react";
import { connect } from "react-redux";
import { Icon } from "semantic-ui-react";
import FilterSpells from './FilterSpells';
import SortSpells from './SortSpells';
import SpellList from './SpellList';
import { selectAllSpellsSpell } from "../actions";

class AllSpells extends Component {
  render() {
    return (
      <div className='tabContent'>
        <FilterSpells tabName='allSpells' />
        <SortSpells tabName='allSpells' />
        {this.props.showHeader ? <h3 style={{textAlign: 'center'}}><Icon name='list' /> All Spells </h3> : null}
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
