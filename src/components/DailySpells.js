import React, { Component } from "react";
import { connect } from "react-redux";
import FilterSpells from './FilterSpells';
import SortSpells from './SortSpells';
import SpellList from './SpellList';

class DailySpells extends Component {
  render() {
    return (
      <div>
        <FilterSpells tabName='dailySpells' />
        <SortSpells tabName='dailySpells' />
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
