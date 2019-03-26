import React, { Component } from "react";
import ControlView from "./ControlView";
import moment from "moment";
import { AudioRecorder } from "../../../../data/stream/AudioRecorder";
import DataManager from "../../../../data/api/DataManager";
import { BlobUpload } from "../../../../utility/types";

interface IProps {
  api: DataManager;
  sessionId: string;
}

interface IState {
  duration: number;
  recorder: AudioRecorder;
  isRecording: boolean;
  isPaused: boolean;
}

export default class ControlViewModel extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    var recorder = new AudioRecorder();
    recorder.onRecievedAudioData = this.onRecievedAudioData;

    this.state = {
      duration: 0,
      recorder: recorder,
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
   * Called when mic data has been recieved.
   */
  private onRecievedAudioData = async (event: BlobEvent) => {
    const { api, sessionId } = this.props;

    var blobData = {
      timestamp: event.timeStamp,
      sessionUid: sessionId,
      data: event.data
    } as BlobUpload;

    await api.pushMediaData(blobData);
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
