import React, { Component } from "react";
import WebRTC from "../../../stream/WebRTC";
import { UserStream } from "../../../types";
import DataManager from "../../../api/DataManager";
import { User } from "../../../utility/types";
import ChatUser from "./ChatUser";

interface IChatProps {
  sessionId: string | null;
  api: DataManager;
}

interface IChatState {
  webRTC: WebRTC;
  currentUser: User | null;
  userStreams: { [id: string]: UserStream };
  userInfo: { [id: string]: User };
}

export default class Chat extends Component<IChatProps, IChatState> {
  constructor(props: IChatProps) {
    super(props);

    const { api, sessionId } = this.props;

    var rtc = new WebRTC();
    rtc.onTrackAdded = this.onTrackAdded;
    rtc.onTrackRemoved = this.onTrackRemoved;

    api.getSignedInUserInfo().then(user => {
      this.setState({ currentUser: user });
      if (user && sessionId) rtc.connect(user.userUID, sessionId);
    });

    this.state = {
      webRTC: rtc,
      currentUser: null,
      userStreams: {},
      userInfo: {}
    };
  }

  componentWillUpdate = (nextProps: IChatProps) => {
    const { webRTC, currentUser } = this.state;

    if (currentUser && nextProps.sessionId) {
      webRTC.disconnectFromPeers();
      webRTC.connect(currentUser.userUID, nextProps.sessionId);
    }
  };

  /**
   * Called when a track has been added.
   */
  onTrackAdded = async (stream: UserStream) => {
    const { userStreams, userInfo } = this.state;
    const { api } = this.props;

    userStreams[stream.id] = stream;

    var user = await api.getUserOverviewInfo(stream.tag);
    if (user) userInfo[stream.id] = user;

    this.setState({ userStreams, userInfo });
  };

  /**
   * Called when a track has been removed.
   */
  onTrackRemoved = (id: string) => {
    const { userStreams, userInfo } = this.state;

    delete userStreams[id];
    delete userInfo[id];

    this.setState({ userStreams, userInfo });
  };

  componentWillUnmount = () => {
    this.state.webRTC.disconnectFromPeers();
  };

  render() {
    const { userStreams, userInfo } = this.state;

    return (
      <div>
        {Object.values(userStreams).map(s => (
          <ChatUser key={s.id} stream={s} user={userInfo[s.id]} />
        ))}
      </div>
    );
  }
}
