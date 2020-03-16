import React, { Component, Fragment } from "react";

class TestartURL extends Component {
  componentDidMount() {
    if (typeof window !== "undefined") {
      window.location.href = "http://testart.ru";
    }
  }
  render() {
    return <Fragment></Fragment>;
  }
}

export default TestartURL;
