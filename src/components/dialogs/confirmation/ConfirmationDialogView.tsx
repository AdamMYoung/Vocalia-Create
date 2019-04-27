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

interface IState {
  buttonsDisabled: boolean;
}

export default class ConfirmationDialogView extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      buttonsDisabled: false
    };
  }

  render() {
    const { title, subtitle, onConfirm, onDeny } = this.props;
    const { buttonsDisabled } = this.state;

    return (
      <Dialog open>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{subtitle}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onDeny} disabled={buttonsDisabled}>
            Cancel
          </Button>
          <Button
            disabled={buttonsDisabled}
            onClick={() => {
              this.setState({ buttonsDisabled: true });
              onConfirm();
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
