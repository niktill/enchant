import React, { Component } from "react";
import { connect } from "react-redux";
import { List, Checkbox, Grid } from "semantic-ui-react";
import { addSpellToSpellbook, removeSpellFromSpellbook } from "../actions";

class AllSpells extends Component {
  renderAllSpellsList() {
    const numberOfSpells = this.props.allSpells.length;    
    const maxSpellInColumn = 50;
    const numberOfColumns = Math.ceil(numberOfSpells / maxSpellInColumn);
    let AllSpellsColumns = []
    for (let columnNum = 1; columnNum < numberOfColumns + 1; columnNum++) {
      let curSpellIndexMin = 0 + ((columnNum - 1) * maxSpellInColumn);
      let curSpellIndexMax = (numberOfSpells < (columnNum * maxSpellInColumn))
        ? numberOfSpells - 1 : (columnNum * maxSpellInColumn) - 1;
      AllSpellsColumns.push(
        (<Grid.Column key={columnNum}>
          {this.props.allSpells.slice(curSpellIndexMin, curSpellIndexMax).map((spell) => (
            (<List.Item key={"allspells-" + spell.slug}>
              <Checkbox
                label={spell.name}
                checked={this.props.spellbookSpells.includes(spell)}
                onClick={
                  this.props.spellbookSpells.includes(spell)
                    ? () => this.props.removeSpellFromSpellbook(spell)
                    : () => this.props.addSpellToSpellbook(spell)
                }
              />
            </List.Item>)
          ))}
        </Grid.Column>))
    }    
    return <Grid doubling stackable columns={numberOfColumns}>{AllSpellsColumns}</Grid>;
  }

  render() {
    return this.renderAllSpellsList();
  }
}

const mapStateToProps = (state) => {
  return { allSpells: state.allSpells, spellbookSpells: state.spellbookSpells };
};

export default connect(mapStateToProps, { addSpellToSpellbook, removeSpellFromSpellbook })(AllSpells);
