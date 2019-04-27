import React, { Component } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button
} from "@material-ui/core";
import ImageUploader from "react-images-upload";

interface IProps {
  name: string;
  description: string;
  imagePath: string;
  canSubmit: boolean;
  onNameChanged: (name: string) => void;
  onDescriptionChanged: (description: string) => void;
  onImageChanged: (files: File[]) => void;
  onSubmit: () => void;
  onClose: () => void;
}

export default class NewPodcastDialogView extends Component<IProps> {
  render() {
    const {
      name,
      description,
      imagePath,
      canSubmit,
      onNameChanged,
      onDescriptionChanged,
      onImageChanged,
      onSubmit,
      onClose
    } = this.props;

    const image =
      imagePath.length == 0 ? (
        <ImageUploader
          withIcon={true}
          buttonText="Select a Logo"
          label="Images must be square, and under 5mb."
          singleImage={true}
          onChange={onImageChanged}
          imgExtension={[".jpg", ".png"]}
          maxFileSize={5242880}
        />
      ) : (
        <img
          src={imagePath}
          style={{
            width: 175,
            height: 175,
            display: "block",
            marginLeft: "auto",
            marginRight: "auto"
          }}
        />
      );

    const text = (
      <form autoComplete="off">
        <TextField
          label="Name"
          margin="normal"
          variant="outlined"
          value={name}
          fullWidth
          onChange={e => onNameChanged(e.target.value)}
        />
        <TextField
          label="Description"
          margin="normal"
          variant="outlined"
          multiline
          fullWidth
          value={description}
          onChange={e => onDescriptionChanged(e.target.value)}
        />
      </form>
    );

    return (
      <Dialog open onClose={onClose}>
        <DialogTitle>New Podcast</DialogTitle>
        <DialogContent>
          {image}
          {text}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onSubmit} disabled={!canSubmit}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
