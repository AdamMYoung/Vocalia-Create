import React, { Component } from "react";
import {
  Grid,
  Typography,
  Divider,
  Card,
  CardContent
} from "@material-ui/core";
import PodcastInfoView from "../../dialogs/detail/elements/PodcastInfoView";
import { Podcast } from "../../../models/Podcast";
import ControlsView from "./controls/ControlsView";
import Clip from "../../../models/editor/Clip";
import TimelineView from "./timeline/TimelineView";
import TrayViewModel from "./tray/TrayViewModel";
import { DropResult } from "react-beautiful-dnd";

interface IProps {
  paused: boolean;
  playbackPosition: number;
  displayPosition: string;
  timeline: Clip[];
  clips: Clip[];
  podcast: Podcast;

  onRewind: () => void;
  onForward: () => void;
  onPlayPause: () => void;
  onUpdatePlaybackPosition: (playbackPosition: number) => void;
  onUpdateDisplayPosition: (playbackPosition: number) => void;
  onTimelineDragEnd: (result: DropResult) => void;
}

export default class EditView extends Component<IProps> {
  render() {
    const { timeline } = this.props;

    return (
      <Grid container>
        <Grid item xs={12} md={6}>
          <Card style={{ margin: 4 }}>
            <CardContent>
              <PodcastInfoView {...this.props} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <TrayViewModel {...this.props} />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" style={{ textAlign: "center" }}>
            Recordings
          </Typography>
        </Grid>

        <TimelineView {...this.props} timeline={timeline} />
      </Grid>
    );
  }
}
