import {
  Button,
  Card,
  CardContent,
  Divider,
  Typography
} from "@material-ui/core";
import React, { Component } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import TimeAgo from "react-timeago";
import Clip from "../../../../models/editor/Clip";
import { Podcast } from "../../../../models/Podcast";
import PodcastInfoView from "../../../dialogs/detail/elements/PodcastInfoView";
import { getTrayStyle } from "../../DragDropStyles";

interface IProps {
  clips: Clip[];
  podcast: Podcast;

  onFinishEditing: () => void;
}

export default class TrayView extends Component<IProps> {
  render() {
    const { clips, podcast, onFinishEditing } = this.props;

    return (
      <Card style={{ margin: 4 }}>
        <CardContent>
          <PodcastInfoView podcast={podcast} />

          <Droppable droppableId="tray" direction="horizontal">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={getTrayStyle(snapshot.isDraggingOver)}
              >
                {clips.map((clip, index) => (
                  <Draggable
                    key={clip.uid}
                    draggableId={clip.uid}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <Card style={{ margin: 4, width: 150 }}>
                          <CardContent>
                            <Typography
                              variant="h6"
                              style={{
                                maxLines: 1,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis"
                              }}
                            >
                              {clip.name}
                            </Typography>
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
          <Divider />
          <div style={{ padding: 8 }}>
            <Button fullWidth onClick={onFinishEditing}>
              Finish Editing
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
}
