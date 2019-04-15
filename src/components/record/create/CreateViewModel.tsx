import React, { Component } from "react";
import DataManager from "../../../data/api/DataManager";
import CreateView from "./CreateView";
import * as signalR from "@aspnet/signalr";
import NewInviteDialogViewModel from "../../dialogs/newInvite/NewInviteDialogViewModel";
import { Dialog, DialogTitle } from "@material-ui/core";
import { Podcast } from "../../../models/Podcast";
import { User } from "../../../models/User";
import { SessionClip } from "../../../models/SessionClip";

interface IProps {
  api: DataManager;
  podcastId: string;
  sessionId: string;
}

interface IState {
  podcast: Podcast | null;
  currentUser: User | null;
  clips: SessionClip[];
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
      currentUser: null,
      clips: [],
      isInviteOpen: false
    };
  }

  /**
   * Loads the podcast information passed.
   */
  componentWillMount() {
    const { api, sessionId } = this.props;
    this.loadPodcast();
    this.onClipsChanged();
    hub.start().then(() => {
      api.getSignedInUserInfo().then(currentUser => {
        if (currentUser) {
          this.setState({ currentUser });
          hub.invoke("joinGroup", currentUser.userUID, sessionId);
        }
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

  /**
   * Called when the window is being disposed.
   */
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

  /**
   * Called when the clips have changed.
   */
  private onClipsChanged = async () => {
    const { api, sessionId } = this.props;

    var clips = await api.getClips(sessionId);
    if (clips) this.setState({ clips });
  };

  render() {
    const { podcast, currentUser, clips, isInviteOpen } = this.state;

    return podcast && currentUser ? (
      <CreateView
        {...this.props}
        currentUser={currentUser}
        hub={hub}
        podcast={podcast}
        clips={clips}
        onInvite={this.onInvite}
        onClipsChanged={this.onClipsChanged}
      >
        {isInviteOpen && (
          <NewInviteDialogViewModel
            {...this.props}
            podcast={podcast}
            onClose={this.onInviteClose}
          />
        )}
      </CreateView>
    ) : (
      <Dialog open>
        <DialogTitle>Loading Session...</DialogTitle>
      </Dialog>
    );
  }
}
