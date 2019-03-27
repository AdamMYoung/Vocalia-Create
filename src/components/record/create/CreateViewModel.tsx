import React, { Component } from "react";
import DataManager from "../../../data/api/DataManager";
import { Podcast } from "../../../utility/types";
import CreateView from "./CreateView";
import * as signalR from "@aspnet/signalr";
import NewInviteDialogViewModel from "../../dialogs/newInvite/NewInviteDialogViewModel";

interface IProps {
  api: DataManager;
  podcastId: string;
  sessionId: string;
}

interface IState {
  podcast: Podcast | null;
  isInviteOpen: boolean;
}

/**
 * SignalR signalling server connection information.
 */
const hub = new signalR.HubConnectionBuilder()
  .configureLogging(signalR.LogLevel.Information)
  .withUrl(process.env.REACT_APP_INGEST_SIGNALR_URL as string, {
    skipNegotiation: true,
    transport: signalR.HttpTransportType.WebSockets
  })
  .build();

export default class CreateViewModel extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      podcast: null,
      isInviteOpen: false
    };
  }

  /**
   * Loads the podcast information passed.
   */
  componentWillMount() {
    const { api, sessionId } = this.props;
    this.loadPodcast();
    hub.start().then(() => {
      api.getSignedInUserInfo().then(currentUser => {
        if (currentUser)
          hub.invoke("joinGroup", currentUser.userUID, sessionId);
      });
    });
  }

  /**
   * Reloads the podcast if the ID has changed.
   * @param prevProps Previous podcast information
   */
  componentDidUpdate(prevProps: IProps) {
    if (this.props.podcastId != prevProps.podcastId) this.loadPodcast();
  }

  componentWillUnmount() {
    hub.stop();
  }

  /**
   * Loads general podcast information from the podcast ID.
   */
  private loadPodcast = async () => {
    const { api, podcastId } = this.props;

    var podcast = await api.getPodcastDetail(podcastId);
    this.setState({ podcast });
  };

  /**
   * Called when the invite window should be opened.
   */
  private onInvite = () => {
    this.setState({ isInviteOpen: true });
  };

  /**
   * Called when the invite window should be closed.
   */
  private onInviteClose = () => {
    this.setState({ isInviteOpen: false });
  };

  render() {
    const { podcast, isInviteOpen } = this.state;

    return (
      podcast && (
        <CreateView
          {...this.props}
          hub={hub}
          podcast={podcast}
          onInvite={this.onInvite}
        >
          {isInviteOpen && (
            <NewInviteDialogViewModel
              {...this.props}
              podcast={podcast}
              onClose={this.onInviteClose}
            />
          )}
        </CreateView>
      )
    );
  }
}
