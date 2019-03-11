import React, { Component } from "react";
import { Avatar, Fade } from "@material-ui/core";
import { User } from "../../utility/types";
import DataManager from "../../api/DataManager";

interface IProfileAvatarProps {
  userUid: string;
  api: DataManager;
}

interface IProfileAvatarState {
  user: User | null;
  loaded: boolean;
}

export default class ProfileAvatar extends Component<
  IProfileAvatarProps,
  IProfileAvatarState
> {
  constructor(props: IProfileAvatarProps) {
    super(props);

    this.state = {
      user: null,
      loaded: false
    };

    this.loadUser();
  }

  /**
   * Loads the user from the userUid passed in.
   */
  loadUser = async () => {
    const { api, userUid } = this.props;
    var user = await api.getUserOverviewInfo(userUid);

    this.setState({ user });
  };

  render() {
    const { user, loaded } = this.state;

    return (
      <Fade in={loaded}>
        <Avatar
          src={user ? user.pictureUrl : ""}
          style={{ marginBottom: 12, marginRight: 4 }}
          onLoad={() => this.setState({ loaded: true })}
        />
      </Fade>
    );
  }
}
