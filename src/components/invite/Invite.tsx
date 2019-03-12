import React, { Component } from "react";
import DataManager from "../../api/DataManager";
import { Podcast } from "../../utility/types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Typography,
  Button,
  DialogActions
} from "@material-ui/core";
import { Redirect } from "react-router";
import { LinkContainer } from "react-router-bootstrap";

interface IInviteProps {
  inviteUid: string;
  api: DataManager;
}

interface IInviteState {
  podcast: Podcast | null;
}

export default class Invite extends Component<IInviteProps, IInviteState> {
  constructor(props: IInviteProps) {
    super(props);

    this.state = {
      podcast: null
    };
  }

  /**
   * Loads the podcast belonging to the specifed InviteUID.
   */
  async componentWillMount() {
    const { inviteUid, api } = this.props;

    var podcast = await api.getInvitePodcastInfo(inviteUid);
    if (podcast) this.setState({ podcast });
  }

  /**
   * Accepts the invite to the podcast.
   */
  acceptInvite = async () => {
    const { api, inviteUid } = this.props;

    await api.acceptInviteLink(inviteUid);
  };

  render() {
    const { podcast } = this.state;

    return (
      <Dialog open={true}>
        {podcast && (
          <React.Fragment>
            <DialogTitle>{"Join Podcast"}</DialogTitle>
            <DialogContent style={{ display: "flex" }}>
              <img style={{ height: 80, width: 80 }} src={podcast.imageUrl} />
              <DialogContentText>
                <div
                  style={{
                    paddingLeft: 15,
                    maxHeight: 250,
                    minWidth: 200
                  }}
                >
                  <Typography variant="h6">{podcast.name}</Typography>
                  <Typography>{podcast.description}</Typography>
                </div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <LinkContainer to="/">
                <Button color="primary">Decline</Button>
              </LinkContainer>
              <LinkContainer to="/">
                <Button
                  color="primary"
                  onClick={() => {
                    this.acceptInvite();
                  }}
                >
                  Accept
                </Button>
              </LinkContainer>
            </DialogActions>
          </React.Fragment>
        )}
      </Dialog>
    );
  }
}
