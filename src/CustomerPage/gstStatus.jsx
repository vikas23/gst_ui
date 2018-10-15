import React, { Component } from 'react';
import { connect } from "react-redux";

class GstStatus extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        GST STATUS: IN PROGRESS
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

const connectedGstStatus = connect(mapStateToProps)(GstStatus);
export { connectedGstStatus as GstStatus };