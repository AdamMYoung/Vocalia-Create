import React, { Component } from "react";
import ControlView from "./ControlView";
import GroupController from "../../../../data/stream/GroupController";

interface IProps {}

interface IState {
  controller: GroupController;
  duration: number;
  isPlaying: boolean;
}

export default class ControlViewModel extends Component<IProps, IState> {
  /**
   * Toggles the recording status of the group.
   */
  private onToggleRecording = () => {
    const { isPlaying, controller } = this.state;
    controller.setRecordState(!isPlaying);
  };

  /**
   * Stops the recording session.
   */
  private onStopRecording = () => {
    const { controller } = this.state;
    controller.stopRecording();
  };

  /**
   * Starts the recording session.
   */
  private onStartRecording = () => {
    const { controller } = this.state;
    controller.startRecording();
  };

  render() {
    return (
      <ControlView
        {...this.state}
        onToggleRecording={this.onToggleRecording}
        onStopRecording={this.onStopRecording}
        onStartRecording={this.onStartRecording}
      />
    );
  }
}
