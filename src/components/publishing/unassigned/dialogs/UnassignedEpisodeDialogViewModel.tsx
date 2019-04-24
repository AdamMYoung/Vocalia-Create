import React, { Component } from "react";
import UnassignedEpisodeDialogView from "./UnassignedEpisodeDialogView";
import { UnassignedEpisode } from "../../../../models/publishing/UnassignedEpisode";
import DataManager from "../../../../data/api/DataManager";

interface IProps {
  api: DataManager;
  episode: UnassignedEpisode;

  onClose: () => void;
}

export default class UnassignedEpisodeDialogViewModel extends Component<
  IProps
> {
  render() {
    return <UnassignedEpisodeDialogView />;
  }
}
