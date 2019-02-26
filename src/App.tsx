import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import WebRTC from "./stream/WebRTC"

interface IProps { }

interface IState {
  value: string;
  webRtcClient: WebRTC;
  stream: MediaStream | null;
}

class App extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      value: "",
      webRtcClient: new WebRTC(this.onNewMedia),
      stream: null
    }
  }

  connectToClient = () => {
    this.state.webRtcClient.call();
  };

  setGroup = () => {
    this.state.webRtcClient.setGroup("tag", this.state.value);
  }

  onNewMedia = (stream: MediaStream) => {
    this.setState({ stream: stream });
  }

  render() {
    const { value, stream } = this.state;

    return (
      <div className="App">
        <input type="text" value={value}
          onChange={(event) => this.setState({ value: event.target.value })} />
        <button onClick={() => this.setGroup()}>Set Group</button>
        <button onClick={() => this.connectToClient()}>Connect</button>
        <p>Current Group: {value}</p>
        <audio ref={audio => { if (audio) audio.srcObject = stream }} controls autoPlay />
      </div>
    );
  }
}

export default App;
