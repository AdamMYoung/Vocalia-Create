import React, { Component } from "react";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  IconButton
} from "@material-ui/core";
import TimeAgo from "react-timeago";
import { Session } from "../../../../models/Session";
import { Delete, OpenInBrowser } from "@material-ui/icons";
import { LinkContainer } from "react-router-bootstrap";
import { Podcast } from "../../../../models/Podcast";

interface IProps {
  session: Session;
  podcast: Podcast;
  onDeleteSession: (sessionUid: string) => void;
}

export default class SessionView extends Component<IProps> {
  render() {
    const { session, podcast, onDeleteSession } = this.props;
    return (
      <ListItem>
        <LinkContainer to={"/editor/" + podcast.uid + "/" + session.uid}>
          <IconButton>
            <OpenInBrowser />
          </IconButton>
        </LinkContainer>
        <ListItemText
          primary={<TimeAgo date={session.date + " UTC"} />}
          secondary={session.uid}
        />
        <ListItemSecondaryAction>
          <IconButton onClick={() => onDeleteSession(session.uid)}>
            <Delete />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}
