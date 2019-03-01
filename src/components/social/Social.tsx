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
  }

  componentDidMount = () => {
    this.userSelected(null);
  };

  userSelected = async (userId: string | null) => {
    const { api } = this.props;
    var user = userId
      ? await api.getUserInfo(userId)
      : await api.getSignedInUserInfo();

    console.log(user);
    if (user) this.setState({ visibleUser: user });
  };

  render() {
    const { isMobile } = this.props;
    const { visibleUser } = this.state;

    return <div>{visibleUser && <p>{visibleUser.firstName}</p>}</div>;
  }
}
