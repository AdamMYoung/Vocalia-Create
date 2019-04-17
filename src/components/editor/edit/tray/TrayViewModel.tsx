import React, { Component } from "react";
import TrayView from "./TrayView";
import Clip from "../../../../models/editor/Clip";

interface IProps {
  clips: Clip[];
}

export default class TrayViewModel extends Component<IProps> {
  render() {
    return <TrayView {...this.props} />;
  }
}
