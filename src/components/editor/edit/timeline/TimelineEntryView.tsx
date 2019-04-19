import React, { Component } from "react";
import { Draggable } from "react-beautiful-dnd";
import {
  Card,
  CardContent,
  Toolbar,
  Typography,
  IconButton
} from "@material-ui/core";
import Clip from "../../../../models/editor/Clip";
import { Stop, PlayArrow, Settings } from "@material-ui/icons";
import AudioEntryViewModel from "../audio/AudioEntryViewModel";

interface IProps {
  clip: Clip;
  index: number;
  currentClipPlaying: string | null;

  onClipPlay: (clipUid: string) => void;
  onClipSettings: (clipUid: string) => void;
}

export default class TimelineEntryView extends Component<IProps> {
  render() {
    const {
      clip,
      index,
      currentClipPlaying,
      onClipPlay,
      onClipSettings
    } = this.props;

    return (
      <Draggable draggableId={clip.uid} index={index}>
        {(provided, snapshot) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <Card
              style={{
                marginTop: 4,
                marginBottom: 4,
                marginLeft: 4
              }}
            >
              <CardContent>
                <Toolbar style={{ display: "flex" }}>
                  <Typography variant="h6" style={{ flexGrow: 1 }}>
                    {clip.name}
                  </Typography>
                  <IconButton onClick={() => onClipSettings(clip.uid)}>
                    <Settings />
                  </IconButton>
                  <IconButton onClick={() => onClipPlay(clip.uid)}>
                    {currentClipPlaying == clip.uid ? <Stop /> : <PlayArrow />}
                  </IconButton>
                </Toolbar>

                {clip.media.map(entry => (
                  <AudioEntryViewModel
                    key={entry.uid}
                    entry={entry}
                    clipUid={clip.uid}
                    {...this.props}
                  />
                ))}
              </CardContent>
            </Card>
          </div>
        )}
      </Draggable>
    );
  }
}
