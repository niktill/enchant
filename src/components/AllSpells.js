import React, { Component } from "react";
import { connect } from "react-redux";
import { List, Checkbox, Grid, Message, Container, Popup } from "semantic-ui-react";
import FilterSpells from './FilterSpells';
import SpellDescription from './SpellDescription';
import { addSpellToSpellbook, removeSpellFromSpellbook } from "../actions";

class AllSpells extends Component {
  getFilteredSpells() {
    return this.props.apiData.spells.filter((spell) =>
      this.props.selectedFilterSpellsClass.some((filterSpellClassNames) =>
        spell.dnd_class.includes(filterSpellClassNames))
    );
  }
  renderAllSpellsIntoColumns() {
    const spellsToRender = (this.props.selectedFilterSpellsClass.length) ? this.getFilteredSpells() : this.props.apiData.spells
    const numberOfSpells = spellsToRender.length;
    if (numberOfSpells > 0) {
      const maxSpellInColumn = 50;
      const numberOfColumns = Math.ceil(numberOfSpells / maxSpellInColumn);
      const computerColumnWidth = (document.documentElement.clientWidth / numberOfColumns < 255) ? 3 : 2;
      let AllSpellsColumns = [];
      for (let columnNum = 1; columnNum < numberOfColumns + 1; columnNum++) {
        let curSpellIndexMin = 0 + ((columnNum - 1) * maxSpellInColumn);
        let curSpellIndexMax = (numberOfSpells < (columnNum * maxSpellInColumn))
          ? numberOfSpells - 1 : (columnNum * maxSpellInColumn) - 1;
        AllSpellsColumns.push(
          (<Grid.Column key={columnNum} computer={computerColumnWidth} tablet={4}>
            {spellsToRender.slice(curSpellIndexMin, curSpellIndexMax).map((spell) => {
              return (<List.Item key={"allspells-" + spell.slug}>
                <Popup wide='very' basic size='large' header={spell.name}
                  content={<SpellDescription spell={spell} />}
                  trigger={
                    <Checkbox
                      label={spell.name}
                      checked={this.props.spellbookSpells.includes(spell)}
                      onClick={
                        this.props.spellbookSpells.includes(spell)
                          ? () => this.props.removeSpellFromSpellbook(spell)
                          : () => this.props.addSpellToSpellbook(spell)
                      } />} />
              </List.Item>)

            })}
          </Grid.Column>))
      }
      return <Grid stackable doubling>{AllSpellsColumns}</Grid>;
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
      <div>
        <FilterSpells />
        {this.renderAllSpellsIntoColumns()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    apiData: state.apiData,
    allClasses: state.allClasses,
    spellbookSpells: state.spellbookSpells,
    selectedFilterSpellsClass: state.selectedFilterSpellsClass
  };
};

export default connect(mapStateToProps, { addSpellToSpellbook, removeSpellFromSpellbook })(AllSpells);
