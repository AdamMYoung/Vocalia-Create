import React, { Component } from "react";
import ControlView from "./ControlView";
import { AudioRecorder } from "../../../../data/stream/AudioRecorder";
import DataManager from "../../../../data/api/DataManager";
import GroupManager from "../../../../data/stream/GroupManager";
import ConfirmationDialogView from "../../../dialogs/confirmation/ConfirmationDialogView";
import { Podcast } from "../../../../models/Podcast";
import { User } from "../../../../models/User";
import { getDurationText } from "../../../../utility/TextUtils";
import SessionEndDialog from "../SessionEndDialog";
import { ClipNameDialog } from "../../ClipNameDialog";
import uuidv1 from "uuid/v1";

interface IProps {
  sessionId: string;
  api: DataManager;
  podcast: Podcast;
  currentUser: User;
  hub: signalR.HubConnection;
  clipNumber: number;

  onClipsChanged: () => void;
}

interface IState {
  duration: number;
  accessLevel: number;
  recorder: AudioRecorder | null;
  group: GroupManager;
  isRecording: boolean;
  isPaused: boolean;
  isConfirmDialogOpen: boolean;
  isClipFinishedDialogOpen: boolean;
  isSessionFinished: boolean;
}

export default class ControlViewModel extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    var group = new GroupManager(props.hub);
    group.onPauseChanged = isPaused => this.updatePaused(isPaused);
    group.onRecordingChanged = isRecording => this.updateRecording(isRecording);
    group.onTimeChanged = duration => this.setState({ duration });
    group.onSessionEnd = () => this.setState({ isSessionFinished: true });
    group.onSubmitClip = (clipId, clipName) =>
      this.onSubmitClip(clipId, clipName);

    this.state = {
      duration: 0,
      accessLevel: this.getAccessLevel(),
      recorder: null,
      group: group,
      isRecording: false,
      isPaused: false,
      isConfirmDialogOpen: false,
      isClipFinishedDialogOpen: false,
      isSessionFinished: false
    };
  }

  componentDidMount() {
    var recorder = new AudioRecorder();
    this.setState({ recorder });
  }

  /**
   * Called when the component will unmount from the view.
   */
  componentWillUnmount() {
    const { recorder } = this.state;
    if (recorder) recorder.stop();
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
   * Updates the paused status.
   */
  private updatePaused = (isPaused: boolean) => {
    const { recorder } = this.state;
    if (recorder) {
      //isPaused ? recorder.pause() : recorder.resume();
      this.setState({ isPaused });
    }
  };

  /**
   * Updates the recording status.
   */
  private updateRecording = (isRecording: boolean) => {
    const { recorder } = this.state;
    if (recorder) {
      if (isRecording) {
        recorder.start();
      } else {
        this.setState({ duration: 0 });
        recorder.stop();
      }
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
  private setRecording = async () => {
    const { group, isRecording } = this.state;

    group.setRecording(!isRecording);

    if (isRecording == true) this.setState({ isClipFinishedDialogOpen: true });
  };

  /**
   * Submits the clip to the database.
   */
  private onSubmitClip = async (id: string, name: string) => {
    const { api, sessionId, onClipsChanged } = this.props;
    const { recorder } = this.state;
    if (recorder) {
      var blob = recorder.getBlob();
      if (blob) {
        await api.finishClip(sessionId, name, id, blob);

        onClipsChanged();
        this.setState({ isClipFinishedDialogOpen: false });
      }
    }
  };

  /**
   * Requests clip submission.
   */
  private onCreateClip = async (name: string) => {
    const { group } = this.state;
    var uuid = uuidv1();

    group.submitClip(uuid, name);
  };

  /**
   * Opens the end session dialog.
   */
  private onOpenEndSessionDialog = () => {
    this.setState({ isConfirmDialogOpen: true });
  };

  /**
   * Ends the current session.
   */
  private onEndSession = () => {
    const { group } = this.state;
    const { api, sessionId } = this.props;
    group.setSessionEnd();
    api.completeSession(sessionId);
    this.setState({ isConfirmDialogOpen: false });
  };

  render() {
    const {
      isConfirmDialogOpen,
      isSessionFinished,
      isClipFinishedDialogOpen,
      duration
    } = this.state;

    return (
      <div>
        <ControlView
          {...this.state}
          duration={getDurationText(duration)}
          togglePaused={this.setPaused}
          toggleRecording={this.setRecording}
          endSession={this.onOpenEndSessionDialog}
        />
        {isConfirmDialogOpen && (
          <ConfirmationDialogView
            title="End Session"
            subtitle="Are you sure you want to end the current session?"
            onConfirm={this.onEndSession}
            onDeny={() => this.setState({ isConfirmDialogOpen: false })}
          />
        )}
        {isClipFinishedDialogOpen && (
          <ClipNameDialog onAccept={this.onCreateClip} {...this.props} />
        )}
        {isSessionFinished && <SessionEndDialog />}
      </div>
    );
  }
}
