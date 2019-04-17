import React, { Component } from "react";
import Clip from "../../../../models/editor/Clip";
import { Grid, Card, CardContent, Avatar, Typography } from "@material-ui/core";
import AudioEntryViewModel from "../audio/AudioEntryViewModel";
import {
  Droppable,
  Draggable,
  DragDropContext,
  DropResult
} from "react-beautiful-dnd";
import { getListStyle } from "../../DragDropStyles";

interface IProps {
  timeline: Clip[];

  onTimelineDragEnd: (result: DropResult) => void;
}

export default class TimelineView extends Component<IProps> {
  render() {
    const { timeline } = this.props;
    console.log(timeline);
    return (
      <Grid item xs={12} style={{ display: "flex" }}>
        {timeline.length > 0 &&
          timeline[0].media.map(entry => (
            <div key={entry.uid} style={{ textAlign: "center" }}>
              <Avatar
                key={entry.userUID}
                style={{
                  margin: 8,
                  height: 48,
                  width: 48,
                  display: "inline-block"
                }}
                src={entry.userImageUrl}
              />
              <Typography>{entry.userName}</Typography>
            </div>
          ))}

        <Droppable droppableId="timeline" direction="horizontal">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {timeline.map((t, index) => (
                <Draggable key={t.uid} draggableId={t.uid} index={index}>
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
                          {t.media.map(entry => (
                            <AudioEntryViewModel
                              key={entry.uid}
                              entry={entry}
                            />
                          ))}
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Grid>
    );
  }
}
