import React, { Component } from "react";
import { UserStream, User } from "../../../utility/types";
import { Avatar, Typography, IconButton } from "@material-ui/core";
import { VolumeMute, VolumeUp } from "@material-ui/icons";

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
    const { isMuted, audio } = this.state;

    const VolumeIcon = isMuted ? <VolumeMute /> : <VolumeUp />;

    return (
      <div style={{ width: "100%", display: "flex", margin: 6 }}>
        <Avatar src={user.pictureUrl} style={{ margin: "auto 0" }} />
        <Typography
          variant="h6"
          color="inherit"
          style={{ margin: "auto 0", paddingLeft: 8 }}
        >
          {user.firstName + " " + user.lastName}
          <IconButton style={{ margin: 6 }} onClick={this.onToggleMute}>
            {VolumeIcon}
          </IconButton>
        </Typography>
      </div>
    );
  }
}
