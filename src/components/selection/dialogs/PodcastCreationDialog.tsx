import React, { Component } from "react";
import DataManager from "../../../api/DataManager";
import {
  Dialog,
  TextField,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button
} from "@material-ui/core";
import ImageUploader from "react-images-upload";
import { PodcastUpload } from "../../../utility/types";
import { delay } from "q";

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
  canSubmit: boolean;
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
      podcastImagePath: "",
      canSubmit: false
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

    this.setState({ canSubmit: false });

    if (podcastImage) {
      var reader = new FileReader();
      var fileType = podcastImage.name.match(/\.[0-9a-z]+$/i);

      reader.onload = async () => {
        var imageResult = reader.result as string;

        await api.createPodcast({
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
      podcastImage,
      canSubmit
    } = this.state;

    const isDisabled =
      podcastName.length > 0 &&
      podcastDescription.length > 0 &&
      podcastImage != null;

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
              onChange={e => {
                this.imageSelected(e);
                this.setState({ canSubmit: isDisabled });
              }}
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
              onChange={e =>
                this.setState({
                  podcastName: e.target.value,
                  canSubmit: isDisabled
                })
              }
            />
            <TextField
              label="Description"
              margin="normal"
              multiline
              fullWidth
              value={podcastDescription}
              onChange={e =>
                this.setState({
                  podcastDescription: e.target.value,
                  canSubmit: isDisabled
                })
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
