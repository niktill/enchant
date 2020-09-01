import React, { Component } from "react";
import { connect } from "react-redux";
import { Popup, Button, Icon } from "semantic-ui-react";
import { selectSortSpellLevel } from "../actions";

class SortSpells extends Component {
  renderClassSpellSortButtons() {
    const sortFunctions = [
      { 'name': 'Level', 'slug': 'level_int' },
      { 'name': 'School', 'slug': 'school' }]
    return sortFunctions.map((sorter) => (
      <Button key={sorter.slug + this.props.tabName + 'sorter'}
        active={this.props.selectedSorter[this.props.tabName] === sorter.slug}
        onClick={() => this.props.selectSortSpellLevel(sorter.slug, this.props.tabName)}>
        {sorter.name}
      </Button>
    ));
  }

  render() {
    return (
      <Popup hoverable on={['click']}
        content={
          <Button.Group className='stackable'>
            {this.renderClassSpellSortButtons()}
            <Button icon
              active={this.props.selectedSorter[this.props.tabName] === 'alpha-down'}
              onClick={() => this.props.selectSortSpellLevel('alpha-down', this.props.tabName)}>
              <Icon name='sort alphabet down' />
            </Button>
            <Button icon
              active={this.props.selectedSorter[this.props.tabName] === 'alpha-up'}
              onClick={() => this.props.selectSortSpellLevel('alpha-up', this.props.tabName)}>
              <Icon name='sort alphabet up' />
            </Button>
          </Button.Group>}
        trigger={<Button>Sort</Button>} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    apiData: state.apiData,
    selectedSorter: state.selectedSorter
  };
};

export default connect(mapStateToProps, { selectSortSpellLevel })(SortSpells);
