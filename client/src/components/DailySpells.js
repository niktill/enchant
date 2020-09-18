import React, { Component } from "react";
import { connect } from "react-redux";
import { Icon } from "semantic-ui-react";
import FilterSpells from './FilterSpells';
import SortSpells from './SortSpells';
import SpellList from './SpellList';
import SpellSlots from './SpellSlots';

class DailySpells extends Component {
  render() {
    return (
      <div className='tabContent dailySpells'>
        <SpellSlots />
        <FilterSpells tabName='dailySpells' />
        <SortSpells tabName='dailySpells' />
        <h3 style={{textAlign: 'center'}}><Icon name='magic'/> Prepared Spells</h3>
        <SpellList tabName='dailySpells'
          spells={this.props.dailySpells} />
      </div>);
  }
}

const mapStateToProps = (state) => {
  return { dailySpells: state.dailySpells };
};

export default connect(mapStateToProps)(DailySpells);
