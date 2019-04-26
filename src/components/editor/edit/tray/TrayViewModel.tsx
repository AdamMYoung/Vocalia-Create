import React, { Component } from "react";
import TrayView from "./TrayView";
import Clip from "../../../../models/editor/Clip";
import { Podcast } from "../../../../models/Podcast";
import DataManager from "../../../../data/api/DataManager";
import SessionEndDialog from "../../../dialogs/SessionEndDialog";

interface IProps {
  api: DataManager;
  clips: Clip[];
  podcast: Podcast;
  sessionId: string;
}

interface IState {
  isFinishedEditing: boolean;
}

export default class TrayViewModel extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      isFinishedEditing: false
    };
  }

  /**
   * Finishes editing the current session.
   */
  private onFinishEditing = () => {
    const { api, sessionId } = this.props;
    api.finishEditSession(sessionId);
    this.setState({ isFinishedEditing: true });
  };

  render() {
    const { isFinishedEditing } = this.state;

    return (
      <div>
        <TrayView {...this.props} onFinishEditing={this.onFinishEditing} />
        {isFinishedEditing && (
          <SessionEndDialog redirectPath={"/editor/selection"} />
        )}
      </div>
    );
  }
}
