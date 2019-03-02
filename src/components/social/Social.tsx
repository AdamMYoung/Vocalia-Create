import React, { Component } from "react";
import { User } from "../../utility/types";
import DataManager from "../../api/DataManager";

interface ISocialState {
  visibleUser: User | null;
}

interface ISocialProps {
  isMobile: boolean;
  api: DataManager;
}

export default class Social extends Component<ISocialProps, ISocialState> {
  constructor(props: ISocialProps) {
    super(props);

    this.state = {
      visibleUser: null
    };

    this.userSelected(null);
  }

  /**
   * Loads the specified user's details from the API.
   */
  userSelected = async (userId: string | null) => {
    const { api } = this.props;
    let user = userId
      ? await api.getUserInfo(userId)
      : await api.getSignedInUserInfo();

    if (user) this.setState({ visibleUser: user });
  };

  render() {
    const { isMobile } = this.props;
    const { visibleUser } = this.state;

    return <div>{visibleUser && <p>{visibleUser.firstName}</p>}</div>;
  }
}
