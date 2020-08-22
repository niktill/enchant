import React, { Component } from "react";
import { connect } from "react-redux";
import { List } from "semantic-ui-react";
import FilterSpells from './FilterSpells';
import SortSpells from './SortSpells';
import SpellList from './SpellList';

class DailySpells extends Component {
  renderSpellbookList() {
    return this.props.dailySpells.map((selectedSpell) => (
      <List.Item key={selectedSpell.name}>
        {selectedSpell.name}
      </List.Item>
    ));
  }

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
