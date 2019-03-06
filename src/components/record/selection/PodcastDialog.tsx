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

interface IPodcastProps {
  api: DataManager;
  open: boolean;
  groupId: string;
  closeDialog: () => void;
}

interface IPodcastState {
  name: string;
}

export default class PodcastDialog extends Component<
  IPodcastProps,
  IPodcastState
> {
  constructor(props: IPodcastProps) {
    super(props);

    this.state = {
      name: ""
    };
  }

  createPodcast = async () => {
    const { name } = this.state;
    const { api, groupId, closeDialog } = this.props;

    if (name.length > 0) {
      await api.createGroupPodcast(groupId, name);
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
        <DialogTitle id="form-dialog-title">New Podcast</DialogTitle>
        <DialogContent>
          <form autoComplete="off" autoCapitalize="on">
            <TextField
              autoFocus
              id="name"
              label="Name"
              fullWidth
              value={this.state.name}
              onChange={event => this.setState({ name: event.target.value })}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => closeDialog()} color="primary">
            Cancel
          </Button>
          <Button onClick={this.createPodcast} color="primary">
            Create Podcast
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
