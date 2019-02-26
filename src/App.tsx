import React, { Component } from "react";
import "./App.css";
import WebRTC from "./stream/WebRTC"

interface IProps { }

interface IState {
  value: string;
  group: string;
  webRtcClient: WebRTC;
  streams: { [id: string]: MediaStream };
}

class App extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    var rtcClient = new WebRTC;
    rtcClient.onTrackAdded = this.onAddSource
    rtcClient.onTrackRemoved = this.onRemoveSource

    this.state = {
      value: "",
      group: "",
      webRtcClient: rtcClient,
      streams: {}
    }
  }

  /**
   * Connects the user to the specified group client.
   */
  connectToClient = () => {
    this.setState({ group: this.state.value });
    this.state.webRtcClient.connect("", this.state.value);
  };

  /**
   * Called when a new media source has been added.
   */
  onAddSource = (key: string, stream: MediaStream) => {
    var streams = this.state.streams;
    streams[key] = stream;
    this.setState({ streams: streams });
  }

  /**
   * Called when a media source has been removed.
   */
  onRemoveSource = (key: string) => {
    var streams = this.state.streams;
    delete streams[key];
    this.setState({ streams: streams });
  }

  render() {
    const { value, group, streams } = this.state;

    return (
      <div className="App">
        <input type="text" value={value}
          onChange={(event) => this.setState({ value: event.target.value })} />
        <button onClick={() => this.connectToClient()} disabled={value.length == 0}>Connect</button>

        <p>Current Group: {group}</p>
        {Object.values(streams).map(stream =>
          <audio key={stream.id} ref={audio => { if (audio) audio.srcObject = stream }} controls autoPlay />)}
      </div>
    );
  }
}

export default App;
