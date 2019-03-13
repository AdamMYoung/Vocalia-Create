import React, { Component } from "react";
import { UserStream, User } from "../../../utility/types";
import {
  Avatar,
  Typography,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Divider
} from "@material-ui/core";
import { VolumeMute, VolumeUp } from "@material-ui/icons";
import { Slider } from "@material-ui/lab";

interface IChatUserProps {
  stream: UserStream;
  user: User;
}

interface IChatUserState {
  audio: HTMLAudioElement;
  isMuted: boolean;
}

export default class ChatUser extends Component<
  IChatUserProps,
  IChatUserState
> {
  constructor(props: IChatUserProps) {
    super(props);

    const { stream } = this.props;

    var audio = document.createElement("audio") as HTMLAudioElement;
    audio.srcObject = stream.stream;
    audio.autoplay = true;

    this.state = {
      audio: audio,
      isMuted: false
    };
  }

  onToggleMute = () => {
    const { isMuted, audio } = this.state;
    audio.muted = !isMuted;

    this.setState({ isMuted: !isMuted });
  };

  render() {
    const { user } = this.props;
    const { isMuted } = this.state;

    const VolumeIcon = isMuted ? <VolumeMute /> : <VolumeUp />;

    return (
      <ListItem divider>
        <ListItemAvatar>
          <Avatar src={user.pictureUrl} style={{ margin: "auto 0" }} />
        </ListItemAvatar>
        <ListItemText primary={user.firstName + " " + user.lastName} />
        <ListItemSecondaryAction>
          <IconButton style={{ margin: 6 }} onClick={this.onToggleMute}>
            {VolumeIcon}
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}
