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
import { Podcast } from "../../../../models/Podcast";
import SessionView from "./SessionView";
import PodcastInfoView from "../../../dialogs/detail/elements/PodcastInfoView";

interface IProps {
  podcast: Podcast;
  isMobile: boolean;
  sessionUrl: string;
  onClose: () => void;
  onDeleteSession: (sessionUid: string) => void;
}

export default class EditorDetailDialogView extends Component<IProps> {
  render() {
    const { onClose, isMobile, podcast } = this.props;

    return (
      <React.Fragment>
        <Dialog open onClose={onClose} fullScreen={isMobile}>
          <DialogTitle disableTypography>
            <PodcastInfoView {...this.props} />
          </DialogTitle>
          <DialogContent style={{ paddingTop: 5 }}>
            <Typography variant="h6" style={{ minWidth: 300 }}>
              Recordings
            </Typography>
            <List>
              {podcast.sessions.map(p => (
                <SessionView key={p.uid} session={p} {...this.props} />
              ))}
            </List>
          </DialogContent>
          <DialogActions>
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
