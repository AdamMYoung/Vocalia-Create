import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import WebRTC from "./stream/WebRTC"

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
    this.state.webRtcClient.call();
  };

  setGroup = () => {
    this.setState({ group: this.state.value });
    this.state.webRtcClient.setGroup("tag", this.state.value);
  }

  onNewMedia = (stream: MediaStream) => {
    console.log(stream);
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
        <button onClick={() => this.setGroup()}>Set Group</button>
        {group &&
          <button onClick={() => this.connectToClient()}>Connect</button>
        }
        <p>Current Group: {group}</p>
        {streams.map(stream =>
          <audio key={stream.id} ref={audio => { if (audio) audio.srcObject = stream }} controls autoPlay />)}
      </div>
    );
  }
}

export default App;
