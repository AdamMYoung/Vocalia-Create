import React, { Component } from "react";
import { List, Typography } from "@material-ui/core";
import { SessionClip } from "../../../../models/SessionClip";
import ClipView from "./entry/ClipView";

interface IProps {
  clips: SessionClip[];
  playingUrl: string | null;

  onPlayPause: (url: string) => void;
  onClipDelete: (uid: string) => void;
}

export default class ClipListView extends Component<IProps> {
  render() {
    const { clips } = this.props;

    const list = (
      <List>
        {clips.map(c => (
          <ClipView key={c.uid} clip={c} {...this.props} />
        ))}
      </List>
    );

    const noClips = <Typography>You've not created any clips yet.</Typography>;

    return clips.length > 0 ? list : noClips;
  }
}
