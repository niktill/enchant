import React, { Component } from "react";
import { connect } from "react-redux";
import { List } from "semantic-ui-react";

class DailySpells extends Component {
  renderSpellbookList() {
    return this.props.dailySpells.map((selectedSpell) => (
      <List.Item key={selectedSpell.name}>
        {selectedSpell.name}
      </List.Item>
    ));
  }

  render() {
    return <List>{this.renderSpellbookList()}</List>;
  }
}

const mapStateToProps = (state) => {
  return { dailySpells: state.dailySpells };
};

export default connect(mapStateToProps)(DailySpells);
