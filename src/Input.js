import React from "react";

export default class Input extends React.Component {
  render() {
    return (
      <input
        type={"text"}
        placeholder={"Search from location..."}
        value={this.props.location}
        onChange={this.props.onChangeLocation}
      />
    );
  }
}
