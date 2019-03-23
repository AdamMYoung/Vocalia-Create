import React, { Component } from "react";
import ControlView from "./ControlView";
import moment from "moment";
import GroupController from "../../../../data/stream/GroupController";

interface IProps {}

interface IState {
  controller: GroupController;
  duration: number;
  isRecording: boolean;
}

export default class ControlViewModel extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      controller: new GroupController(),
      duration: 0,
      isRecording: false
    };
  }

  /**
   * Toggles the recording status of the group.
   */
  private onToggleRecording = () => {
    const { isRecording, controller } = this.state;
    controller.setRecordState(!isRecording);
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

  /**
   * Gets the duration time formatted as a string.
   */
  private getDurationText = (): string => {
    const { duration } = this.state;

    return moment("2015-01-01")
      .startOf("day")
      .seconds(duration)
      .format("H:mm:ss");
  };

  render() {
    return (
      <ControlView
        {...this.state}
        duration={this.getDurationText()}
        onToggleRecording={this.onToggleRecording}
        onStopRecording={this.onStopRecording}
        onStartRecording={this.onStartRecording}
      />
    );
  }
}
