import React, { Component } from "react";
import { connect } from "react-redux";

class SpellDescription extends Component {

  render() {
    return (
      <p>
        <br />
        <b>{this.props.spell.level} {this.props.spell.school}</b><br />
        <b>Casting Time:</b> {this.props.spell.casting_time}<br />
        <b>Range:</b> {this.props.spell.range}<br />
        <b>Components:</b> {this.props.spell.components}<br />
        <b>Duration:</b> {this.props.spell.duration}<br />
        <br />
        {this.props.spell.desc}
        <br />
        {this.props.spell.higher_level}
      </p>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    apiData: state.apiData,
  };
};

export default connect(mapStateToProps, {})(SpellDescription);