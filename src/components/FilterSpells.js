import React, { Component } from "react";
import { connect } from "react-redux";
import { Popup, Button } from "semantic-ui-react";
import { selectSpellFilterClass } from "../actions";

class FilterSpells extends Component {
  renderClassSpellFilterButtons() {
    return this.props.apiData.classes.map((dndClass) => (
      <Button key={dndClass.slug}
        active={this.props.selectedFilters[this.props.tabName].classes.includes(dndClass.name)}
        onClick={() => this.props.selectSpellFilterClass(dndClass.name, this.props.tabName)}>
        {dndClass.name}
      </Button>
    ));
  }

  render() {
    return (
      <Popup hoverable on={['click']}
        content={<Button.Group>{this.renderClassSpellFilterButtons()}</Button.Group>}
        trigger={<Button hidden>Filter</Button>} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    apiData: state.apiData,
    selectedFilters: state.selectedFilters
  };
};

export default connect(mapStateToProps, { selectSpellFilterClass })(FilterSpells);
