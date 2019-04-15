import React, { Component } from "react";
import { Grid, Typography, Divider } from "@material-ui/core";
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
        <Grid item xs={12} style={{ padding: 12 }}>
          <Typography variant="h6">Current Podcast</Typography>
          <PodcastInfoView {...this.props} />
          <Divider />
          <div style={{ margin: 8 }}>
            <ControlsView {...this.props} />
          </div>
          <Divider />
        </Grid>

        <div>
          <Typography variant="h6">User Streams</Typography>
          {tracks.map(track => (
            <UserTrackViewModel
              key={track.userUid}
              track={track}
              {...this.props}
            />
          ))}
        </div>
      </Grid>
    );
  }
}
