import React, { Component } from "react";
import { connect } from "react-redux";
import { List, Checkbox } from "semantic-ui-react";
import {
  addSpellToSpellbook,
  removeSpellFromSpellbook,
  fetchAllSpells,
} from "../actions";

class Spellbook extends Component {
  componentDidMount() {
    this.props.fetchAllSpells();
  }

  renderAllSpellsList() {
    return this.props.allSpells.map((spell) => (
      <List.Item key={"allspells-" + spell.name}>
        <Checkbox
          label={spell.name}
          checked={this.props.spellbookSpells.includes(spell)}
          onClick={
            this.props.spellbookSpells.includes(spell)
              ? () => this.props.removeSpellFromSpellbook(spell)
              : () => this.props.addSpellToSpellbook(spell)
          }
        />
      </List.Item>
    ));
  }

  render() {
    return <List>{this.renderAllSpellsList()}</List>;
  }
}

const mapStateToProps = (state) => {
  return { allSpells: state.allSpells, spellbookSpells: state.spellbookSpells };
};

export default connect(mapStateToProps, {
  addSpellToSpellbook,
  fetchAllSpells,
  removeSpellFromSpellbook,
})(Spellbook);
