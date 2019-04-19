import React, { Component } from "react";
import TrayView from "./TrayView";
import Clip from "../../../../models/editor/Clip";
import { Podcast } from "../../../../models/Podcast";
import DataManager from "../../../../data/api/DataManager";

interface IProps {
  api: DataManager;
  clips: Clip[];
  podcast: Podcast;
  sessionId: string;
}

export default class TrayViewModel extends Component<IProps> {
  /**
   * Finishes editing the current session.
   */
  private onFinishEditing = () => {
    const { api, sessionId } = this.props;
    api.finishEditSession(sessionId);
  };

  render() {
    return <TrayView {...this.props} onFinishEditing={this.onFinishEditing} />;
  }
}
