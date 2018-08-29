import React, { Component } from "react";
import PropTypes from "prop-types";
import Header from "./components/Header";
import Main from "./components/Main";
import "./App.css";

class App extends Component {
  static childContextTypes = {
    themeColor: PropTypes.string
  };

  constructor() {
    super();
    this.state = {
      themeColor: "red"
    };
  }

  getChildContext() {
    return {
      themeColor: this.state.themeColor
    };
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Main />
      </div>
    );
  }
}

export default App;
