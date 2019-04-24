import React, { Component } from "react";
import UnassignedPodcastDialogView from "./UnassignedPodcastDialogView";
import DataManager from "../../../../data/api/DataManager";
import { UnassignedPodcast } from "../../../../models/publishing/UnassignedPodcast";

interface IProps {
  api: DataManager;
  podcast: UnassignedPodcast;

  onClose: () => void;
}

export default class UnassignedPodcastDialogViewModel extends Component<
  IProps
> {
  render() {
    return <UnassignedPodcastDialogView />;
  }
}
