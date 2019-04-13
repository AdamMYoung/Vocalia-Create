import React, { Component } from "react";
import DataManager from "../../../../data/api/DataManager";
import { EditStream } from "../../../../models/editor/EditStream";
import TrackView from "./TrackView";
import { Typography } from "@material-ui/core";

interface IProps {
  stream: EditStream;
}

interface IState {
  audioBuffer: AudioBuffer | null;
  position: number;
  audioElement: HTMLAudioElement;
}

export default class TrackViewModel extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    var audio = document.createElement("audio");
    audio.src = props.stream.mediaUrl;
    audio.load();
    audio.play();

    this.state = {
      audioBuffer: null,
      position: 0,
      audioElement: audio
    };
  }

  /**
   * Loads audio from the url and stores it in a buffer.
   */
  componentDidMount = async () => {
    const { stream } = this.props;

    const response = await fetch(stream.mediaUrl);
    const audioData = await response.arrayBuffer();

    new AudioContext().decodeAudioData(audioData, audioBuffer => {
      this.setState({ audioBuffer });
    });

    setInterval(() => {
      this.onProgressChanged();
    }, 30);
  };

  /**
   * Called when the slider position has changed.
   */
  private onPositionChanged = (position: number) => {
    const { audioElement, audioBuffer } = this.state;

    if (audioBuffer) {
      var newPosition = audioBuffer.duration * position;

      audioElement.currentTime = newPosition;
      this.setState({ position });
    }
  };

  /**
   * Called when the progress of the playback has changed.
   */
  private onProgressChanged = () => {
    const { audioElement, audioBuffer } = this.state;

    if (audioBuffer) {
      var newPosition = audioElement.currentTime / audioBuffer.duration;
      this.setState({ position: newPosition });
    }
  };

  render() {
    const { audioBuffer } = this.state;

    return (
      <TrackView
        {...this.props}
        {...this.state}
        audioBuffer={audioBuffer}
        onPositionChanged={this.onPositionChanged}
      />
    );
  }
}
