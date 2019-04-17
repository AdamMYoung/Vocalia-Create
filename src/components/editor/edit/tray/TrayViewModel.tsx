import React, { Component } from "react";
import TrayView from "./TrayView";
import Clip from "../../../../models/editor/Clip";
import { Podcast } from "../../../../models/Podcast";

interface IProps {
  clips: Clip[];
  podcast: Podcast;
}

export default class TrayViewModel extends Component<IProps> {
  render() {
    return <TrayView {...this.props} />;
  }
}
