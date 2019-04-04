import React, { Component } from "react";
import ControlView from "./ControlView";
import moment from "moment";
import { AudioRecorder } from "../../../../data/stream/AudioRecorder";
import DataManager from "../../../../data/api/DataManager";
import { Podcast, User } from "../../../../utility/types";
import GroupManager from "../../../../data/stream/GroupManager";
import ConfirmationDialogView from "../../../dialogs/confirmation/ConfirmationDialogView";

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
  isConfirmDialogOpen: boolean;
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
      isPaused: false,
      isConfirmDialogOpen: false
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
    if (!isRecording == true) {
      group.setRecording(!isRecording);
    } else {
      this.setState({ isConfirmDialogOpen: true });
    }
  };

  /**
   * Stops recording the current podcast.
   */
  private onStopRecording = () => {
    const { group, isRecording } = this.state;
    const { api, sessionId } = this.props;

    api.finishSession(sessionId);
    group.setRecording(!isRecording);
    this.setState({ isConfirmDialogOpen: false });
  };

  /**
   * Called when mic data has been recieved.
   */
  private onRecievedAudioData = async (event: BlobEvent) => {
    const { api, sessionId } = this.props;

    await api.pushMediaData({
      timestamp: Date.now() / 1000,
      sessionUid: sessionId,
      data: event.data
    });
  };

  render() {
    const { isConfirmDialogOpen } = this.state;

    return (
      <div>
        <ControlView
          {...this.state}
          duration={this.getDurationText()}
          togglePaused={this.setPaused}
          toggleRecording={this.setRecording}
        />
        {isConfirmDialogOpen && (
          <ConfirmationDialogView
            title="Finish Recording"
            subtitle="Are you sure you want to end recording?"
            onConfirm={this.onStopRecording}
          />
        )}
      </div>
    );
  }
}
