import React, { Component } from "react";
import { List, Typography } from "@material-ui/core";
import UserViewModel from "./components/UserViewModel";
import { UserStream } from "../../../../models/UserStream";
import { User } from "../../../../models/User";

interface IProps {
  userStreams: { [id: string]: UserStream };
  userInfo: { [id: string]: User };
}

export default class GroupView extends Component<IProps> {
  render() {
    const { userStreams, userInfo } = this.props;

    const streams = (
      <List>
        {Object.values(userStreams).map(s => (
          <UserViewModel key={s.id} stream={s} user={userInfo[s.tag]} />
        ))}
      </List>
    );

    const noUsers = (
      <Typography>There's nobody else here at the moment...</Typography>
    );

    return (
      <div>{Object.values(userStreams).length > 0 ? streams : noUsers}</div>
    );
  }
}
