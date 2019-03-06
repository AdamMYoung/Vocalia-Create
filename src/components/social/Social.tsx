import React, { Component } from "react";
import { User } from "../../utility/types";
import DataManager from "../../api/DataManager";
import { Grid, Paper, Avatar, Typography } from "@material-ui/core";
import CurrentUser from "./CurrentUser";
import Feed from "./Feed";

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
    const { visibleUser } = this.state;

    if (api.accessToken) {
      let user = userId
        ? await api.getUserDetailInfo(userId)
        : await api.getSignedInUserInfo();

      if (user) this.setState({ visibleUser: user });
    }
  };

  render() {
    const { visibleUser } = this.state;

    return (
      <div>
        {visibleUser && (
          <Grid container>
            {/* User Info */}
            <Grid item sm={3} xs={12}>
              <CurrentUser user={visibleUser} />
            </Grid>
            {/* Feed */}
            <Grid item sm={6} xs={12}>
              <Feed
                feed={visibleUser.listens}
                userSelected={this.userSelected}
              />
            </Grid>
            {/* Spacing for symmetry */}
            <Grid item sm={3} xs={12} />
          </Grid>
        )}
      </div>
    );
  }
}
