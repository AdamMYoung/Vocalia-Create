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
import UserTrackViewModel from "./user/UserTrackViewModel";
import UserTrack from "../../../models/editor/UserTrack";

interface IProps {
  paused: boolean;
  playbackPosition: number;
  displayPosition: string;
  tracks: UserTrack[];
  podcast: Podcast;

  onRewind: () => void;
  onForward: () => void;
  onPlayPause: () => void;
  onUpdatePlaybackPosition: (playbackPosition: number) => void;
  onUpdateDisplayPosition: (playbackPosition: number) => void;
}

export default class EditView extends Component<IProps> {
  render() {
    const { tracks } = this.props;

    return (
      <Grid container>
        <Grid item xs={12}>
          <Card style={{ margin: 4 }}>
            <CardContent>
              <Typography variant="h6">Current Podcast</Typography>
              <PodcastInfoView {...this.props} />
              <Divider />
              <div style={{ margin: 8 }}>
                <ControlsView {...this.props} />
              </div>
              <Divider />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" style={{ textAlign: "center" }}>
            Recordings
          </Typography>
        </Grid>

        {tracks.map(track => (
          <Grid key={track.userUid} item xs={12}>
            <UserTrackViewModel track={track} {...this.props} />
          </Grid>
        ))}
      </Grid>
    );
  }
}
