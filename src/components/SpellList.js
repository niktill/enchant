import React, { Component } from "react";
import { connect } from "react-redux";
import { List, Checkbox, Grid, Message, Container, Popup } from "semantic-ui-react";
import SpellDescription from './SpellDescription';
import DailySpellListItem from './DailySpellListItem';
import { selectAllSpellsSpell } from "../actions";

class SpellList extends Component {
  getFilteredSpells() {
    return this.props.spells.filter((spell) =>
      this.props.selectedFilters[this.props.tabName].classes.some((filterSpellClassNames) =>
        spell.dnd_class.includes(filterSpellClassNames))
    );
  }
  sortSpells(sorter, spells) {
    let isAlphaUp = sorter === 'alpha-up';
    sorter = (sorter === 'alpha-down' || sorter === 'alpha-up') ? 'slug' : sorter;
    let sortedSpell = spells.sort((a, b) => {
      if (a[sorter] < b[sorter]) {
        return -1;
      }
      if (a[sorter] > b[sorter]) {
        return 1;
      }
      return 0;
    });
    return isAlphaUp ? sortedSpell.reverse() : sortedSpell;
  }
  renderSpellListItem(spell) {
    if (this.props.tabName === 'dailySpells') {
      return <DailySpellListItem key={this.props.tabName + "-spells-" + spell.slug} spell={spell}/>;
    }
    return (
      <List.Item key={this.props.tabName + "-spells-" + spell.slug}>
        <Popup wide='very' basic size='small' header={spell.name}
          content={<SpellDescription spell={spell} />}
          trigger={
            <Checkbox
              label={spell.name}
              checked={this.props.spellListMonitors.includes(spell)}
              onClick={() => this.props.selectSpellAction(spell)} />} />
      </List.Item>
    );
  }

  renderAllSpellsIntoColumns() {
    let spellsToRender = (this.props.selectedFilters[this.props.tabName].classes.length) ?
      this.getFilteredSpells() : this.props.spells;
    const numberOfSpells = spellsToRender.length;
    const selectedSorter = this.props.selectedSorter[this.props.tabName];
    spellsToRender = (selectedSorter.length) ? this.sortSpells(selectedSorter, spellsToRender) : spellsToRender;
    const requiresSorterHeaders = selectedSorter === 'level_int' || selectedSorter === 'school';
    if (numberOfSpells > 0) {
      const maxSpellInColumn = 60;
      const numberOfColumns = Math.ceil(numberOfSpells / maxSpellInColumn);
      let AllSpellsColumns = [];
      for (let columnNum = 1; columnNum < numberOfColumns + 1; columnNum++) {
        let curSpellIndexMin = 0 + ((columnNum - 1) * maxSpellInColumn);
        let curSpellIndexMax = (numberOfSpells <= (columnNum * maxSpellInColumn))
          ? numberOfSpells : (columnNum * maxSpellInColumn) - 1;
        AllSpellsColumns.push(
          (<Grid.Column key={columnNum}>
            <List selection={this.props.tabName === 'dailySpells'}>
              {spellsToRender.slice(curSpellIndexMin, curSpellIndexMax).map((spell, index) => {
                let curIndex = curSpellIndexMin + index;
                if (requiresSorterHeaders && selectedSorter.length &&
                  (curIndex === 0 || (spellsToRender[curIndex - 1][selectedSorter] !== spellsToRender[curIndex][selectedSorter]))) {
                  return ([
                    <h3 className='spellListHeader' key={this.tabName + '-' + selectedSorter + '-header'}>
                      {(selectedSorter === 'level_int') ? spellsToRender[curIndex].level : spellsToRender[curIndex][selectedSorter]}
                    </h3>, this.renderSpellListItem(spell)])
                }
                return this.renderSpellListItem(spell)
              })}
            </List>
          </Grid.Column>))
      }
      return <Grid className="spellListGrid" columns={numberOfColumns} stackable doubling>{AllSpellsColumns}</Grid>;
    } else {
      return (
        <Container textAlign='center'>
          <Message compact>
            <Message.Header>No Spells Available</Message.Header>
            <p>{(this.props.tabName === 'dailySpells') ?
              'You have not selected any daily spells! Please select your daily spells from the Spell Book tab.' :
              'This spellbook is empty! Select spells in the All Spells tab to add to this spellbook.'}
            </p>
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
    selectedFilters: state.selectedFilters,
    selectedSorter: state.selectedSorter
  };
};

export default connect(mapStateToProps, { selectAllSpellsSpell })(SpellList);