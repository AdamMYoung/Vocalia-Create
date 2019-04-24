import React, { Component } from "react";
import AssignedPodcastDialogView from "./AssignedPodcastDialogView";
import { PublishedPodcast } from "../../../../models/publishing/PublishedPodcast";
import DataManager from "../../../../data/api/DataManager";

interface IProps {
  api: DataManager;
  podcast: PublishedPodcast;

  onClose: () => void;
}

export default class AssignedPodcastDialogViewModel extends Component<IProps> {
  render() {
    return <AssignedPodcastDialogView />;
  }
}
