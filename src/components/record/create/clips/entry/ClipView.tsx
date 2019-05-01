import {
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText
} from "@material-ui/core";
import { Delete, PlayArrow, Stop } from "@material-ui/icons";
import React, { Component } from "react";
import TimeAgo from "react-timeago";
import { SessionClip } from "../../../../../models/SessionClip";

interface IProps {
  clip: SessionClip;
  playingUrl: string | null;

  onPlayPause: (url: string) => void;
  onClipDelete: (uid: string) => void;
}

export default class ClipView extends Component<IProps> {
  render() {
    const { clip, playingUrl, onPlayPause, onClipDelete } = this.props;

    const button = clip.mediaUrl == playingUrl ? <Stop /> : <PlayArrow />;

    return (
      <ListItem divider>
        <IconButton onClick={() => onClipDelete(clip.uid)}>
          <Delete />
        </IconButton>
        <ListItemText
          primary={clip.name}
          secondary={<TimeAgo date={clip.time + " UTC"} />}
        />
        <ListItemSecondaryAction>
          <IconButton onClick={() => onPlayPause(clip.mediaUrl)}>
            {button}
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}
