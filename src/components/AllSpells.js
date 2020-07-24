import React, { Component } from "react";
import { connect } from "react-redux";
import { List, Checkbox, Grid, Popup, Label, Button } from "semantic-ui-react";
import { addSpellToSpellbook, removeSpellFromSpellbook } from "../actions";

class AllSpells extends Component {
  renderAllSpellsIntoColumns() {
    const numberOfSpells = this.props.apiData.spells.length;
    const maxSpellInColumn = 50;
    const numberOfColumns = Math.ceil(numberOfSpells / maxSpellInColumn);
    let AllSpellsColumns = []
    for (let columnNum = 1; columnNum < numberOfColumns + 1; columnNum++) {
      let curSpellIndexMin = 0 + ((columnNum - 1) * maxSpellInColumn);
      let curSpellIndexMax = (numberOfSpells < (columnNum * maxSpellInColumn))
        ? numberOfSpells - 1 : (columnNum * maxSpellInColumn) - 1;
      AllSpellsColumns.push(
        (<Grid.Column key={columnNum}>
          {this.props.apiData.spells.slice(curSpellIndexMin, curSpellIndexMax).map((spell) => (
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

  renderClassSpellFilterButtons() {
    return this.props.apiData.classes.map((dndClass) => (
      <Button key={dndClass.slug}>
        {dndClass.name}
      </Button>
    ));
  }

  render() {
    return (
      <div>
        <Popup hoverable on={['click']}
          content={<Button.Group>{this.renderClassSpellFilterButtons()}</Button.Group>}
          trigger={<Button>Filter</Button>} />
        {this.renderAllSpellsIntoColumns()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    apiData: state.apiData,
    allClasses: state.allClasses,
    spellbookSpells: state.spellbookSpells
  };
};

export default connect(mapStateToProps, { addSpellToSpellbook, removeSpellFromSpellbook })(AllSpells);
