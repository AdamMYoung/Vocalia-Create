import React, { Component } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@material-ui/core";

interface IProps {
  onClose: () => void;
  onCreateSession: () => void;
}

export default class NewSessionDialogView extends Component<IProps> {
  render() {
    const { onClose, onCreateSession } = this.props;

    return (
      <Dialog open onClose={onClose}>
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
          <Button autoFocus onClick={onCreateSession} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
