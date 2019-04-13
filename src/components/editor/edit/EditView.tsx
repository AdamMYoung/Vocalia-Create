import React, { Component } from "react";
import DataManager from "../../../data/api/DataManager";
import { EditStream } from "../../../models/editor/EditStream";
import TrackViewModel from "./tracks/TrackViewModel";
import { Grid, Typography, Divider } from "@material-ui/core";
import PodcastInfoView from "../../dialogs/detail/elements/PodcastInfoView";
import { Podcast } from "../../../models/Podcast";
import ControlsView from "./controls/ControlsView";

interface IProps {
  paused: boolean;
  playbackPosition: number;
  displayPosition: string;
  streams: EditStream[];
  podcast: Podcast;

  onRewind: () => void;
  onForward: () => void;
  onPlayPause: () => void;
  onUpdatePlaybackPosition: (playbackPosition: number) => void;
  onUpdateDisplayPosition: (playbackPosition: number) => void;
}

export default class EditView extends Component<IProps> {
  render() {
    const { streams, displayPosition } = this.props;

    return (
      <Grid container>
        <Grid item xs={12} style={{ padding: 12 }}>
          <Typography variant="h6">Current Podcast</Typography>
          <PodcastInfoView {...this.props} />
          <Divider />
          <div style={{ margin: 8 }}>
            <ControlsView {...this.props} />
          </div>
          <Divider />
        </Grid>

        <Typography variant="h6">User Streams</Typography>
        {streams.map(s => (
          <TrackViewModel key={s.userUID} stream={s} {...this.props} />
        ))}
      </Grid>
    );
  }
}
