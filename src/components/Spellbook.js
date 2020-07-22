import React, { Component } from "react";
import { connect } from "react-redux";
import { List, Checkbox } from "semantic-ui-react";
import { selectSpellbookSpell } from "../actions";

class Spellbook extends Component {
  renderSpellbookList() {
    return this.props.spellbookSpells.map((spell) => (
      <List.Item key={'spellbook-' + spell.slug}>
        <Checkbox 
          label={spell.name} 
          checked={this.props.selectedSpellbookSpells.includes(spell)}
          onClick={() => this.props.selectSpellbookSpell(spell)}/>
      </List.Item>
    ));
  }

  render() {
    return <List>{this.renderSpellbookList()}</List>;
  }
}

const mapStateToProps = (state) => {
  return { 
    spellbookSpells: state.spellbookSpells, 
    selectedSpellbookSpells: state.selectedSpellbookSpells };
};

export default connect(mapStateToProps, { selectSpellbookSpell })(Spellbook);
