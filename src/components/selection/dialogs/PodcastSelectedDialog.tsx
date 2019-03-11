import React, { Component } from "react";
import DataManager from "../../../api/DataManager";
import {
  Dialog,
  DialogTitle,
  Typography,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  DialogContentText,
  Divider
} from "@material-ui/core";
import { Podcast } from "../../../utility/types";
import { LinkContainer } from "react-router-bootstrap";
import NewSessionConfirmDialog from "./NewSessionConfirmDialog";

interface IPodcastSelectedDialogProps {
  api: DataManager;
  open: boolean;
  podcast: Podcast;
  onFinish: () => void;
}

interface IPodcastSelectedDialogState {
  newSessionOpen: boolean;
}

export default class PodcastSelectedDialog extends Component<
  IPodcastSelectedDialogProps,
  IPodcastSelectedDialogState
> {
  constructor(props: IPodcastSelectedDialogProps) {
    super(props);

    this.state = {
      newSessionOpen: false
    };
  }

  render() {
    const { open, onFinish, podcast, api } = this.props;
    const { newSessionOpen } = this.state;

    return (
      <React.Fragment>
        <Dialog open={open} onClose={onFinish}>
          <DialogTitle disableTypography={true}>
            <Typography component={"span"}>
              <div style={{ display: "flex", maxHeight: 250 }}>
                <div style={{ height: 80, width: 80, paddingTop: 16 }}>
                  <img
                    style={{ height: 80, width: 80 }}
                    src={podcast.imageUrl}
                  />
                </div>

                <div
                  style={{
                    display: "inline",
                    paddingLeft: 15,
                    maxHeight: 250
                  }}
                >
                  <h2>{podcast.name}</h2>
                  <p style={{ overflow: "auto", maxHeight: 200 }}>
                    {podcast.description}
                  </p>
                </div>
              </div>
            </Typography>
          </DialogTitle>

          <DialogContent style={{ paddingTop: 5 }}>
            {/* Episodes */}
            <DialogContentText>Sessions</DialogContentText>
            <List>
              {podcast.sessions != null &&
                podcast.sessions.map(item => (
                  <ListItem key={item.uid} divider>
                    <ListItemText primary={item.date} />
                  </ListItem>
                ))}
            </List>
          </DialogContent>

          {/* Close button */}
          <DialogActions>
            {podcast.sessions.length > 0 ? (
              <LinkContainer to={"/record/" + podcast.sessions[0].uid}>
                <Button onClick={this.props.onFinish} color="primary">
                  Join
                </Button>
              </LinkContainer>
            ) : (
              <Button
                onClick={this.props.onFinish}
                color="primary"
                disabled={true}
              >
                Join
              </Button>
            )}
            <Button
              onClick={() => this.setState({ newSessionOpen: true })}
              color="primary"
            >
              New Session
            </Button>
            <Button onClick={this.props.onFinish} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
        <NewSessionConfirmDialog
          open={newSessionOpen}
          api={api}
          podcastUid={podcast.uid}
          onClose={() => this.setState({ newSessionOpen: false })}
        />
      </React.Fragment>
    );
  }
}
