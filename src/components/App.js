import React, { Component } from "react";
import { connect } from "react-redux";
import { Tab, Loader, Dimmer, Message, Container } from "semantic-ui-react";
import Spellbook from "./Spellbook";
import DailySpells from "./DailySpells";
import AllSpells from "./AllSpells";
import Login from "./Login";
import { fetchAPIData } from "../actions"

class App extends Component {
  componentDidMount() {
    this.props.fetchAPIData();
  };

  renderTabsOnFetchComplete() {
    if (this.props.apiData.complete) {
      return (
        <Tab id='appTab' panes={[
          { menuItem: 'Daily Spells', render: () => <Tab.Pane><DailySpells /></Tab.Pane> },
          { menuItem: 'Spell Book', render: () => <Tab.Pane><Spellbook /></Tab.Pane> },
          { menuItem: 'All Spells', render: () => <Tab.Pane><AllSpells /></Tab.Pane> },
          { menuItem: { id:'help-tab', key: 'help', icon: 'help circle', href: 'https://www.google.com' }},
          { menuItem: { id:'login-tab', key: 'login', icon: 'user', content: 'Log In' }, render: () => <Tab.Pane><Login /></Tab.Pane> }
        ]} />);
    } else if (this.props.apiData.error) {
      return (
        <Container textAlign='center' style={{marginTop: '25vh'}}>
          <Message size='large' compact negative>
            <Message.Header>Error in retrieving spells from Open5e</Message.Header>
            <p>Please reload to try again.</p>
          </Message>
        </Container>

      );
    }
    return null;
  }

  render() {
    return (
      <Dimmer.Dimmable dimmed={!this.props.apiData.complete}>
        <Dimmer active={!this.props.apiData.complete && !this.props.apiData.error}><Loader size='massive' content='Loading Enchant' /></Dimmer>
        {this.renderTabsOnFetchComplete()}
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
