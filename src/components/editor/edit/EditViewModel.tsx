import React, { Component } from "react";
import DataManager from "../../../data/api/DataManager";
import EditView from "./EditView";
import { EditStream } from "../../../models/editor/EditStream";

interface IProps {
  api: DataManager;
  podcastId: string;
  sessionId: string;
}

interface IState {
  streams: EditStream[];
}

export default class EditViewModel extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      streams: []
    };
  }

  componentWillMount() {
    this.loadStreams();
  }

  /**
   * Loads all edit streams for the specified session.
   */
  private loadStreams = async () => {
    const { api, sessionId } = this.props;
    var streams = await api.getEditStreams(sessionId);

    if (streams) this.setState({ streams });
  };

  render() {
    return <EditView {...this.state} />;
  }
}
