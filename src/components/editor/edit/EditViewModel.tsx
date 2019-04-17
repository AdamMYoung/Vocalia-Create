import React, { Component } from "react";
import DataManager from "../../../data/api/DataManager";
import EditView from "./EditView";
import { Podcast } from "../../../models/Podcast";
import Clip from "../../../models/editor/Clip";
import {
  DragDropContext,
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
}

export default class EditViewModel extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      timeline: [],
      clips: [],
      podcast: null
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
    const { podcast } = this.state;
    return (
      podcast && (
        <DragDropContext onDragEnd={this.onDragEnd}>
          <EditView
            {...this.props}
            {...this.state}
            podcast={podcast as Podcast}
            onTimelineDragEnd={this.onDragEnd}
          />
        </DragDropContext>
      )
    );
  }
}
