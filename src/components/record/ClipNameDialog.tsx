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
  buttonsDisabled: boolean;
}

export class ClipNameDialog extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      name: "Clip " + props.clipNumber,
      buttonsDisabled: false
    };
  }

  render() {
    const { onAccept } = this.props;
    const { name, buttonsDisabled } = this.state;

    return (
      <Dialog open>
        <DialogTitle>Finish Clip</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter a name below:</DialogContentText>
          <TextField
            autoFocus
            margin="normal"
            variant="outlined"
            label="Name"
            type="name"
            fullWidth
            value={name}
            onChange={event => this.setState({ name: event.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            disabled={buttonsDisabled}
            onClick={() => {
              this.setState({ buttonsDisabled: true });
              onAccept(name);
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
