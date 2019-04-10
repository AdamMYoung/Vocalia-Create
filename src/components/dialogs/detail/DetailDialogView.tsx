import React, { Component } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  DialogActions,
  Button,
  Typography
} from "@material-ui/core";
import PodcastInfoView from "./elements/PodcastInfoView";
import UsersView from "./elements/UsersView";
import TimeAgo from "react-timeago";
import { LinkContainer } from "react-router-bootstrap";
import { Podcast } from "../../../models/Podcast";
import { User } from "../../../models/User";

interface IProps {
  podcast: Podcast;
  users: User[];
  isMobile: boolean;
  sessionUrl: string;
  onClose: () => void;
  onNewSession: () => void;
  onInvite: () => void;
}

export default class DetailDialogView extends Component<IProps> {
  render() {
    const { podcast, onClose, sessionUrl, onNewSession, isMobile } = this.props;
    const hasSession = podcast.sessions.length > 0;

    return (
      <React.Fragment>
        <Dialog open onClose={onClose} fullScreen={isMobile}>
          <DialogTitle disableTypography>
            <PodcastInfoView {...this.props} />
          </DialogTitle>
          <DialogContent style={{ paddingTop: 5 }}>
            <UsersView {...this.props} />
            <Typography variant="h6" style={{ minWidth: 300 }}>
              Current Session
            </Typography>
            <List style={{ minHeight: 60 }}>
              {hasSession && (
                <ListItem>
                  <ListItemText
                    primary={
                      <TimeAgo date={podcast.sessions[0].date + " UTC"} />
                    }
                    secondary={podcast.sessions[0].uid}
                  />
                </ListItem>
              )}
            </List>
          </DialogContent>
          <DialogActions>
            <LinkContainer to={sessionUrl}>
              <Button color="primary" disabled={!hasSession}>
                Join
              </Button>
            </LinkContainer>
            <Button color="primary" onClick={onNewSession}>
              New Session
            </Button>
            <Button color="primary" onClick={onClose}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
        {this.props.children}
      </React.Fragment>
    );
  }
}
