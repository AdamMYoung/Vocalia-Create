import React, { Component } from "react";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from "@material-ui/core";
import { VolumeMute, VolumeUp } from "@material-ui/icons";
import { User } from "../../../../../models/User";

interface IProps {
  user: User;
  isMuted: boolean;
  onToggleMute: () => void;
}

export default class UserView extends Component<IProps> {
  render() {
    const { user, isMuted, onToggleMute } = this.props;

    const volume = isMuted ? <VolumeMute /> : <VolumeUp />;

    return (
      <ListItem divider>
        <ListItemAvatar>
          <Avatar src={user.pictureUrl} style={{ margin: "auto 0" }} />
        </ListItemAvatar>
        <ListItemText primary={user.firstName + " " + user.lastName} />
        <ListItemSecondaryAction>
          <IconButton style={{ margin: 6 }} onClick={onToggleMute}>
            {volume}
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}
