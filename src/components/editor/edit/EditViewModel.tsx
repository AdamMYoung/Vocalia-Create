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
  isTimelineLoading: boolean;
}

export default class EditViewModel extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      timeline: [],
      clips: [],
      podcast: null,
      isTimelineLoading: false
    };
  }

  /**
   * Loads the podcast and edit streams from the API.
   */
  componentWillMount() {
    this.loadClips();
    this.loadPodcast();
  }

  componentDidUpdate(prevProps: IProps, prevState: IState) {
    const { api, sessionId } = this.props;
    const { isTimelineLoading } = this.state;

    if (prevState.timeline != this.state.timeline && !isTimelineLoading) {
      api.setTimeline(sessionId, this.state.timeline);
    }
  }

  /**
   * Loads all clips for the specified
   */
  private loadClips = async () => {
    const { api, sessionId } = this.props;
    var timeline = await api.getTimeline(sessionId);
    var clips = await api.getEditorClips(sessionId);

    this.setState({ timeline: [], isTimelineLoading: true }, () => {
      if (timeline)
        this.setState({ timeline: timeline, isTimelineLoading: false });
    });

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
  private onDragEnd = async (result: DropResult) => {
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
          this.move(clips, timeline, source, destination, true);
          break;
        case "timeline":
          this.move(timeline, clips, source, destination, false);
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
    droppableDestination: DraggableLocation,
    toTimeline: boolean
  ) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    if (toTimeline) {
      this.setState({
        clips: sourceClone,
        timeline: destClone
      });
    } else {
      this.setState({
        clips: destClone,
        timeline: sourceClone
      });
    }
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
            onReloadTimeline={() => this.loadClips()}
          />
        </DragDropContext>
      )
    );
  }
}
