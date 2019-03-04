import React, { Component } from "react";
import { Paper, Grid, Avatar, Typography } from "@material-ui/core";
import { User } from "../../utility/types";

interface ICurrentUserProps {
  user: User;
}

export default class CurrentUser extends Component<ICurrentUserProps> {
  render() {
    const { user } = this.props;

    return (
      <Paper style={{ margin: 16 }}>
        <Grid container justify="center" alignItems="center">
          <Avatar
            style={{ margin: 10, width: 60, height: 60 }}
            alt={user.firstName + " " + user.lastName}
            src={user.pictureUrl}
          />
          <Typography component="div">
            <p style={{ fontSize: 18 }}>
              {user.firstName + " " + user.lastName}
            </p>
          </Typography>
        </Grid>

        <Grid container justify="center" alignItems="center">
          <Typography component="div">
            {user.followers.length > 0 && (
              <div>
                <p style={{ fontSize: 16 }}>Followers</p>}
                {user.followers.map(f => (
                  <Avatar alt={f.firstName} src={f.pictureUrl} />
                ))}
              </div>
            )}

            {user.following.length > 0 && (
              <div>
                <p style={{ fontSize: 16 }}>Following</p>
                {user.following.map(f => (
                  <Avatar alt={f.firstName} src={f.pictureUrl} />
                ))}
              </div>
            )}
          </Typography>
        </Grid>
      </Paper>
    );
  }
}
