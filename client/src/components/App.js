import React, { Component } from "react";
import { connect } from "react-redux";
import { Loader, Dimmer, Message, Sidebar, Menu, Segment, Popup, Button, Icon } from "semantic-ui-react";
import Spellbook from "./Spellbook";
import DailySpells from "./DailySpells";
import AllSpells from "./AllSpells";
import EnchantMessage from "./EnchantMessage";
import AccountSettings from "./AccountSettings";
import { fetchAPIData, getCurrentUser, checkLogInStatus, appReadytoRender } from "../actions"

class App extends Component {
  state = {
    activeItem: 'Prepared Spells',
    windowWidth: document.documentElement.clientWidth,
    mobileSidebarVisible: false
  };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name, mobileSidebarVisible: false });
  };

  async componentDidMount() {
    try {
      await this.props.fetchAPIData();
      await this.props.checkLogInStatus();
      await this.props.getCurrentUser();
    } catch (err) {
      console.log(err);
    }
    window.addEventListener('resize', () => {
      this.setState({ windowWidth: document.documentElement.clientWidth })
    });
    this.props.appReadytoRender();
  };

  renderActiveTab() {
    if (this.state.activeItem === 'Prepared Spells') {
      return <DailySpells windowWidth={this.state.windowWidth} />;
    } else if (this.state.activeItem === 'Spell Book') {
      return <Spellbook showHeader={this.state.windowWidth <= 767} />;
    } else if (this.state.activeItem === 'All Spells') {
      return <AllSpells showHeader={this.state.windowWidth <= 767} />;
    } else {
      return <DailySpells windowWidth={this.state.windowWidth} />;
    }
  }

  renderLoginMenuItem() {
    if (this.props.currentUser) {
      return <Menu.Item name='Log Out' icon='log out' href='/api/logout' />;
    }
    return (
      <Popup on='click' position='bottom right'
        trigger={<Menu.Item icon='user circle' content='Log In' disabled={!this.props.loginStatus} />}
        content={
          <div className='login-container'>
            <Button style={{ 'marginTop': '10px' }} color='red' href='/auth/google'>
              <Icon name='google' />
          Sign in with Google
        </Button>
            <Button style={{ 'marginTop': '10px' }} color='blue' href='/auth/facebook'>
              <Icon name='facebook' />
          Sign in with Facebook
        </Button>
          </div>} />);
  }

  renderDesktopApp() {
    const { activeItem } = this.state;
    return (
      <div>
        <Menu size='large' attached='top' tabular>
          <Menu.Item
            name='Prepared Spells'
            icon='magic'
            active={activeItem === 'Prepared Spells'}
            onClick={this.handleItemClick} />
          <Menu.Item
            name='Spell Book'
            icon='book'
            active={activeItem === 'Spell Book'}
            onClick={this.handleItemClick} />
          <Menu.Item
            name='All Spells'
            icon='list'
            active={activeItem === 'All Spells'}
            onClick={this.handleItemClick} />
          <Menu.Menu position='right'>
            <Menu.Item icon='help circle' href='https://github.com/niktill/enchant' target='_blank' link />
            {this.props.currentUser ? <AccountSettings /> : null }
            {this.renderLoginMenuItem()}
          </Menu.Menu>
        </Menu>
        <Segment attached='bottom'>
          {this.renderActiveTab()}
        </Segment>
      </div>
    );
  }

  renderMobileApp() {
    const { activeItem } = this.state;
    return (
      <Sidebar.Pushable as={Segment} style={{ marginTop: '0' }}>
        <Sidebar
          as={Menu}
          animation='overlay'
          onHide={() => this.setState({ mobileSidebarVisible: false })}
          vertical
          visible={this.state.mobileSidebarVisible}>
          <Menu.Item
            name='Prepared Spells'
            icon='magic'
            active={activeItem === 'Prepared Spells'}
            onClick={this.handleItemClick} />
          <Menu.Item
            name='Spell Book'
            icon='book'
            active={activeItem === 'Spell Book'}
            onClick={this.handleItemClick} />
          <Menu.Item
            icon='list'
            name='All Spells'
            active={activeItem === 'All Spells'}
            onClick={this.handleItemClick} />
          {this.props.currentUser ? <AccountSettings mobile /> : null }
          <Menu.Item content='Help' icon='help circle' href='https://github.com/niktill/enchant' target='_blank' link />
        </Sidebar>

        <Sidebar.Pusher dimmed={this.state.mobileSidebarVisible}>
          <Menu className='mobileNav' borderless>
            <Menu.Item position='left'>
              <Icon size='large' name='bars' onClick={() => this.setState({ mobileSidebarVisible: true })} />
            </Menu.Item>
            <Menu.Item style={{ marginLeft: 'auto', marginRight: 'auto' }}>
              <img alt='wizard hat' src='wizard-hat.png' style={{ height: '30px', width: '30px', marginRight: '10px' }} />
              <h3 style={{ margin: '0' }}>Enchant</h3>
            </Menu.Item>
            <Menu.Menu position='right'>
              {this.renderLoginMenuItem()}
            </Menu.Menu>
          </Menu>
          {this.renderActiveTab()}
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }

  renderAppOnFetchComplete() {
    if (this.props.appReady && !this.props.apiData.error) {
      return this.state.windowWidth <= 767 ? this.renderMobileApp() : this.renderDesktopApp()
    }
    return null;
  }

  render() {
    return (
      <Dimmer.Dimmable>
        <Dimmer active={!this.props.appReady || this.props.apiData.error}>
          <div className='popout'>
            <img alt='wizard hat' className='wizard-hat-img' src='/wizard-hat.png'
              style={{ 'position': 'relative', 'bottom': this.props.apiData.error ? '0' : '120px' }} />
            {this.props.apiData.error ?
              <Message size='large' negative>
                <Message.Header>Error in loading Enchant</Message.Header>
                <p>We had issues preparing our spells. Please refresh page to try again.</p>
              </Message>
              :
              <Loader style={{ whiteSpace: 'nowrap' }} size='massive' content={'Loading Enchant'} />}
          </div>
        </Dimmer>
        {this.renderAppOnFetchComplete()}
        <EnchantMessage className='enchant-error-message' />
      </Dimmer.Dimmable>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    apiData: state.apiData,
    currentUser: state.currentUser,
    enchantMessage: state.enchantMessage,
    loginStatus: state.loginStatus,
    appReady: state.appReady
  };
};

export default connect(mapStateToProps, { fetchAPIData, getCurrentUser, checkLogInStatus, appReadytoRender })(App);
