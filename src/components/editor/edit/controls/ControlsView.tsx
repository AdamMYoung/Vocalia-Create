import React, { Component } from "react";
import { Grid, Button, Typography, Divider } from "@material-ui/core";

interface IProps {
  paused: boolean;
  displayPosition: string;
  onRewind: () => void;
  onForward: () => void;
  onPlayPause: () => void;
}

export default class ControlsView extends Component<IProps> {
  render() {
    const {
      paused,
      displayPosition,
      onRewind,
      onForward,
      onPlayPause
    } = this.props;
    return (
      <div>
        <Grid container>
          <Grid
            item
            xs={4}
            style={{ display: "flex", verticalAlign: "center" }}
          >
            <Button onClick={onRewind} fullWidth>
              Rewind
            </Button>
          </Grid>

          <Grid
            item
            xs={4}
            style={{ display: "flex", verticalAlign: "center" }}
          >
            <Button onClick={onPlayPause} fullWidth>
              {paused ? "Play" : "Pause"}
            </Button>
          </Grid>
          <Grid
            item
            xs={4}
            style={{ display: "flex", verticalAlign: "center" }}
          >
            <Button onClick={onForward} fullWidth>
              Forward
            </Button>
          </Grid>
          <Grid item xs={12} style={{ padding: 8 }}>
            <Divider />
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Typography variant="h6">{displayPosition}</Typography>
          </Grid>
        </Grid>
      </div>
    );
  }
}
