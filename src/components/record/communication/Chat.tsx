import React, { Component } from "react";
import WebRTC from "../../../stream/WebRTC";
import { UserStream, User } from "../../../utility/types";
import DataManager from "../../../api/DataManager";
import ChatUser from "./ChatUser";
import { Grid, List, Typography } from "@material-ui/core";

interface IChatProps {
  sessionId: string | null;
  api: DataManager;
}

interface IChatState {
  webRTC: WebRTC | null;
  currentUser: User | null;
  userStreams: { [id: string]: UserStream };
  userInfo: { [id: string]: User };
}

export default class Chat extends Component<IChatProps, IChatState> {
  constructor(props: IChatProps) {
    super(props);

    this.state = {
      webRTC: null,
      currentUser: null,
      userStreams: {},
      userInfo: {}
    };

    this.setupWebRTC();
  }

  componentDidUpdate(newProps: IChatProps) {
    const { webRTC, currentUser } = this.state;
    const { sessionId } = newProps;

    if (webRTC && currentUser && sessionId) {
      if (this.props.sessionId != sessionId) {
        webRTC.disconnectFromPeers();
        webRTC.connect(currentUser.userUID, sessionId);
      }
    }
  }

  /**
   * Creates the WebRTC connection object.
   */
  setupWebRTC = () => {
    const { api, sessionId } = this.props;

    var rtc = new WebRTC();
    rtc.onTrackAdded = this.onTrackAdded;
    rtc.onTrackRemoved = this.onTrackRemoved;

    api.getSignedInUserInfo().then(user => {
      if (user && sessionId) {
        rtc.connect(user.userUID, sessionId);
        this.setState({ currentUser: user, webRTC: rtc });
      }
    });
  };

  /**
   * Called when a track has been added.
   */
  onTrackAdded = async (stream: UserStream) => {
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
  onTrackRemoved = (id: string) => {
    const { userStreams, userInfo } = this.state;
    delete userStreams[id];
    this.setState({ userStreams, userInfo });
  };

  /**
   * Disconnects from WebRTC on unmount.
   */
  componentWillUnmount = () => {
    const { webRTC } = this.state;
    if (webRTC) webRTC.disconnectFromPeers();
  };

  shouldComponentUpdate = (nextProps: IChatProps) => {
    if (this.props.sessionId == nextProps.sessionId) return false;
    return true;
  };

  render() {
    const { userStreams, userInfo } = this.state;

    return (
      <div style={{ padding: 12 }}>
        <List>
          {Object.values(userStreams).map(s => (
            <ChatUser key={s.id} stream={s} user={userInfo[s.tag]} />
          ))}
        </List>
      </div>
    );
  }
}
