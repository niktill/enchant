import React, { Component } from "react";
import { connect } from "react-redux";
import { List, Checkbox } from "semantic-ui-react";
import { selectSpellbookSpell } from "../actions";

class Spellbook extends Component {
  renderSpellbookList() {
    return this.props.spellbookSpells.map((spell) => (
      <List.Item key={spell.name}>
        <Checkbox label={spell.name} onClick={() => this.props.selectSpellbookSpell(spell)}/>
      </List.Item>
    ));
  }

  render() {
    return <List>{this.renderSpellbookList()}</List>;
  }
}

const mapStateToProps = (state) => {
  return { spellbookSpells: state.spellbookSpells };
};

export default connect(mapStateToProps, { selectSpellbookSpell })(Spellbook);
