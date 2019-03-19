import React, { Component } from "react";
import DataManager from "../../../../../data/api/DataManager";
import NewPodcastDialogView from "./NewPodcastDialogView";

interface IProps {
  api: DataManager;
  onClose: () => void;
}

interface IState {
  name: string;
  description: string;
  imagePath: string;
  imageData: string;
  fileType: string;
  canSubmit: boolean;
}

export default class NewPodcastDialogViewModel extends Component<
  IProps,
  IState
> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      name: "",
      description: "",
      imagePath: "",
      imageData: "",
      fileType: "",
      canSubmit: false
    };
  }

  /**
   * Called when the component updates, updating the canSubmit flag.
   */
  componentDidUpdate(prevProps: IProps, prevState: IState) {
    const { name, description, imageData } = this.state;
    var canSubmit = Boolean(name) && Boolean(description) && Boolean(imageData);

    if (prevState.canSubmit != canSubmit) this.setState({ canSubmit });
  }

  /**
   * Called when the name has changed.
   */
  private onNameChanged = (name: string) => {
    this.setState({ name });
  };

  /**
   * Called when the description has changed.
   */
  private onDescriptionChanged = (description: string) => {
    this.setState({ description });
  };

  /**
   * Called when the selected image has changed.
   */
  private onImageChanged = (image: File[]) => {
    var reader = new FileReader();

    var split = image[0].name.match(/\.[0-9a-z]+$/i);
    var fileType = split ? split.toString() : "";

    reader.onload = () => {
      if (typeof reader.result == "string") {
        var imageData = reader.result.split(",")[1];
        this.setState({ imagePath: reader.result, fileType, imageData });
      }
    };
    reader.readAsDataURL(image[0]);
  };

  /**
   * Called when the podcast should be submitted.
   */
  private onSubmit = async () => {
    const { api, onClose } = this.props;
    const { name, description, imageData, fileType } = this.state;

    this.setState({ canSubmit: false });
    await api.createPodcast({ name, description, imageData, fileType });
    onClose();
  };

  render() {
    return (
      <NewPodcastDialogView
        {...this.state}
        {...this.props}
        onNameChanged={this.onNameChanged}
        onDescriptionChanged={this.onDescriptionChanged}
        onImageChanged={this.onImageChanged}
        onSubmit={this.onSubmit}
      />
    );
  }
}
