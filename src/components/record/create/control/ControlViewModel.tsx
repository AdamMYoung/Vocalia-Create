import React, { Component } from "react";
import ControlView from "./ControlView";
import moment, { duration } from "moment";

import { AudioRecorder } from "../../../../data/stream/AudioRecorder";
import DataManager from "../../../../data/api/DataManager";
import { BlobUpload, Podcast, User } from "../../../../utility/types";
import GroupManager from "../../../../data/stream/GroupManager";

interface IProps {
  sessionId: string;
  api: DataManager;
  podcast: Podcast;
  currentUser: User;
  hub: signalR.HubConnection;
}

interface IState {
  duration: number;
  accessLevel: number;
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
      accessLevel: this.getAccessLevel(),
      recorder: recorder,
      group: group,
      isRecording: false,
      isPaused: false
    };
  }

  /**
   * Called when the component will unmount from the view.
   */
  componentWillUnmount() {
    const { recorder } = this.state;
    recorder.stop();
  }

  /**
   * Gets the access level for the specified user.
   */
  private getAccessLevel = (): number => {
    const { podcast, currentUser } = this.props;

    var isAdmin =
      podcast.members.filter(x => x.uid == currentUser.userUID && x.isAdmin)
        .length > 0;

    var isUser =
      podcast.members.filter(x => x.uid == currentUser.userUID).length > 0;

    if (isAdmin) return 2;
    else if (isUser) return 1;
    else return 0;
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
    const { recorder } = this.state;
    if (isRecording) {
      recorder.start();
    } else {
      this.setState({ duration: 0 });
      recorder.stop();
    }

    this.setState({ isRecording });
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
