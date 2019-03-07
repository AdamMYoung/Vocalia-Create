import React, { Component } from "react";
import DataManager from "../../../api/DataManager";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  DialogContentText
} from "@material-ui/core";

interface ISessionProps {
  api: DataManager;
  open: boolean;
  podcastId: string;
  closeDialog: () => void;
}

export default class SessionDialog extends Component<ISessionProps> {
  constructor(props: ISessionProps) {
    super(props);

    this.state = {
      open: true
    };
  }

  createSession = async () => {
    const { api, podcastId, closeDialog } = this.props;

    await api.createPodcastSession(podcastId);
    closeDialog();
  };

  render() {
    const { closeDialog, open } = this.props;

    return (
      <Dialog
        open={open}
        onClose={() => closeDialog()}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Session</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to create a new session?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => closeDialog()} color="primary">
            Cancel
          </Button>
          <Button onClick={this.createSession} color="primary">
            Create Session
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
