import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import WebRTC from "./stream/WebRTC"

interface IProps { }

interface IState {
  value: string;
  webRtcClient: WebRTC;
}

class App extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      value: "",
      webRtcClient: new WebRTC()
    }
  }

  connectToClient = () => {
    this.state.webRtcClient.connect(this.state.value)
  };

  render() {
    return (
      <div className="App">
        <input type="text" value={this.state.value}
          onChange={(event) => this.setState({ value: event.target.value })} />
        <button onClick={() => this.connectToClient()}>Connect</button>
      </div>
    );
  }
}

export default App;
