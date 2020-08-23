import React, { Component } from "react";
import { connect } from "react-redux";
import FilterSpells from './FilterSpells';
import SortSpells from './SortSpells';
import SpellList from './SpellList';
import SpellSlots from './SpellSlots';

class DailySpells extends Component {
  render() {
    return (
      <div>
        <FilterSpells tabName='dailySpells' />
        <SortSpells tabName='dailySpells' />
        <SpellSlots />
        <SpellList tabName='dailySpells'
          spells={this.props.dailySpells}
          selectSpellAction={spell => false} />
      </div>);
  }
}

const mapStateToProps = (state) => {
  return { dailySpells: state.dailySpells };
};

export default connect(mapStateToProps)(DailySpells);
