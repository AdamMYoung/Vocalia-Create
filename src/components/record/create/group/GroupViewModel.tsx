import React, { Component } from "react";
import DataManager from "../../../../data/api/DataManager";
import WebRTC from "../../../../data/stream/WebRTC";
import { UserStream } from "../../../../models/ingest/UserStream";
import { User } from "../../../../models/User";
import GroupView from "./GroupView";

interface IProps {
  sessionId: string;
  api: DataManager;
  hub: signalR.HubConnection;
}

interface IState {
  webRtc: WebRTC | null;
  userStreams: { [id: string]: UserStream };
  userInfo: { [id: string]: User };
}

export default class GroupViewModel extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      webRtc: null,
      userStreams: {},
      userInfo: {}
    };

    this.setupWebRTC();
  }

  /**
   * Disconnects from the current WebRTC connections.
   */
  componentWillUnmount() {
    const { webRtc } = this.state;
    if (webRtc) webRtc.disconnectFromPeers();
  }

  /**
   * Updates the current session information.
   * @param oldProps Previous props.
   */
  componentDidUpdate(oldProps: IProps) {
    const { webRtc } = this.state;

    if (this.props.sessionId != oldProps.sessionId) {
      if (webRtc) {
        webRtc.disconnectFromPeers();
        webRtc.connect();
      }
    }
  }

  /**
   * Creates the WebRTC connection object.
   */
  private setupWebRTC = () => {
    const { api, hub, sessionId } = this.props;

    var webRtc = new WebRTC(hub);
    webRtc.onTrackAdded = this.onTrackAdded;
    webRtc.onTrackRemoved = this.onTrackRemoved;

    api.getSignedInUserInfo().then(currentUser => {
      if (currentUser && sessionId) {
        webRtc.connect();
        this.setState({ webRtc });
      }
    });
  };

  /**
   * Called when a track has been added.
   */
  private onTrackAdded = async (stream: UserStream) => {
    const { userStreams, userInfo } = this.state;
    const { api } = this.props;

    userStreams[stream.id] = stream;

    var user = await api.getUserDetailInfo(stream.tag);
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
