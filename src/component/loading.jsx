import React, { Component } from "react";

export const ID_OF_LOADER = "loader";
export const MESSAGE_WHILE_LOADING = "Please wait while I fetch house data";

export default class Loading extends Component {
  render() {
    if (!this.props.fetchingData || this.props.hasErrored) {
      return null;
    }

    return (
      <div className="row loading-component" id={ID_OF_LOADER}>
        <div className="columns small-12">{MESSAGE_WHILE_LOADING}</div>
      </div>
    );
  }
}
