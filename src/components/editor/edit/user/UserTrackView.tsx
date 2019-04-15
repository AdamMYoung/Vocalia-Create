import React, { Component } from "react";
import AudioTrackView from "../audio/AudioTrackView";
import UserTrack from "../../../../models/editor/UserTrack";
import { Button } from "@material-ui/core";

interface IProps {
  track: UserTrack;
}

export default class UserTrackView extends Component<IProps> {
  render() {
    const { track } = this.props;
    return (
      <div>
        <Button>{track.userName}</Button>
        <AudioTrackView entries={track.entries} />
      </div>
    );
  }
}
