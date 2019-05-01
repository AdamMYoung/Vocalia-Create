import { Grid, Typography } from "@material-ui/core";
import React, { Component } from "react";
import { DropResult } from "react-beautiful-dnd";
import DataManager from "../../../data/api/DataManager";
import Clip from "../../../models/editor/Clip";
import { Podcast } from "../../../models/Podcast";
import { TimelineViewModel } from "./timeline/TimelineViewModel";
import TrayViewModel from "./tray/TrayViewModel";

interface IProps {
  api: DataManager;
  timeline: Clip[];
  clips: Clip[];
  podcast: Podcast;
  sessionId: string;

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
          <TimelineViewModel {...this.props} timeline={timeline} />
        </Grid>
      </Grid>
    );
  }
}
