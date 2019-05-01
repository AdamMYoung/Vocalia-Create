import React, { Component } from "react";
import DataManager from "../../../../data/api/DataManager";
import { PublishedEpisode } from "../../../../models/publishing/PublishedEpisode";
import { UnassignedEpisode } from "../../../../models/publishing/UnassignedEpisode";
import UnassignedEpisodeDialogView from "./UnassignedEpisodeDialogView";

interface IProps {
  api: DataManager;
  episode: UnassignedEpisode;

  onClose: () => void;
}

interface IState {
  title: string;
  description: string;
  isUpdating: boolean;
}

export default class UnassignedEpisodeDialogViewModel extends Component<
  IProps,
  IState
> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      title: props.episode.name,
      description: "",
      isUpdating: false
    };
  }

  /**
   * Called when the title changes.
   */
  private onTitleChanged = (title: string) => {
    this.setState({ title });
  };

  /**
   * Called when the description changes.
   */
  private onDescriptionChanged = (description: string) => {
    this.setState({ description });
  };

  /**
   * Called when the episode is submitted.
   */
  private onSubmit = async () => {
    const { api, episode, onClose } = this.props;
    const { title, description } = this.state;

    if (title && description) {
      this.setState({ isUpdating: true });
      await api.updateEpisode(
        new PublishedEpisode(
          episode.uid,
          title,
          description,
          "",
          new Date(),
          "",
          true,
          episode.podcastUID
        )
      );
    }
    onClose();
  };

  render() {
    return (
      <UnassignedEpisodeDialogView
        {...this.props}
        {...this.state}
        onTitleChanged={this.onTitleChanged}
        onDescriptionChanged={this.onDescriptionChanged}
        onSubmit={this.onSubmit}
      />
    );
  }
}
