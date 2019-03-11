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
  IconButton,
  Avatar
} from "@material-ui/core";
import { Podcast } from "../../../utility/types";
import { LinkContainer } from "react-router-bootstrap";
import NewSessionConfirmDialog from "./NewSessionConfirmDialog";
import TimeAgo from "react-timeago";
import { Share } from "@material-ui/icons";
import ProfileAvatar from "../ProfileAvatar";
import InviteLinkDialog from "./InviteLinkDialog";

interface IPodcastSelectedDialogProps {
  api: DataManager;
  open: boolean;
  podcastUid: string;
  onFinish: () => void;
}

interface IPodcastSelectedDialogState {
  newSessionOpen: boolean;
  inviteLinkOpen: boolean;
  podcast: Podcast | null;
}

export default class PodcastSelectedDialog extends Component<
  IPodcastSelectedDialogProps,
  IPodcastSelectedDialogState
> {
  constructor(props: IPodcastSelectedDialogProps) {
    super(props);

    this.state = {
      newSessionOpen: false,
      inviteLinkOpen: false,
      podcast: null
    };
  }

  componentWillMount() {
    this.loadPodcast();
  }

  /**
   * Reloads the podcast information from the API.
   */
  componentDidUpdate(prevProps: IPodcastSelectedDialogProps) {
    if (this.props.podcastUid !== prevProps.podcastUid) this.loadPodcast();
  }

  /**
   * Loads podcast information from the API.
   */
  loadPodcast = async () => {
    const { podcastUid, api } = this.props;
    this.setState({ newSessionOpen: false });

    var podcast = await api.getPodcastDetail(podcastUid);
    if (podcast) this.setState({ podcast });
  };

  render() {
    const { open, onFinish, api } = this.props;
    const { newSessionOpen, inviteLinkOpen, podcast } = this.state;

    return (
      <React.Fragment>
        <Dialog open={open} onClose={onFinish}>
          {podcast && (
            <React.Fragment>
              <DialogTitle disableTypography={true}>
                <Typography component={"span"}>
                  <div style={{ display: "flex", maxHeight: 250 }}>
                    <div style={{ display: "flex", flexGrow: 1 }}>
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
                    <div>
                      <IconButton
                        onClick={() => this.setState({ inviteLinkOpen: true })}
                      >
                        <Share />
                      </IconButton>
                    </div>
                  </div>
                </Typography>
              </DialogTitle>

              <DialogContent style={{ paddingTop: 5 }}>
                {/* Users */}
                <DialogContentText>Members</DialogContentText>
                <div style={{ display: "flex" }}>
                  {podcast.members.map(m => (
                    <ProfileAvatar key={m.uid} api={api} userUid={m.uid} />
                  ))}
                </div>

                {/* Episodes */}
                <DialogContentText>Latest Session</DialogContentText>
                <List>
                  {podcast.sessions != null && podcast.sessions[0] != null && (
                    <ListItem divider>
                      <ListItemText
                        primary={<TimeAgo date={podcast.sessions[0].date} />}
                        secondary={podcast.sessions[0].uid}
                      />
                    </ListItem>
                  )}
                </List>
              </DialogContent>

              {/* Close button */}
              <DialogActions>
                {podcast.sessions.length > 0 ? (
                  <LinkContainer
                    to={
                      "/record/" + podcast.name + "/" + podcast.sessions[0].uid
                    }
                  >
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
            </React.Fragment>
          )}
        </Dialog>

        {podcast && (
          <div>
            <NewSessionConfirmDialog
              open={newSessionOpen}
              api={api}
              podcastUid={podcast.uid}
              onClose={this.loadPodcast}
            />
            <InviteLinkDialog
              open={inviteLinkOpen}
              api={api}
              podcastUid={podcast.uid}
              onClose={() => this.setState({ inviteLinkOpen: false })}
            />
          </div>
        )}
      </React.Fragment>
    );
  }
}
