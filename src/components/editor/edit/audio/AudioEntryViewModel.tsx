import React, { Component } from "react";
import ClipMedia from "../../../../models/editor/ClipMedia";
import AudioEntryView from "./AudioEntryView";

interface IProps {
  entry: ClipMedia;
}

interface IState {
  buffer: AudioBuffer | null;
}

export default class AudioEntryViewModel extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      buffer: null
    };

    this.loadAudioBuffer();
  }

  /**
   * Loads the audio buffer for the current entry.
   */
  public loadAudioBuffer = async () => {
    const { entry } = this.props;

    const response = await fetch(entry.mediaUrl);
    const audioData = await response.arrayBuffer();

    new AudioContext().decodeAudioData(audioData, buffer => {
      this.setState({ buffer });
      console.log(buffer);
    });
  };

  render() {
    const { buffer } = this.state;

    return <AudioEntryView buffer={buffer} />;
  }
}
