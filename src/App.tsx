import React, { Component } from "react";
import "./App.css";
import WebRTC from "./stream/WebRTC";
import { UserStream } from "./types";

interface IProps {}

interface IState {
  groupId: string;
  userName: string;
  group: string;
  webRtcClient: WebRTC;
  streams: { [id: string]: UserStream };
}

class App extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    var rtcClient = new WebRTC();
    rtcClient.onTrackAdded = this.onAddSource;
    rtcClient.onTrackRemoved = this.onRemoveSource;

    this.state = {
      groupId: "",
      userName: "",
      group: "",
      webRtcClient: rtcClient,
      streams: {}
    };
  }

  /**
   * Connects the user to the specified group client.
   */
  connectToClient = () => {
    this.setState({ group: this.state.groupId });
    this.state.webRtcClient.connect(this.state.userName, this.state.groupId);
  };

  /**
   * Called when a new media source has been added.
   */
  onAddSource = (stream: UserStream) => {
    var streams = this.state.streams;
    streams[stream.id] = stream;
    this.setState({ streams: streams });
  };

  /**
   * Called when a media source has been removed.
   */
  onRemoveSource = (peerId: string) => {
    var streams = this.state.streams;
    delete streams[peerId];
    this.setState({ streams: streams });
  };

  render() {
    const { groupId, group, streams, userName } = this.state;

    return (
      <div className="App">
        <p>Username</p>
        <input
          type="text"
          value={userName}
          onChange={event => this.setState({ userName: event.target.value })}
        />
        <p>Group</p>
        <input
          type="text"
          value={groupId}
          onChange={event => this.setState({ groupId: event.target.value })}
        />
        <button
          onClick={() => this.connectToClient()}
          disabled={groupId.length == 0}
        >
          Connect
        </button>

        <p>Current Group: {group}</p>
        {Object.values(streams).map(stream => (
          <div key={stream.id}>
            <audio
              ref={audio => {
                if (audio) audio.srcObject = stream.stream;
              }}
              controls
              autoPlay
            />
            <p>{stream.tag}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
