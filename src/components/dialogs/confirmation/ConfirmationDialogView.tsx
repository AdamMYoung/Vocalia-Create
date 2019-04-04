import React, { Component } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  Button,
  DialogActions
} from "@material-ui/core";

interface IProps {
  title: string;
  subtitle?: string;
  onConfirm: () => void;
  onDeny?: () => void;
}

export default class ConfirmationDialogView extends Component<IProps> {
  render() {
    const { title, subtitle, onConfirm, onDeny } = this.props;

    return (
      <Dialog open>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{subtitle}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={onDeny}>
            Cancel
          </Button>
          <Button color="primary" onClick={onConfirm}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
