import React, { Component } from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  DialogContentText,
  Typography,
  TextField
} from "@material-ui/core";
import Clip from "../../../../models/editor/Clip";
import AudioEntryViewModel from "../audio/AudioEntryViewModel";
import ClipEditDialogVariableView from "./ClipEditDialogVariableView";
import ClipMedia from "../../../../models/editor/ClipMedia";

interface IProps {
  clip: Clip;
  startTrim: number;
  endTrim: number;
  gain: number;

  onCloseSettings: () => void;
  onStartTrimChanged: (trim: number) => void;
  onEndTrimChanged: (trim: number) => void;
  onGainChanged: (gain: number) => void;
}

export default class ClipEditDialogView extends Component<IProps> {
  render() {
    const {
      clip,
      startTrim,
      endTrim,
      gain,
      onCloseSettings,
      onStartTrimChanged,
      onEndTrimChanged,
      onGainChanged
    } = this.props;

    return (
      <Dialog open onClose={onCloseSettings}>
        <DialogTitle>{clip.name}</DialogTitle>
        <DialogContent>
          <AudioEntryViewModel
            onClipPlay={() => {}}
            clipUid={clip.uid}
            currentClipPlaying={""}
            entry={clip.media[0]}
          />
          <Typography variant="h6">Trim</Typography>

          <DialogContentText>Start</DialogContentText>
          <ClipEditDialogVariableView
            value={startTrim}
            valueName="%"
            onValueChanged={onStartTrimChanged}
          />
          <DialogContentText>End</DialogContentText>
          <ClipEditDialogVariableView
            value={endTrim}
            valueName="%"
            onValueChanged={onEndTrimChanged}
          />

          <Typography variant="h6">Gain</Typography>
          <ClipEditDialogVariableView
            value={gain}
            valueName="dB"
            onValueChanged={onGainChanged}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseSettings}>Finish</Button>
        </DialogActions>
      </Dialog>
    );
  }
}
