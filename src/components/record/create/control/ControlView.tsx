import React, { Component } from "react";
import GroupController from "../../../../data/stream/GroupController";

interface IProps {
  duration: number;
  isPlaying: boolean;
  onToggleRecording: () => void;
  onStopRecording: () => void;
  onStartRecording: () => void;
}

export default class ControlView extends Component<IProps> {
  render() {
    return <div />;
  }
}
