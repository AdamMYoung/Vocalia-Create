import React, { Component } from "react";
import DataManager from "../../../data/api/DataManager";
import EditView from "./EditView";
import { EditStream } from "../../../models/editor/EditStream";
import { Podcast } from "../../../models/Podcast";
import getDurationText from "../../../utility/TextUtils";

interface IProps {
  api: DataManager;
  podcastId: string;
  sessionId: string;
}

interface IState {
  streams: EditStream[];
  podcast: Podcast | null;
  paused: boolean;
  playbackPosition: number;
  displayPosition: number;
}

export default class EditViewModel extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      streams: [],
      podcast: null,
      paused: true,
      displayPosition: 0,
      playbackPosition: 0
    };
  }

  /**
   * Loads the podcast and edit streams from the API.
   */
  componentWillMount() {
    this.loadStreams();
    this.loadPodcast();
  }

  /**
   * Loads all edit streams for the specified session.
   */
  private loadStreams = async () => {
    const { api, sessionId } = this.props;
    var streams = await api.getEditStreams(sessionId);

    if (streams) this.setState({ streams });
  };

  /**
   * Loads the podcast from the API.
   */
  private loadPodcast = async () => {
    const { api, podcastId } = this.props;
    var podcast = await api.getEditorPodcastDetail(podcastId);

    if (podcast) this.setState({ podcast });
  };

  /**
   * Called when the playback position has changed.
   */
  private onUpdatePlaybackPosition = (playbackPosition: number) => {
    this.setState({ playbackPosition });
  };

  /**
   * Called when the displayed time has changed.
   */
  private onUpdateDisplayPosition = (displayPosition: number) => {
    this.setState({ displayPosition });
  };

  /**
   * Called when the rewind event has been called.
   */
  private onRewind = () => {
    const { displayPosition } = this.state;
    if (displayPosition - 5 > 0)
      this.setState({ playbackPosition: displayPosition - 5 });
    else {
      this.setState({ playbackPosition: -1 }, () => {
        this.setState({ playbackPosition: 0 });
      });
    }
  };

  /**
   * Called when the fast forward event has been called.
   */
  private onForward = () => {
    const { displayPosition } = this.state;
    var pos = displayPosition + 5;
    this.setState({ playbackPosition: pos });
  };

  /**
   * Called when the play/pause event has been called.
   */
  private onPlayPause = () => {
    const { paused } = this.state;
    this.setState({ paused: !paused });
  };

  render() {
    const {
      podcast,
      streams,
      paused,
      playbackPosition,
      displayPosition
    } = this.state;
    return (
      podcast && (
        <EditView
          podcast={podcast}
          streams={streams}
          paused={paused}
          playbackPosition={playbackPosition}
          displayPosition={getDurationText(displayPosition)}
          onUpdatePlaybackPosition={this.onUpdatePlaybackPosition}
          onUpdateDisplayPosition={this.onUpdateDisplayPosition}
          onRewind={this.onRewind}
          onForward={this.onForward}
          onPlayPause={this.onPlayPause}
        />
      )
    );
  }
}
