import React, { Component } from "react";
import { EditStream } from "../../../../models/editor/EditStream";
import TrackView from "./TrackView";

interface IProps {
  stream: EditStream;
  playbackPosition: number;
  paused: boolean;
  onUpdatePlaybackPosition: (playbackPosition: number) => void;
  onUpdateDisplayPosition: (playbackPosition: number) => void;
}

interface IState {
  audioBuffer: AudioBuffer | null;
  sliderPosition: number;
  audioElement: HTMLAudioElement;
}

export default class TrackViewModel extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    var audio = document.createElement("audio");
    audio.src = props.stream.mediaUrl;
    audio.ontimeupdate = this.onUpdateDisplay;
    audio.load();

    this.state = {
      audioBuffer: null,
      sliderPosition: 0,
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
   * Called when external scrubbing has occurred.
   * @param oldProps Old properties of the track model.
   */
  componentDidUpdate(oldProps: IProps) {
    const { playbackPosition, paused } = this.props;
    const { audioElement, audioBuffer } = this.state;

    if (oldProps.playbackPosition != playbackPosition) {
      console.log(playbackPosition);
      audioElement.currentTime = playbackPosition;
      if (audioBuffer)
        this.setState({
          sliderPosition: audioElement.currentTime / audioBuffer.duration
        });
    }

    if (oldProps.paused != paused) {
      if (paused) audioElement.pause();
      else audioElement.play();
    }
  }

  /**
   * Called when the slider position has changed.
   */
  private onPositionChanged = (position: number) => {
    const { audioBuffer } = this.state;
    const { onUpdatePlaybackPosition } = this.props;

    if (audioBuffer) {
      var newPosition = audioBuffer.duration * position;
      onUpdatePlaybackPosition(newPosition);
    }
  };

  /**
   * Called when the progress of the playback has changed.
   */
  private onProgressChanged = () => {
    const { audioElement, audioBuffer } = this.state;

    if (audioBuffer) {
      var newPosition = audioElement.currentTime / audioBuffer.duration;
      this.setState({ sliderPosition: newPosition });
    }
  };

  /**
   * Called to update the display time.
   */
  private onUpdateDisplay = () => {
    const { onUpdateDisplayPosition } = this.props;
    const { audioElement } = this.state;

    onUpdateDisplayPosition(audioElement.currentTime);
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
