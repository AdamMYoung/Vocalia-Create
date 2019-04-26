import React, { Component } from "react";
import { PublishedPodcast } from "../../../models/publishing/PublishedPodcast";
import AssignedView from "./AssignedView";
import DataManager from "../../../data/api/DataManager";
import AssignedPodcastDialogViewModel from "./dialogs/AssignedPodcastDialogViewModel";

interface IProps {
  api: DataManager;
  podcasts: PublishedPodcast[];
  onReload: () => void;
}

interface IState {
  podcast: PublishedPodcast | null;
}

export default class AssignedViewModel extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      podcast: null
    };
  }

  /**
   * Called when a podcast has been selected.
   */
  private onPodcastSelected = (podcast: PublishedPodcast) => {
    this.setState({ podcast });
  };

  /**
   * Called when the dialog is closed.
   */
  private onClose = () => {
    const { onReload } = this.props;

    this.setState({ podcast: null });
    onReload();
  };

  render() {
    const { podcast } = this.state;

    return (
      <div>
        <AssignedView
          {...this.props}
          onPodcastSelected={this.onPodcastSelected}
        />
        {podcast && (
          <AssignedPodcastDialogViewModel
            {...this.props}
            podcast={podcast}
            onClose={this.onClose}
          />
        )}
      </div>
    );
  }
}
