import React, { Component } from "react";
import { connect } from "react-redux";
import { List, Checkbox } from "semantic-ui-react";
import { selectSpellbookSpell, fetchAllSpells } from "../actions";

class Spellbook extends Component {
  componentDidMount() {
    this.props.fetchAllSpells();
  }

  renderAllSpellsList() {
    return this.props.allSpells.map((spell) => (
      <List.Item key={spell.name}>
        <Checkbox
          label={spell.name}
          onClick={() => this.props.selectSpellbookSpell(spell)}
        />
      </List.Item>
    ));
  }

  render() {
    return <List>{this.renderAllSpellsList()}</List>;
  }
}

const mapStateToProps = (state) => {
  return { allSpells: state.allSpells };
};

export default connect(mapStateToProps, {
  selectSpellbookSpell,
  fetchAllSpells,
})(Spellbook);
