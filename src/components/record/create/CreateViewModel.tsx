import React, { Component } from "react";
import DataManager from "../../../data/api/DataManager";
import { Podcast } from "../../../utility/types";
import CreateView from "./CreateView";
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
    this.loadPodcast();
  }

  /**
   * Reloads the podcast if the ID has changed.
   * @param prevProps Previous podcast information
   */
  componentDidUpdate(prevProps: IProps) {
    if (this.props.podcastId != prevProps.podcastId) this.loadPodcast();
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
        <CreateView {...this.props} podcast={podcast} onInvite={this.onInvite}>
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
