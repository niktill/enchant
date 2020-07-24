import React, { Component } from "react";
import { connect } from "react-redux";
import { Tab, Loader, Dimmer } from "semantic-ui-react";
import Spellbook from "./Spellbook";
import SelectedSpells from "./SelectedSpells";
import AllSpells from "./AllSpells";
import { fetchAPIData } from "../actions"

class App extends Component {
  componentDidMount() {
    this.props.fetchAPIData();
  };

  render() {
    {if (!this.props.apiData.complete) {
      return (<Loader active size='huge' content='Loading Data'/>)
    } else {
      return (<Tab className='appTab' panes={[
        { menuItem: 'Daily Spells', render: () => <Tab.Pane><SelectedSpells /></Tab.Pane> },
        { menuItem: 'Spell Book', render: () => <Tab.Pane><Spellbook /></Tab.Pane> },
        { menuItem: 'All Spells', render: () => <Tab.Pane><AllSpells /></Tab.Pane> }
      ]}/>);
    }}
  }
}

const mapStateToProps = (state) => {
  return {
    apiData: state.apiData
  };
};

export default connect(mapStateToProps, { fetchAPIData })(App);
