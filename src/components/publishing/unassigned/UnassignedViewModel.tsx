import React, { Component } from "react";
import { UnassignedPodcast } from "../../../models/publishing/UnassignedPodcast";
import { UnassignedEpisode } from "../../../models/publishing/UnassignedEpisode";
import UnassignedView from "./UnassignedView";
import DataManager from "../../../data/api/DataManager";
import UnassignedEpisodeDialogViewModel from "./dialogs/UnassignedEpisodeDialogViewModel";
import UnassignedPodcastDialogViewModel from "./dialogs/UnassignedPodcastDialogViewModel";

interface IProps {
  api: DataManager;
  podcasts: UnassignedPodcast[];
  episodes: UnassignedEpisode[];
}

interface IState {
  selectedEpisode: UnassignedEpisode | null;
  selectedPodcast: UnassignedPodcast | null;
}

export default class UnassignedViewModel extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      selectedEpisode: null,
      selectedPodcast: null
    };
  }

  /**
   * Called when an episode has been selected.
   */
  private onEpisodeSelected = (episode: UnassignedEpisode) => {
    this.setState({ selectedEpisode: episode });
  };

  /**
   * Called when a podcast has been selected.
   */
  private onPodcastSelected = (podcast: UnassignedPodcast) => {
    this.setState({ selectedPodcast: podcast });
  };

  /**
   * Called when the dialog has closed.
   */
  private onClose = () => {
    this.setState({ selectedEpisode: null, selectedPodcast: null });
  };

  render() {
    const { selectedEpisode, selectedPodcast } = this.state;

    return (
      <div>
        <UnassignedView
          {...this.props}
          {...this.state}
          onEpisodeSelected={this.onEpisodeSelected}
          onPodcastSelected={this.onPodcastSelected}
        />
        {selectedEpisode && (
          <UnassignedEpisodeDialogViewModel
            episode={selectedEpisode}
            {...this.props}
            onClose={this.onClose}
          />
        )}
        {selectedPodcast && (
          <UnassignedPodcastDialogViewModel
            podcast={selectedPodcast}
            {...this.props}
            onClose={this.onClose}
          />
        )}
      </div>
    );
  }
}
