import React, { Component } from "react";
import ControlView from "./ControlView";
import moment from "moment";
import { AudioRecorder } from "../../../../data/stream/AudioRecorder";

interface IProps {}

interface IState {
  duration: number;
  recorder: AudioRecorder;
  isRecording: boolean;
  isPaused: boolean;
}

export default class ControlViewModel extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      duration: 0,
      recorder: new AudioRecorder(),
      isRecording: false,
      isPaused: false
    };
  }

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

  /**
   * Toggles the recording status.
   */
  private toggleRecording = () => {
    const { recorder } = this.state;
    recorder.isRecording ? recorder.stop() : recorder.start();
    this.setState({
      isRecording: recorder.isRecording,
      isPaused: recorder.isPaused
    });
  };

  /**
   * Toggles the paused status.
   */
  private togglePaused = () => {
    const { recorder } = this.state;
    recorder.isPaused ? recorder.resume() : recorder.pause();
    this.setState({ isPaused: recorder.isPaused });
  };

  render() {
    return (
      <ControlView
        {...this.state}
        duration={this.getDurationText()}
        togglePaused={this.togglePaused}
        toggleRecording={this.toggleRecording}
      />
    );
  }
}
