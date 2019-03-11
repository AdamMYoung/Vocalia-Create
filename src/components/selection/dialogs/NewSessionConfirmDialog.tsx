import React, { Component } from "react";
import DataManager from "../../../api/DataManager";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@material-ui/core";

interface INewSessionConfirmDialogProps {
  api: DataManager;
  open: boolean;
  podcastUid: string;
  onClose: () => void;
}

interface INewSessionConfirmDialogState {}

export default class NewSessionConfirmDialog extends Component<
  INewSessionConfirmDialogProps,
  INewSessionConfirmDialogState
> {
  constructor(props: INewSessionConfirmDialogProps) {
    super(props);

    this.state = {};
  }

  createSession = () => {
    const { api, podcastUid, onClose } = this.props;

    api.createSession(podcastUid);
    onClose();
  };

  render() {
    const { open, onClose } = this.props;

    return (
      <Dialog open={open}>
        <DialogTitle>Create New Session</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to create a new session?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button autoFocus onClick={this.createSession} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
