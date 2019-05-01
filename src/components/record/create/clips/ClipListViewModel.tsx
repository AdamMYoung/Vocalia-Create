import React, { Component } from "react";
import DataManager from "../../../../data/api/DataManager";
import { SessionClip } from "../../../../models/SessionClip";
import ClipListView from "./ClipListView";

interface IProps {
  api: DataManager;
  clips: SessionClip[];

  onClipsChanged: () => void;
}

interface IState {
  playingUrl: string | null;
  playback: HTMLAudioElement;
}

export default class ClipListViewModel extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    var audio = document.createElement("audio");
    audio.onended = this.onAudioEnded;

    this.state = {
      playingUrl: null,
      playback: audio
    };
  }

  /**
   * Called when the audio has ended.
   */
  private onAudioEnded = () => {
    this.setState({ playingUrl: null });
  };

  /**
   * Called when the clip should be played/paused.
   */
  private onPlayPause = (url: string) => {
    const { playback, playingUrl } = this.state;

    console.log(url);
    if (url == playingUrl) {
      playback.pause();
      this.setState({ playingUrl: null });
    } else {
      playback.src = url;
      playback.play();
      this.setState({ playingUrl: url });
    }
  };

  /**
   * Called when a clip has been selected for deletion.
   */
  private onClipDelete = async (uid: string) => {
    const { api, onClipsChanged } = this.props;

    await api.deleteClip(uid);
    onClipsChanged();
  };

  render() {
    return (
      <ClipListView
        {...this.props}
        {...this.state}
        onPlayPause={this.onPlayPause}
        onClipDelete={this.onClipDelete}
      />
    );
  }
}
