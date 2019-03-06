import React, { Component } from "react";
import DataManager from "../../../api/DataManager";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button
} from "@material-ui/core";

interface IGroupProps {
  api: DataManager;
  open: boolean;
  closeDialog: () => void;
}

interface IGroupState {
  name: string;
  description: string;
}

export default class GroupDialog extends Component<IGroupProps, IGroupState> {
  constructor(props: IGroupProps) {
    super(props);

    this.state = {
      name: "",
      description: ""
    };
  }

  createGroup = async () => {
    const { name, description } = this.state;
    const { api, closeDialog } = this.props;

    if (name.length > 0 && description.length > 0) {
      await api.createNewGroup(name, description);
      closeDialog();
    }
  };

  render() {
    const { closeDialog, open } = this.props;

    return (
      <Dialog
        open={open}
        onClose={() => closeDialog()}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Group</DialogTitle>
        <DialogContent>
          <form
            autoComplete="off"
            autoCapitalize="on"
            style={{ display: "inline-block" }}
          >
            <TextField
              autoFocus
              id="name"
              label="Name"
              value={this.state.name}
              fullWidth
              onChange={event => this.setState({ name: event.target.value })}
            />
            <TextField
              id="description"
              label="Description"
              inputProps={{ maxLength: "50" }}
              multiline={true}
              value={this.state.description}
              fullWidth
              style={{ marginTop: 10 }}
              onChange={event =>
                this.setState({ description: event.target.value })
              }
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => closeDialog()} color="primary">
            Cancel
          </Button>
          <Button onClick={this.createGroup} color="primary">
            Create Group
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
