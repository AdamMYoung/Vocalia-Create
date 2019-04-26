import React, { Component } from "react";
import PublishingView from "./PublishingView";
import DataManager from "../../data/api/DataManager";
import { UnassignedPodcast } from "../../models/publishing/UnassignedPodcast";
import { PublishedPodcast } from "../../models/publishing/PublishedPodcast";
import { UnassignedEpisode } from "../../models/publishing/UnassignedEpisode";

interface IProps {
  api: DataManager;
}

interface IState {
  publishedPodcasts: PublishedPodcast[];
  unassignedPodcasts: UnassignedPodcast[];
  unassignedEpisodes: UnassignedEpisode[];
}

export default class PublishingViewModel extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      publishedPodcasts: [],
      unassignedEpisodes: [],
      unassignedPodcasts: []
    };
  }

  async componentDidMount() {
    this.loadPublishingData();
  }

  private loadPublishingData = async () => {
    const { api } = this.props;

    var publishedPodcasts = await api.getAssignedPodcasts();
    if (publishedPodcasts) this.setState({ publishedPodcasts });

    var unassignedPodcasts = await api.getUnassignedPodcasts();
    if (unassignedPodcasts) this.setState({ unassignedPodcasts });

    var unassignedEpisodes = await api.getUnassignedEpisodes();
    if (unassignedEpisodes) this.setState({ unassignedEpisodes });
  };

  render() {
    return (
      <PublishingView
        {...this.state}
        {...this.props}
        onReload={this.loadPublishingData}
      />
    );
  }
}
