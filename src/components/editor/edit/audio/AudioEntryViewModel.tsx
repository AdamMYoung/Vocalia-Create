import React, { Component } from "react";
import ClipMedia from "../../../../models/editor/ClipMedia";
import WaveSurfer from "wavesurfer.js";

interface IProps {
  entry: ClipMedia;
  width?: number;
}

interface IState {
  waveform: any;
}

export default class AudioEntryViewModel extends Component<IProps, IState> {
  private identifier: string;

  constructor(props: IProps) {
    super(props);

    this.state = {
      waveform: null
    };

    this.identifier = this.generateId(5);
  }

  componentDidUpdate() {
    const { waveform } = this.state;

    if (!waveform) this.loadWavesurfer();
  }

  componentDidMount() {
    const { waveform } = this.state;

    if (!waveform) this.loadWavesurfer();
  }

  /**
   * Generates an ID for waveform identification.
   */
  private generateId = (length: number) => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  };

  /**
   * Generates the waveform for the audio file.
   */
  private loadWavesurfer = () => {
    const { entry, width } = this.props;

    var wavesurfer = WaveSurfer.create({
      container: "#" + this.identifier,
      waveColor: "#3F51B5",
      hideScrollbar: true
    });

    wavesurfer.load(entry.mediaUrl);
    this.setState({ waveform: wavesurfer });
  };

  render() {
    const { width } = this.props;
    return (
      <div
        id={this.identifier}
        style={{ width: width != undefined ? width : 300 }}
      />
    );
  }
}
