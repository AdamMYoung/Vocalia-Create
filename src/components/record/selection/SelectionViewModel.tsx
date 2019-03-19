import React, { Component } from "react";
import { Podcast } from "../../../utility/types";
import SelectionView from "./SelectionView";
import DataManager from "../../../data/api/DataManager";
import DetailDialogViewModel from "./dialogs/detail/DetailDialogViewModel";
import NewPodcastDialogViewModel from "./dialogs/newPodcast/NewPodcastDialogViewModel";

interface IProps {
  api: DataManager;
  isMobile: boolean;
}

interface IState {
  podcasts: Podcast[];
  currentPodcast: Podcast | null;
  createNewPodcast: boolean;
}

export default class SelectionViewModel extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      podcasts: [],
      currentPodcast: null,
      createNewPodcast: false
    };
  }

  /**
   * Loads the user's podcasts.
   */
  componentWillMount() {
    this.loadPodcasts();
  }

  /**
   * Loads all podcasts belonging to the user.
   */
  private loadPodcasts = async () => {
    const { api } = this.props;
    var podcasts = await api.getPodcasts();
    if (podcasts) this.setState({ podcasts });
  };

  /**
   * Called when a podcast has been selected.
   */
  private onPodcastSelected = (currentPodcast: Podcast | null) => {
    this.setState({ currentPodcast });
  };

  /**
   * Called when the detail dialog should be closed.
   */
  private onCloseDetail = () => {
    this.setState({ currentPodcast: null });
  };

  /**
   * Called when a new podcast is to be created.
   */
  private onNewPodcast = () => {
    this.setState({ createNewPodcast: true });
  };

  /**
   * Called when the new podcast dialog should be closed.
   */
  private onCloseNewPodcast = () => {
    this.setState({ createNewPodcast: false });
  };

  render() {
    const { createNewPodcast, currentPodcast } = this.state;

    return (
      <SelectionView
        {...this.state}
        {...this.props}
        onPodcastSelected={this.onPodcastSelected}
        onNewPodcast={this.onNewPodcast}
      >
        {createNewPodcast && (
          <NewPodcastDialogViewModel
            {...this.props}
            onClose={this.onCloseNewPodcast}
          />
        )}
        {currentPodcast && (
          <DetailDialogViewModel
            {...this.props}
            podcast={currentPodcast}
            onClose={this.onCloseDetail}
          />
        )}
      </SelectionView>
    );
  }
}
