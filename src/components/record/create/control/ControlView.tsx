import React, { Component } from "react";
import {
  Typography,
  IconButton,
  TextField,
  Grid,
  Button
} from "@material-ui/core";
import { Stop, Pause, PlayArrow } from "@material-ui/icons";

interface IProps {
  duration: string;
  isRecording: boolean;
  onToggleRecording: () => void;
  onStopRecording: () => void;
  onStartRecording: () => void;
}

export default class ControlView extends Component<IProps> {
  render() {
    const { duration, isRecording } = this.props;

    return (
      <div>
        <Grid container>
          <Grid item xs={4}>
            <Button fullWidth>Start Recording</Button>
          </Grid>
          <Grid item xs={4}>
            <Typography
              variant="h6"
              style={{
                paddingTop: 2,
                textAlign: "center"
              }}
            >
              {duration}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Button fullWidth>Pause</Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}
