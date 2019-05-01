import { Avatar, Grid, Typography } from "@material-ui/core";
import React, { Component } from "react";
import { Droppable } from "react-beautiful-dnd";
import Clip from "../../../../models/editor/Clip";
import { getListStyle } from "../../DragDropStyles";
import AudioEntryViewModel from "../audio/AudioEntryViewModel";
import TimelineEntryView from "./TimelineEntryView";

interface IProps {
  timeline: Clip[];
  currentClipPlaying: string | null;

  onClipPlay: (clipUid: string) => void;
  onClipSettings: (clipUid: string) => void;
}

export default class TimelineView extends Component<IProps> {
  render() {
    const { timeline } = this.props;

    return (
      <Grid
        item
        xs={12}
        style={{
          display: "flex"
        }}
      >
        <div style={{ display: "inline-block", marginTop: 85, marginRight: 8 }}>
          {timeline.length > 0 &&
            timeline[0].media.map(entry => (
              <div
                key={entry.uid}
                style={{ textAlign: "center", display: "flex" }}
              >
                <div style={{ margin: "auto" }}>
                  <Avatar
                    key={entry.userUID}
                    style={{
                      margin: 4,
                      height: 48,
                      width: 48,
                      display: "inline-block"
                    }}
                    src={entry.userImageUrl}
                  />
                  <Typography>{entry.userName}</Typography>
                </div>

                <AudioEntryViewModel
                  entry={entry}
                  width={0}
                  {...this.props}
                  clipUid={""}
                />
              </div>
            ))}
        </div>

        <Droppable droppableId="timeline" direction="horizontal">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {timeline.map((clip, index) => (
                <TimelineEntryView
                  key={clip.uid}
                  {...this.props}
                  clip={clip}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Grid>
    );
  }
}
