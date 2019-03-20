import React, { Component } from "react";
import DataManager from "../../../data/api/DataManager";
import { Podcast } from "../../../utility/types";
import NewInviteDialogView from "./NewInviteDialogView";

interface IProps {
  api: DataManager;
  podcast: Podcast;
  onClose: () => void;
}

interface IState {
  expiry: Date;
  hasExpiry: boolean;
  isLoadingInvite: boolean;
  inviteCode: string;
}

export default class NewInviteDialogViewModel extends Component<
  IProps,
  IState
> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      expiry: new Date(new Date().getTime() + 120 * 60000),
      hasExpiry: true,
      isLoadingInvite: false,
      inviteCode: ""
    };
  }

  /**
   * Called when the expiry date has been toggled.
   */
  private onExpiryToggle = () => {
    const { hasExpiry } = this.state;
    this.setState({ hasExpiry: !hasExpiry });
  };

  /**
   * Called when the expiry value changes.
   */
  private onExpiryChanged = (expiry: Date) => {
    this.setState({ expiry });
  };

  /**
   * Called when a new invite should be created.
   */
  private onCreateInvite = async () => {
    const { api, podcast } = this.props;
    const { expiry, hasExpiry } = this.state;

    this.setState({ isLoadingInvite: true });

    var currentExpiry = hasExpiry ? expiry : null;
    var inviteCode = await api.createInviteLink(podcast.uid, currentExpiry);

    if (inviteCode) this.setState({ inviteCode, isLoadingInvite: false });
  };

  render() {
    return (
      <NewInviteDialogView
        {...this.props}
        {...this.state}
        onExpiryToggle={this.onExpiryToggle}
        onExpiryChanged={this.onExpiryChanged}
        onCreateInvite={this.onCreateInvite}
      />
    );
  }
}
