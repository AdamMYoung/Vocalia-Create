import React, { Component } from "react";
import { SessionClip } from "../../../../../models/SessionClip";
import {
  ListItem,
  ListItemText,
  IconButton,
  ListItemSecondaryAction
} from "@material-ui/core";
import TimeAgo from "react-timeago";
import { formatBytes } from "../../../../../utility/TextUtils";
import { Delete, Stop, PlayArrow } from "@material-ui/icons";

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
          primary={<TimeAgo date={clip.time + " UTC"} />}
          secondary={formatBytes(clip.size)}
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
