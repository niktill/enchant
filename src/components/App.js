import React, { Component } from "react";
import { Tab } from "semantic-ui-react";
import AllSpells from "./AllSpells";
import Spellbook from "./Spellbook";
import SelectedSpells from "./SelectedSpells";

class App extends Component {
  render() {
    return (
      <div>
        <Tab className='appTab' panes ={[
          {menuItem:'Daily Spells', render: () => <Tab.Pane><SelectedSpells/></Tab.Pane>},
          {menuItem:'Spell Book', render: () => <Tab.Pane><Spellbook/></Tab.Pane>},
          {menuItem:'All Spells', render: () => <Tab.Pane><AllSpells/></Tab.Pane>}
        ]} />
      </div>
    );
  }
}

export default App;
