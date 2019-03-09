import React, { Component } from "react";
import DataManager from "../../../api/DataManager";
import {
  Dialog,
  TextField,
  DialogContent,
  DialogTitle,
  CardActionArea,
  CardMedia,
  Typography,
  DialogActions,
  Button
} from "@material-ui/core";
import ImageUploader from "react-images-upload";
import { Podcast, PodcastUpload } from "../../../utility/types";

interface IPodcastCreationDialogProps {
  api: DataManager;
  open: boolean;
  onFinish: () => void;
}

interface IPodcastCreationDialogState {
  podcastName: string;
  podcastDescription: string;
  podcastImage: File | null;
  podcastImagePath: string;
}

export default class PodcastCreationDialog extends Component<
  IPodcastCreationDialogProps,
  IPodcastCreationDialogState
> {
  constructor(props: IPodcastCreationDialogProps) {
    super(props);

    this.state = {
      podcastName: "",
      podcastDescription: "",
      podcastImage: null,
      podcastImagePath: ""
    };
  }

  /**
   * Handles image selection.
   */
  imageSelected = (picture: File[]) => {
    var reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result == "string") {
        this.setState({
          podcastImage: picture[0],
          podcastImagePath: reader.result
        });
      }
    };
    reader.readAsDataURL(picture[0]);
  };

  /**
   * Submits the podcast to the API.
   */
  submitPodcast = () => {
    const { api, onFinish } = this.props;
    const { podcastName, podcastDescription, podcastImage } = this.state;

    if (podcastImage) {
      var reader = new FileReader();
      var fileType = podcastImage.name.match(/\.[0-9a-z]+$/i);

      reader.onload = () => {
        var imageResult = reader.result as string;

        api.createPodcast({
          name: podcastName,
          description: podcastDescription,
          imageData: imageResult.split(",")[1],
          fileType: fileType ? fileType.toString() : ""
        } as PodcastUpload);
        onFinish();
      };

      reader.readAsDataURL(podcastImage);
    }
  };

  render() {
    const { open, onFinish } = this.props;
    const {
      podcastName,
      podcastDescription,
      podcastImagePath,
      podcastImage
    } = this.state;

    const canSubmit =
      podcastName.length > 0 && podcastDescription.length > 0 && podcastImage;

    return (
      <Dialog open={open} onClose={onFinish}>
        <DialogTitle>New Podcast</DialogTitle>
        <DialogContent>
          {!podcastImage ? (
            <ImageUploader
              withIcon={true}
              buttonText="Select a Logo"
              label="Images must be square, and under 5mb."
              singleImage={true}
              onChange={this.imageSelected}
              imgExtension={[".jpg", ".png"]}
              maxFileSize={5242880}
              withPreview={true}
            />
          ) : (
            <img
              src={podcastImagePath}
              style={{
                width: 175,
                height: 175,
                display: "block",
                marginLeft: "auto",
                marginRight: "auto"
              }}
            />
          )}

          <form autoComplete="off">
            <TextField
              label="Name"
              margin="normal"
              value={podcastName}
              fullWidth
              onChange={e => this.setState({ podcastName: e.target.value })}
            />
            <TextField
              label="Description"
              margin="normal"
              multiline
              fullWidth
              value={podcastDescription}
              onChange={e =>
                this.setState({ podcastDescription: e.target.value })
              }
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onFinish} color="primary">
            Cancel
          </Button>
          <Button
            autoFocus
            onClick={this.submitPodcast}
            color="primary"
            disabled={!canSubmit}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
