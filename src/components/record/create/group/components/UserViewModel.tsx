import React, { Component } from "react";
import { UserStream } from "../../../../../models/ingest/UserStream";
import { User } from "../../../../../models/User";
import UserView from "./UserView";

interface IProps {
  stream: UserStream;
  user: User;
}

interface IState {
  audio: HTMLAudioElement;
  isMuted: boolean;
}

export default class UserViewModel extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    var audio = document.createElement("audio") as HTMLAudioElement;
    audio.srcObject = props.stream.stream;
    audio.autoplay = true;

    this.state = {
      audio: audio,
      isMuted: false
    };
  }

  /**
   * Called when the user has toggled mute of the specified audio source.
   */
  onToggleMute = () => {
    const { isMuted, audio } = this.state;
    audio.muted = !isMuted;

    this.setState({ isMuted: !isMuted });
  };

  render() {
    return (
      <UserView
        {...this.props}
        {...this.state}
        onToggleMute={this.onToggleMute}
      />
    );
  }
}
