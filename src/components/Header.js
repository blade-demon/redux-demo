import React, { Component } from "react";
import PropTypes from "prop-types";

class Title extends Component {
  static contextTypes = {
    themeColor: PropTypes.string
  };

  render() {
    return (
      <h1 style={{ color: this.context.themeColor }}>React.js 小书标题</h1>
    );
  }
}

export default Title;
