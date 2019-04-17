import React, { Component } from "react";
import DataManager from "../../../data/api/DataManager";
import EditView from "./EditView";
import { Podcast } from "../../../models/Podcast";
import { getDurationText } from "../../../utility/TextUtils";
import Clip from "../../../models/editor/Clip";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggableLocation
} from "react-beautiful-dnd";
import { reorder } from "../../../utility/ListUtils";

interface IProps {
  api: DataManager;
  podcastId: string;
  sessionId: string;
}

interface IState {
  timeline: Clip[];
  clips: Clip[];
  podcast: Podcast | null;
  paused: boolean;
  playbackPosition: number;
  displayPosition: number;
}

export default class EditViewModel extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      timeline: [],
      clips: [],
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
    this.loadTimeline();
    this.loadPodcast();
    this.loadClips();
  }

  /**
   * Loads all edit streams for the specified session.
   */
  private loadTimeline = async () => {
    const { api, sessionId } = this.props;
    var timeline = await api.getTimeline(sessionId);

    if (timeline) {
      this.setState({ timeline });
    }
  };

  /**
   * Loads all clips for the specified session.
   */
  private loadClips = async () => {
    const { api, sessionId } = this.props;
    var clips = await api.getEditorClips(sessionId);

    if (clips) {
      console.log(clips);
      this.setState({ clips });
    }
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

  /**
   * Called when the drag has ended.
   */
  private onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    const { clips, timeline } = this.state;

    if (!destination) return;

    if (source.droppableId == destination.droppableId) {
      switch (source.droppableId) {
        case "tray":
          this.setState({
            clips: reorder(clips, source.index, destination.index)
          });

          break;
        case "timeline":
          this.setState({
            timeline: reorder(timeline, source.index, destination.index)
          });
          break;
      }
    } else {
      switch (source.droppableId) {
        case "tray":
          this.move(clips, timeline, source, destination);
          break;
        case "timeline":
          this.move(timeline, clips, source, destination);
          break;
      }
    }
  };

  /**
   * Moves an item from one list to another list.
   */
  private move = (
    source: Clip[],
    destination: Clip[],
    droppableSource: DraggableLocation,
    droppableDestination: DraggableLocation
  ) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    this.setState({
      clips: sourceClone,
      timeline: destClone
    });
  };

  render() {
    const { podcast, displayPosition } = this.state;
    return (
      podcast && (
        <DragDropContext onDragEnd={this.onDragEnd}>
          <EditView
            {...this.state}
            podcast={podcast as Podcast}
            displayPosition={getDurationText(displayPosition)}
            onUpdatePlaybackPosition={this.onUpdatePlaybackPosition}
            onUpdateDisplayPosition={this.onUpdateDisplayPosition}
            onRewind={this.onRewind}
            onForward={this.onForward}
            onPlayPause={this.onPlayPause}
            onTimelineDragEnd={this.onDragEnd}
          />
        </DragDropContext>
      )
    );
  }
}
