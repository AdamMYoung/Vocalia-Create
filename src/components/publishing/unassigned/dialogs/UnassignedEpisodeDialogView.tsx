import React, { Component } from "react";
import { UnassignedEpisode } from "../../../../models/publishing/UnassignedEpisode";
import TimeAgo from "react-timeago";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from "@material-ui/core";

interface IProps {
  episode: UnassignedEpisode;
  title: string;
  description: string;

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
            onChange={e => onTitleChanged(e.target.value)}
          />
          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={e => onDescriptionChanged(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={onClose}>
            Close
          </Button>
          <Button color="primary" onClick={onSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
