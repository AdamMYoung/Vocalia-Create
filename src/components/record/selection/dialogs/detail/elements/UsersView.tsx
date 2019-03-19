import React, { Component } from "react";
import { User } from "../../../../../../utility/types";
import { Avatar, Typography, Fade } from "@material-ui/core";

interface IProps {
  users: User[];
}

export default class UsersView extends Component<IProps> {
  render() {
    const { users } = this.props;

    return (
      <Fade in={users.length > 0}>
        <div>
          <Typography variant="h6">Members</Typography>
          <div style={{ display: "flex", minHeight: 60 }}>
            {users.map(user => (
              <Avatar
                key={user.userUID}
                style={{ marginBottom: 12, marginRight: 4 }}
                src={user.pictureUrl}
              />
            ))}
          </div>
        </div>
      </Fade>
    );
  }
}
