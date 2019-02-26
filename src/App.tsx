import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import WebRTC from "./stream/WebRTC"
import { string } from "prop-types";

interface IProps { }

interface IState {
  value: string;
  group: string;
  webRtcClient: WebRTC;
  streams: MediaStream[];
}

class App extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    var rtcClient = new WebRTC;
    rtcClient.onTrackAdded = this.onNewMedia

    this.state = {
      value: "",
      group: "",
      webRtcClient: rtcClient,
      streams: [] as MediaStream[]
    }
  }

  connectToClient = () => {
    this.setState({ group: this.state.value });
    this.state.webRtcClient.connect("", this.state.value);
  };


  onNewMedia = (stream: MediaStream) => {
    var streams = this.state.streams;
    streams.push(stream);
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
        {streams.map(stream =>
          <audio key={stream.id} ref={audio => { if (audio) audio.srcObject = stream }} controls autoPlay />)}
      </div>
    );
  }
}

export default App;
