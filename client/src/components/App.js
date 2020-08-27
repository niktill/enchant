import React, { Component } from "react";
import { connect } from "react-redux";
import { Loader, Dimmer, Message, Container, Menu, Segment } from "semantic-ui-react";
import Spellbook from "./Spellbook";
import DailySpells from "./DailySpells";
import AllSpells from "./AllSpells";
import Login from "./Login";
import { fetchAPIData, getCurrentUser } from "../actions"

class App extends Component {
  state = { activeItem: 'Daily Spells' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  componentDidMount() {
    this.props.getCurrentUser()
    this.props.fetchAPIData();
  };

  renderActiveTab() {
    if (this.state.activeItem === 'Daily Spells') {
      return <DailySpells />;
    } else if (this.state.activeItem === 'Spell Book') {
      return <Spellbook />;
    } else if (this.state.activeItem === 'All Spells') {
      return <AllSpells />;
    } else if (this.state.activeItem === 'Log In') {
      return <Login />;
    }
  }

  renderAppOnFetchComplete() {
    if (this.props.apiData.complete) {
      const { activeItem } = this.state;
      return (
        <div>
          <Menu size='large' attached='top' tabular>
            <Menu.Item
              name='Daily Spells'
              active={activeItem === 'Daily Spells'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='Spell Book'
              active={activeItem === 'Spell Book'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='All Spells'
              active={activeItem === 'All Spells'}
              onClick={this.handleItemClick}
            />
            <Menu.Menu position='right'>
              <Menu.Item icon='help circle' href='/api/current_user' target='_blank' />
              {!this.props.currentUser ?
                <Menu.Item
                  name='Log In'
                  icon='user'
                  active={activeItem === 'Log In'}
                  onClick={this.handleItemClick}/> :
                <Menu.Item name='Log Out'icon='log out' href='/api/logout'/>}
            </Menu.Menu>
          </Menu>
          <Segment attached='bottom'>
            {this.renderActiveTab()}
          </Segment>
        </div>
      );
    } else if (this.props.apiData.error) {
      return (
        <Container textAlign='center' style={{ marginTop: '25vh' }}>
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
      <Dimmer.Dimmable>
        <Dimmer active={!this.props.apiData.complete && !this.props.apiData.error}>
          <Loader size='massive' content='Loading Enchant' /></Dimmer>
        {this.state.currentUser}
        {this.renderAppOnFetchComplete()}
      </Dimmer.Dimmable>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    apiData: state.apiData,
    currentUser: state.currentUser
  };
};

export default connect(mapStateToProps, { fetchAPIData, getCurrentUser })(App);
