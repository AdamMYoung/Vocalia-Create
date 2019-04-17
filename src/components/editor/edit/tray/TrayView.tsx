import React, { Component } from "react";
import { Card, Drawer, Typography, CardContent } from "@material-ui/core";
import Clip from "../../../../models/editor/Clip";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { getTrayStyle } from "../../DragDropStyles";
import TimeAgo from "react-timeago";

interface IProps {
  clips: Clip[];
}

export default class TrayView extends Component<IProps> {
  render() {
    const { clips } = this.props;

    return (
      <Card style={{ margin: 4 }}>
        <Typography variant="h6" style={{ textAlign: "center" }}>
          Clips
        </Typography>

        <Droppable droppableId="tray" direction="horizontal">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={getTrayStyle(snapshot.isDraggingOver)}
            >
              {clips.map((clip, index) => (
                <Draggable key={clip.uid} draggableId={clip.uid} index={index}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <Card style={{ margin: 4, width: 150 }}>
                        <CardContent>
                          <Typography variant="h6">{clip.name}</Typography>
                          <Typography>
                            <TimeAgo date={clip.date + " UTC"} />
                          </Typography>
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
      </Card>
    );
  }
}
