import React, { Component } from "react";
import { Typography, Grid, Button, Divider } from "@material-ui/core";

interface IProps {
  duration: string;
  accessLevel: number;
  isRecording: boolean;
  isPaused: boolean;

  toggleRecording: () => void;
  togglePaused: () => void;
  endSession: () => void;
}

export default class ControlView extends Component<IProps> {
  render() {
    const {
      duration,
      accessLevel,
      isRecording,
      isPaused,
      toggleRecording,
      togglePaused,
      endSession
    } = this.props;

    return (
      <div>
        <Grid container>
          <Grid
            item
            xs={12}
            style={{ display: "flex", verticalAlign: "center" }}
          >
            <Button fullWidth onClick={endSession} disabled={accessLevel <= 1}>
              End Recording Session
            </Button>
          </Grid>
          <Grid item xs={12} style={{ padding: 8 }}>
            <Divider />
          </Grid>

          <Grid
            item
            xs={4}
            style={{ display: "flex", verticalAlign: "center" }}
          >
            <Button
              fullWidth
              onClick={toggleRecording}
              disabled={accessLevel <= 1}
            >
              {(isRecording ? "Stop" : "Start New ") + " Clip"}
            </Button>
          </Grid>
          <Grid
            item
            xs={4}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Typography variant="h6">{duration}</Typography>
          </Grid>
          <Grid
            item
            xs={4}
            style={{ display: "flex", verticalAlign: "center" }}
          >
            <Button
              fullWidth
              disabled={!isRecording || accessLevel < 1}
              onClick={togglePaused}
            >
              {isPaused ? "Resume" : "Pause"}
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}
