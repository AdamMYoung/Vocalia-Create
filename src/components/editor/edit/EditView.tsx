import React, { Component } from "react";
import { Grid, Typography, Card, CardContent, Button } from "@material-ui/core";
import PodcastInfoView from "../../dialogs/detail/elements/PodcastInfoView";
import { Podcast } from "../../../models/Podcast";
import Clip from "../../../models/editor/Clip";
import TrayViewModel from "./tray/TrayViewModel";
import { DropResult } from "react-beautiful-dnd";
import { TimelineViewModel } from "./timeline/TimelineViewModel";
import DataManager from "../../../data/api/DataManager";

interface IProps {
  api: DataManager;
  timeline: Clip[];
  clips: Clip[];
  podcast: Podcast;

  onTimelineDragEnd: (result: DropResult) => void;
  onReloadTimeline: () => void;
}

export default class EditView extends Component<IProps> {
  render() {
    const { timeline } = this.props;

    return (
      <Grid container>
        <Grid item xs={12}>
          <TrayViewModel {...this.props} />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" style={{ textAlign: "center" }}>
            Recordings
          </Typography>
        </Grid>

        <TimelineViewModel {...this.props} timeline={timeline} />
      </Grid>
    );
  }
}
