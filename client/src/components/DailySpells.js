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
        <SpellSlots />
        <FilterSpells tabName='dailySpells' />
        <SortSpells tabName='dailySpells' />
        <SpellList tabName='dailySpells'
          spells={this.props.dailySpells} />
      </div>);
  }
}

const mapStateToProps = (state) => {
  return { dailySpells: state.dailySpells };
};

export default connect(mapStateToProps)(DailySpells);
