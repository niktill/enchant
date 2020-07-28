import React, { Component } from "react";
import { connect } from "react-redux";
import { Tab, Loader, Dimmer, Segment } from "semantic-ui-react";
import Spellbook from "./Spellbook";
import DailySpells from "./DailySpells";
import AllSpells from "./AllSpells";
import { fetchAPIData } from "../actions"

class App extends Component {
  componentDidMount() {
    this.props.fetchAPIData();
  };

  render() {
    return (
      <Dimmer.Dimmable dimmed={!this.props.apiData.complete}>
        <Dimmer active={!this.props.apiData.complete}><Loader size='massive' content='Loading Spells' /></Dimmer>
        <Tab id='appTab' panes={[
          { menuItem: 'Daily Spells', render: () => <Tab.Pane><DailySpells /></Tab.Pane> },
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
