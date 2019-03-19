import React, { Component } from "react";
import DataManager from "../../../../../data/api/DataManager";
import { Podcast } from "../../../../../utility/types";
import NewSessionDialogView from "./NewSessionDialogView";

interface IProps {
  api: DataManager;
  podcast: Podcast;
  onClose: () => void;
}

export default class NewSessionDialogViewModel extends Component<IProps> {
  /**
   * Called when a session should be created.
   */
  private onCreateSession = async () => {
    const { api, podcast, onClose } = this.props;

    await api.createSession(podcast.uid).then(onClose);
  };

  render() {
    return (
      <NewSessionDialogView
        {...this.props}
        onCreateSession={this.onCreateSession}
      />
    );
  }
}
