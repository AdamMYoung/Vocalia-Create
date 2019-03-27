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
  incrementer: NodeJS.Timeout | null = null;

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
      timestamp: Date.now() / 1000,
      sessionUid: sessionId,
      data: event.data
    } as BlobUpload;

    await api.pushMediaData(blobData);
  };

  /**
   * Starts the duration timer.
   */
  private startDurationTimer = () => {
    this.incrementer = setInterval(() => {
      this.setState({ duration: this.state.duration + 1 });
    }, 1000);
  };

  /**
   * Stops the duration timer.
   */
  private stopDurationTimer = () => {
    if (this.incrementer) clearInterval(this.incrementer);
  };

  /**
   * Clears the duration timer.
   */
  private clearDurationTimer = () => {
    this.stopDurationTimer();
    this.setState({ duration: 0 });
  };

  /**
   * Toggles the recording status.
   */
  private toggleRecording = () => {
    const { recorder } = this.state;
    if (recorder.isRecording) {
      recorder.stop();
      this.clearDurationTimer();
    } else {
      recorder.start();
      this.startDurationTimer();
    }
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
    if (recorder.isPaused) {
      recorder.resume();
      this.startDurationTimer();
    } else {
      recorder.pause();
      this.stopDurationTimer();
    }
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
