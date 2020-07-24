import React, { Component } from "react";
import { connect } from "react-redux";
import { Popup, Button } from "semantic-ui-react";
import { selectSpellFilterClass } from "../actions";

class FilterSpells extends Component {
  renderClassSpellFilterButtons() {
    return this.props.apiData.classes.map((dndClass) => (
      <Button key={dndClass.slug}
        active={this.props.selectedFilterSpellsClass.includes(dndClass.name)}
        onClick={() => this.props.selectSpellFilterClass(dndClass.name)}>
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
    selectedFilterSpellsClass: state.selectedFilterSpellsClass
  };
};

export default connect(mapStateToProps, { selectSpellFilterClass })(FilterSpells);
