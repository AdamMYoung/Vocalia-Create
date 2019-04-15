import React, { Component } from "react";
import UserTrackView from "./UserTrackView";
import UserTrack from "../../../../models/editor/UserTrack";

interface IProps {
  track: UserTrack;
}

export default class UserTrackViewModel extends Component<IProps> {
  render() {
    const { track } = this.props;

    return <UserTrackView track={track} />;
  }
}
