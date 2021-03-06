import React, { Component } from "react";
import DataManager from "../../../data/api/DataManager";
import { Podcast } from "../../../models/Podcast";
import { User } from "../../../models/User";
import ConfirmationDialogView from "../confirmation/ConfirmationDialogView";
import NewInviteDialogViewModel from "../newInvite/NewInviteDialogViewModel";
import DetailDialogView from "./DetailDialogView";

interface IProps {
  api: DataManager;
  podcast: Podcast;
  isMobile: boolean;
  onClose: () => void;
}

interface IState {
  podcast: Podcast;
  users: User[];
  isInviteDialogOpen: boolean;
  isNewSessionDialogOpen: boolean;
  sessionUrl: string;
}

export default class DetailDialogViewModel extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      podcast: props.podcast,
      users: [],
      isInviteDialogOpen: false,
      isNewSessionDialogOpen: false,
      sessionUrl: ""
    };
  }

  /**
   * Loads podcast info on initial mount.
   */
  componentWillMount() {
    this.loadPodcast();
  }

  /**
   * Loads detailed data for the current podcast.
   */
  private loadPodcast = async () => {
    const { api } = this.props;
    var podcast = await api.getPodcastDetail(this.props.podcast.uid);
    if (podcast) {
      this.setState({ podcast });
      this.loadUsers();
      if (podcast.sessions[0])
        this.setState({
          sessionUrl: "/record/" + podcast.uid + "/" + podcast.sessions[0].uid
        });
    }
  };

  /**
   * Loads user data for the specified podcast.
   */
  private loadUsers = () => {
    const { api } = this.props;
    const { podcast } = this.state;

    var users: User[] = [];
    podcast.members.forEach(async member => {
      var user = await api.getUserDetailInfo(member.uid);
      if (user) users.push(user);
      this.setState({ users });
    });
  };

  /**
   * Called when the invite dialog should be opened.
   */
  private onInvite = () => {
    this.setState({ isInviteDialogOpen: true });
  };

  /**
   * Called when the invite dialog should be closed.
   */
  private onCloseInvite = () => {
    this.setState({ isInviteDialogOpen: false });
  };

  /**
   * Called when the new session dialog should be opened.
   */
  private onNewSession = () => {
    this.setState({ isNewSessionDialogOpen: true });
  };

  /**
   * Creates a new session for the selected podcast.
   */
  private onCreateSession = async () => {
    const { api, podcast } = this.props;
    await api
      .createSession(podcast.uid)
      .then(() => this.loadPodcast())
      .then(() => this.setState({ isNewSessionDialogOpen: false }));
  };

  render() {
    const { podcast, isInviteDialogOpen, isNewSessionDialogOpen } = this.state;
    const { api } = this.props;
    return (
      <DetailDialogView
        podcast={podcast}
        {...this.props}
        {...this.state}
        onInvite={this.onInvite}
        onNewSession={this.onNewSession}
      >
        {isInviteDialogOpen && (
          <NewInviteDialogViewModel
            onClose={this.onCloseInvite}
            api={api}
            podcast={podcast}
          />
        )}
        {isNewSessionDialogOpen && (
          <ConfirmationDialogView
            title="Create Session"
            subtitle="Are you sure you want to create a new session?"
            onConfirm={this.onCreateSession}
            onDeny={() => this.setState({ isNewSessionDialogOpen: false })}
          />
        )}
      </DetailDialogView>
    );
  }
}
