import React, { Component } from "react";
import SelectionView from "../../selection/SelectionView";
import DataManager from "../../../data/api/DataManager";
import { Podcast } from "../../../models/Podcast";

interface IProps {
  api: DataManager;
  isMobile: boolean;
}

interface IState {
  podcasts: Podcast[];
  currentPodcast: Podcast | null;
}

export default class EditorSelectionViewModel extends Component<
  IProps,
  IState
> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      podcasts: [],
      currentPodcast: null
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

  render() {
    return (
      <SelectionView
        {...this.props}
        {...this.state}
        title="Editor"
        canCreateNewPodcast={false}
        onPodcastSelected={this.onPodcastSelected}
      />
    );
  }
}
