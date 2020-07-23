import React, { Component } from "react";
import { connect } from "react-redux";
import { Tab } from "semantic-ui-react";
import Spellbook from "./Spellbook";
import SelectedSpells from "./SelectedSpells";
import AllSpells from "./AllSpells";
import { fetchAllSpells } from "../actions"

class App extends Component {
  componentDidMount() {
    this.props.fetchAllSpells()
  };

  render() {
    return (
      <Tab className='appTab' panes={[
        { menuItem: 'Daily Spells', render: () => <Tab.Pane><SelectedSpells /></Tab.Pane> },
        { menuItem: 'Spell Book', render: () => <Tab.Pane><Spellbook /></Tab.Pane> },
        { menuItem: 'All Spells', render: () => <Tab.Pane><AllSpells /></Tab.Pane> }
      ]} />
    );
  }
}

export default connect(null, { fetchAllSpells })(App);
