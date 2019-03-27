import React, { Component } from "react";
import ControlView from "./ControlView";
import moment from "moment";

import { AudioRecorder } from "../../../../data/stream/AudioRecorder";
import DataManager from "../../../../data/api/DataManager";
import { BlobUpload } from "../../../../utility/types";
import GroupManager from "../../../../data/stream/GroupManager";

interface IProps {
  api: DataManager;
  sessionId: string;
  hub: signalR.HubConnection;
}

interface IState {
  duration: number;
  recorder: AudioRecorder;
  group: GroupManager;
  isRecording: boolean;
  isPaused: boolean;
}

export default class ControlViewModel extends Component<IProps, IState> {
  incrementer: NodeJS.Timeout | null = null;

  constructor(props: IProps) {
    super(props);

    var recorder = new AudioRecorder();
    recorder.onRecievedAudioData = this.onRecievedAudioData;

    var group = new GroupManager(props.hub);
    group.onPauseChanged = isPaused => this.updatePaused(isPaused);
    group.onRecordingChanged = isRecording => this.updateRecording(isRecording);
    group.onTimeChanged = duration => this.setState({ duration });

    this.state = {
      duration: 0,
      recorder: recorder,
      group: group,
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
   * Updates the paused status.
   */
  private updatePaused = (isPaused: boolean) => {
    const { recorder } = this.state;
    isPaused ? recorder.pause() : recorder.start();
    this.setState({ isPaused });
  };

  /**
   * Updates the recording status.
   */
  private updateRecording = (isRecording: boolean) => {
    console.log("Update Recording");
    const { recorder } = this.state;
    isRecording ? recorder.start() : recorder.stop();
    this.setState({ isRecording });
    console.log("Get Recording State", isRecording);
  };

  /**
   * Sets the paused status.
   */
  private setPaused = () => {
    const { group, isPaused } = this.state;
    group.setPaused(!isPaused);
  };

  /**
   * Sets the recording status.
   */
  private setRecording = () => {
    const { group, isRecording } = this.state;
    group.setRecording(!isRecording);
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

  render() {
    return (
      <ControlView
        {...this.state}
        duration={this.getDurationText()}
        togglePaused={this.setPaused}
        toggleRecording={this.setRecording}
      />
    );
  }
}
