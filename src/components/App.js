import React, { Component } from "react";
import Spellbook from "./Spellbook";
import SelectedSpells from "./SelectedSpells";

class App extends Component {
  render() {
    return (
      <div>
        <Spellbook/>
        <SelectedSpells/>
      </div>
    );
  }
}

export default App;
