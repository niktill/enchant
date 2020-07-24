import React, { Component } from "react";
import { connect } from "react-redux";
import { Tab, Loader, Dimmer, Segment } from "semantic-ui-react";
import Spellbook from "./Spellbook";
import SelectedSpells from "./SelectedSpells";
import AllSpells from "./AllSpells";
import { fetchAPIData } from "../actions"

class App extends Component {
  componentDidMount() {
    this.props.fetchAPIData();
  };

  render() {
    return (
      <Dimmer.Dimmable as={Segment} dimmed={!this.props.apiData.complete}>
        <Dimmer active={!this.props.apiData.complete}><Loader size='huge' content='Loading Data' /></Dimmer>
        <Tab className='appTab' panes={[
          { menuItem: 'Daily Spells', render: () => <Tab.Pane><SelectedSpells /></Tab.Pane> },
          { menuItem: 'Spell Book', render: () => <Tab.Pane><Spellbook /></Tab.Pane> },
          { menuItem: 'All Spells', render: () => <Tab.Pane><AllSpells /></Tab.Pane> }
        ]} />
      </Dimmer.Dimmable>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    apiData: state.apiData
  };
};

export default connect(mapStateToProps, { fetchAPIData })(App);
