import React, { Component } from "react";
import WebRTC from "../../../stream/WebRTC";
import { UserStream } from "../../../types";
import DataManager from "../../../api/DataManager";

interface IChatProps {
  sessionId: string | null;
  api: DataManager;
}

interface IChatState {
  webRTC: WebRTC;
  userStreams: { [id: string]: UserStream };
}

export default class Chat extends Component<IChatProps, IChatState> {
  constructor(props: IChatProps) {
    super(props);

    const { api, sessionId } = this.props;

    var rtc = new WebRTC();
    rtc.onTrackAdded = this.onTrackAdded;
    rtc.onTrackRemoved = this.onTrackRemoved;

    api.getSignedInUserInfo().then(user => {
      if (user && sessionId) rtc.connect(user.firstName, sessionId);
    });

    this.state = {
      webRTC: rtc,
      userStreams: {}
    };
  }

  onTrackAdded = (stream: UserStream) => {
    var userStreams = this.state.userStreams;
    userStreams[stream.id] = stream;

    this.setState({ userStreams });
  };

  onTrackRemoved = (id: string) => {
    var userStreams = this.state.userStreams;
    delete userStreams[id];

    this.setState({ userStreams });
  };

  componentWillUnmount = () => {
    this.state.webRTC.disconnectFromPeers();
  };

  render() {
    const { userStreams } = this.state;

    return (
      <div>
        {Object.values(userStreams).map(s => (
          <div key={s.id}>
            <audio
              ref={audio => {
                if (audio) audio.srcObject = s.stream;
              }}
              controls
              autoPlay
            />
            <p>{s.tag}</p>
          </div>
        ))}
      </div>
    );
  }
}
