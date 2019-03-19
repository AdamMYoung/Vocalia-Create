import React, { Component } from "react";
import { UserStream, User } from "../../../utility/types";
import { List } from "@material-ui/core";
import UserViewModel from "./components/UserViewModel";

interface IProps {
  userStreams: { [id: string]: UserStream };
  userInfo: { [id: string]: User };
}

export default class GroupView extends Component<IProps> {
  render() {
    const { userStreams, userInfo } = this.props;

    return (
      <div style={{ padding: 12 }}>
        <List>
          {Object.values(userStreams).map(s => (
            <UserViewModel key={s.id} stream={s} user={userInfo[s.tag]} />
          ))}
        </List>
      </div>
    );
  }
}
