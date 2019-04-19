import React, { Component } from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  DialogContentText,
  Typography
} from "@material-ui/core";
import Clip from "../../../../models/editor/Clip";
import AudioEntryViewModel from "../audio/AudioEntryViewModel";
import ClipEditDialogVariableView from "./ClipEditDialogVariableView";

interface IProps {
  clip: Clip;
  startTrim: number;
  endTrim: number;
  buttonsDisabled: boolean;

  onCancel: () => void;
  onSubmit: () => void;
  onStartTrimChanged: (trim: number) => void;
  onEndTrimChanged: (trim: number) => void;
}

export default class ClipEditDialogView extends Component<IProps> {
  render() {
    const {
      clip,
      startTrim,
      endTrim,
      buttonsDisabled,
      onSubmit,
      onCancel,
      onStartTrimChanged,
      onEndTrimChanged
    } = this.props;

    return (
      <Dialog open onClose={onCancel}>
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
            valueName="seconds"
            onValueChanged={onStartTrimChanged}
          />
          <DialogContentText>End</DialogContentText>
          <ClipEditDialogVariableView
            value={endTrim}
            valueName="seconds"
            onValueChanged={onEndTrimChanged}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel} disabled={buttonsDisabled} color="primary">
            Cancel
          </Button>
          <Button onClick={onSubmit} disabled={buttonsDisabled} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
