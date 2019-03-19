import React, { Component } from "react";
import DataManager from "../../../data/api/DataManager";
import { Podcast } from "../../../utility/types";
import InviteView from "./InviteView";

interface IProps {
  api: DataManager;
  inviteUid: string;
}

interface IState {
  podcast: Podcast | null;
  isValid: boolean;
  shouldRedirect: boolean;
}

export default class InviteViewModel extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      podcast: null,
      isValid: true,
      shouldRedirect: false
    };
  }

  /**
   * Attempts to load the podcast from the database.
   */
  async componentWillMount() {
    const { inviteUid, api } = this.props;

    var podcast = await api.getInvitePodcastInfo(inviteUid);
    if (podcast) this.setState({ podcast });
    else this.setState({ isValid: false });
  }

  /**
   * Called when the invite is accepted.
   */
  private onAcceptInvite = async () => {
    const { api, inviteUid } = this.props;

    await api.acceptInviteLink(inviteUid).then(this.onCloseWindow);
  };

  /**
   * Called when the invite is rejected.
   */
  private onCloseWindow = () => {
    this.setState({ shouldRedirect: true });
  };

  render() {
    return (
      <InviteView
        {...this.state}
        {...this.props}
        onAcceptInvite={this.onAcceptInvite}
        onRejectInvite={this.onCloseWindow}
      />
    );
  }
}
