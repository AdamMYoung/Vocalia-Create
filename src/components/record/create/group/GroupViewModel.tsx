import React, { Component } from "react";
import GroupView from "./GroupView";
import DataManager from "../../../../data/api/DataManager";
import WebRTC from "../../../../data/stream/WebRTC";
import { User, UserStream } from "../../../../utility/types";
import { AudioManager } from "../../../../data/stream/AudioManager";

interface IProps {
  sessionId: string;
  api: DataManager;
}

interface IState {
  audioManager: AudioManager;
  currentUser: User | null;
  userStreams: { [id: string]: UserStream };
  userInfo: { [id: string]: User };
}

export default class GroupViewModel extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    const audioManager = new AudioManager();

    this.state = {
      audioManager: audioManager,
      currentUser: null,
      userStreams: {},
      userInfo: {}
    };

    const { api, sessionId } = this.props;
    const { webRtc } = audioManager;

    webRtc.onTrackAdded = this.onTrackAdded;
    webRtc.onTrackRemoved = this.onTrackRemoved;

    api.getSignedInUserInfo().then(currentUser => {
      if (currentUser && sessionId) {
        webRtc.connect(currentUser.userUID, sessionId);
        this.setState({ currentUser });
      }
    });
  }

  /**
   * Disconnects from the current WebRTC connections.
   */
  componentWillUnmount() {
    const { webRtc } = this.state.audioManager;
    webRtc.disconnectFromPeers();
  }

  /**
   * Updates the current session information.
   * @param oldProps Previous props.
   */
  componentDidUpdate(oldProps: IProps) {
    const { currentUser } = this.state;
    const { webRtc } = this.state.audioManager;
    const { sessionId } = this.props;

    if (this.props.sessionId == oldProps.sessionId) {
      if (currentUser && sessionId) {
        if (this.props.sessionId != sessionId) {
          webRtc.disconnectFromPeers();
          webRtc.connect(currentUser.userUID, sessionId);
        }
      }
    }
  }

  /**
   * Called when a track has been added.
   */
  private onTrackAdded = async (stream: UserStream) => {
    const { userStreams, userInfo } = this.state;
    const { api } = this.props;

    userStreams[stream.id] = stream;

    var user = await api.getUserOverviewInfo(stream.tag);
    if (user) userInfo[stream.tag] = user;

    this.setState({ userStreams, userInfo });
  };

  /**
   * Called when a track has been removed.
   */
  private onTrackRemoved = (id: string) => {
    const { userStreams, userInfo } = this.state;
    delete userStreams[id];
    this.setState({ userStreams, userInfo });
  };

  render() {
    return <GroupView {...this.state} />;
  }
}
