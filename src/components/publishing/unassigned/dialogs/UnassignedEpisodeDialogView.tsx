import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from "@material-ui/core";
import React, { Component } from "react";
import TimeAgo from "react-timeago";
import { UnassignedEpisode } from "../../../../models/publishing/UnassignedEpisode";

interface IProps {
  episode: UnassignedEpisode;
  title: string;
  description: string;
  isUpdating: boolean;

  onTitleChanged: (title: string) => void;
  onDescriptionChanged: (description: string) => void;
  onSubmit: () => void;
  onClose: () => void;
}

export default class UnassignedEpisodeDialogView extends Component<IProps> {
  render() {
    const {
      episode,
      title,
      description,
      isUpdating,
      onTitleChanged,
      onDescriptionChanged,
      onClose,
      onSubmit
    } = this.props;

    return (
      <Dialog open onClose={onClose}>
        <DialogTitle>
          <TimeAgo date={new Date(episode.date)} />
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            value={title}
            margin="normal"
            variant="outlined"
            onChange={e => onTitleChanged(e.target.value)}
          />
          <TextField
            fullWidth
            label="Description"
            value={description}
            margin="normal"
            variant="outlined"
            onChange={e => onDescriptionChanged(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={isUpdating}>
            Close
          </Button>
          <Button onClick={onSubmit} disabled={isUpdating}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
