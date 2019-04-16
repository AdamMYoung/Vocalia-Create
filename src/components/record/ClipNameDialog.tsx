import React, { Component } from "react";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  DialogTitle,
  TextField
} from "@material-ui/core";

interface IProps {
  onAccept: (name: string) => void;
  clipNumber: number;
}

interface IState {
  name: string;
}

export class ClipNameDialog extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      name: "Session " + props.clipNumber
    };
  }

  render() {
    const { onAccept } = this.props;
    const { name } = this.state;

    return (
      <Dialog open>
        <DialogTitle>Finish Clip</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter a name below:</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="name"
            fullWidth
            value={name}
            onChange={event => this.setState({ name: event.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => onAccept(name)}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
