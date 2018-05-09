import React, { Component } from "react";

export const ERROR_MESSAGE_ID = "error";
export const ERROR_MESSAGE = "Unable to fetch JSON file from the given URL";

export default class Error extends Component {
  render() {
    if (!this.props.hasErrored) {
      return null;
    }

    return (
      <div id={ERROR_MESSAGE_ID} className="row error-container">
        <div className="columns small-12">{ERROR_MESSAGE}</div>
      </div>
    );
  }
}
