import React, { Component } from "react";
import ClipMedia from "../../../../models/editor/ClipMedia";
import WaveSurfer from "wavesurfer.js";

interface IProps {
  entry: ClipMedia;
  clipUid: string;
  currentClipPlaying: string | null;
  width?: number;

  onClipPlay: (clipUid: string) => void;
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

  componentDidUpdate(prevProps: IProps) {
    const { waveform } = this.state;
    const { clipUid, currentClipPlaying } = this.props;

    if (!waveform) this.loadWavesurfer();

    if (prevProps.currentClipPlaying != currentClipPlaying) {
      if (clipUid == currentClipPlaying) waveform.play();
      else waveform.stop();
    }
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
    const { entry, onClipPlay, clipUid } = this.props;

    var wavesurfer = WaveSurfer.create({
      container: "#" + this.identifier,
      waveColor: "white",
      cursorColor: "#3F51B5",
      hideScrollbar: true
    });

    wavesurfer.toggleInteraction();
    wavesurfer.load(entry.mediaUrl);
    wavesurfer.on("finish", () => onClipPlay(clipUid));
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
