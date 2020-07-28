import React, { Component } from "react";
import { connect } from "react-redux";
import { List, Checkbox, Grid, Message, Container, Popup } from "semantic-ui-react";
import SpellDescription from './SpellDescription';
import { addSpellToSpellbook, removeSpellFromSpellbook } from "../actions";

class SpellList extends Component {
  getFilteredSpells() {
    return this.props.spells.filter((spell) =>
      this.props.selectedFilters[this.props.spellTabName].classes.some((filterSpellClassNames) =>
        spell.dnd_class.includes(filterSpellClassNames))
    );
  }
  renderAllSpellsIntoColumns() {
    const spellsToRender = (this.props.selectedFilters[this.props.spellTabName].classes.length) ?
      this.getFilteredSpells() : this.props.spells;
    const numberOfSpells = spellsToRender.length;
    if (numberOfSpells > 0) {
      const maxSpellInColumn = 50;
      const numberOfColumns = Math.ceil(numberOfSpells / maxSpellInColumn);
      let AllSpellsColumns = [];
      for (let columnNum = 1; columnNum < numberOfColumns + 1; columnNum++) {
        let curSpellIndexMin = 0 + ((columnNum - 1) * maxSpellInColumn);
        let curSpellIndexMax = (numberOfSpells < (columnNum * maxSpellInColumn))
          ? numberOfSpells : (columnNum * maxSpellInColumn) - 1;
        AllSpellsColumns.push(
          (<Grid.Column key={columnNum} computer={3} tablet={4}>
            {spellsToRender.slice(curSpellIndexMin, curSpellIndexMax).map((spell) => {
              return (<List.Item key={this.props.spellTabName + "spells-" + spell.slug}>
                <Popup wide='very' basic size='large' header={spell.name}
                  content={<SpellDescription spell={spell} />}
                  trigger={
                    <Checkbox
                      label={spell.name}
                      checked={this.props.spellListMonitors.includes(spell)}
                      onClick={() => this.props.selectSpellAction(spell)} />} />
              </List.Item>)

            })}
          </Grid.Column>))
      }
      return <Grid className="spellListGrid" stackable doubling>{AllSpellsColumns}</Grid>;
    } else {
      return (
        <Container textAlign='center'>
          <Message compact>
            <Message.Header>No Spells Available</Message.Header>
            <p>There are no spells defined by the filters selected.</p>
          </Message>
        </Container>)
    }
  }

  render() {
    return (
      this.renderAllSpellsIntoColumns()
    )
  }
}

const mapStateToProps = (state) => {
  return {
    spellbookSpells: state.spellbookSpells,
    selectedFilters: state.selectedFilters
  };
};

export default connect(mapStateToProps, { addSpellToSpellbook, removeSpellFromSpellbook })(SpellList);
