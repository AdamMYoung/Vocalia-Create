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
import AudioEntryViewModel from "./audio/AudioEntryViewModel";

interface IProps {
  paused: boolean;
  playbackPosition: number;
  displayPosition: string;
  timeline: Clip[];
  podcast: Podcast;

  onRewind: () => void;
  onForward: () => void;
  onPlayPause: () => void;
  onUpdatePlaybackPosition: (playbackPosition: number) => void;
  onUpdateDisplayPosition: (playbackPosition: number) => void;
}

export default class EditView extends Component<IProps> {
  render() {
    const { timeline } = this.props;

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

        {timeline.length > 0 && (
          <Grid item xs={12} style={{ display: "flex" }}>
            <Card style={{ margin: 4 }}>
              <CardContent>
                {timeline[0].entries.map(entry => (
                  <div style={{ height: 50, margin: 2 }}>{entry.userUid}</div>
                ))}
              </CardContent>
            </Card>

            <Card style={{ margin: 4 }}>
              <CardContent style={{ display: "flex", flexWrap: "nowrap" }}>
                {timeline.map(t =>
                  t.entries.map(entry => (
                    <div style={{ height: 50, margin: 2 }}>
                      <AudioEntryViewModel entry={entry} />
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </Grid>
        )}

        {timeline.map(track => (
          <Grid key={track.uid} item xs={12} />
        ))}
      </Grid>
    );
  }
}
