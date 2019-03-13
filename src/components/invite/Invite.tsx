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

interface IInviteProps {
  inviteUid: string;
  api: DataManager;
}

interface IInviteState {
  podcast: Podcast | null;
  isValid: boolean;
  shouldRedirect: boolean;
}

export default class Invite extends Component<IInviteProps, IInviteState> {
  constructor(props: IInviteProps) {
    super(props);

    this.state = {
      podcast: null,
      isValid: true,
      shouldRedirect: false
    };
  }

  /**
   * Loads the podcast belonging to the specifed InviteUID.
   */
  async componentWillMount() {
    const { inviteUid, api } = this.props;

    var podcast = await api.getInvitePodcastInfo(inviteUid);
    if (podcast) this.setState({ podcast });
    else this.setState({ isValid: false });
  }

  /**
   * Accepts the invite to the podcast.
   */
  acceptInvite = async () => {
    const { api, inviteUid } = this.props;

    await api.acceptInviteLink(inviteUid);
    this.setState({ shouldRedirect: true });
  };

  redirect = () => {
    this.setState({ shouldRedirect: true });
  };

  render() {
    const { podcast, isValid, shouldRedirect } = this.state;

    const InvalidLink = (
      <React.Fragment>
        <DialogTitle>Invalid Link</DialogTitle>
        <DialogContent>
          <DialogContentText>
            The link provided may have expired or is invalid.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={this.redirect}>
            Close
          </Button>
        </DialogActions>
      </React.Fragment>
    );

    return (
      <Dialog open={true}>
        {podcast && isValid && (
          <React.Fragment>
            <DialogTitle>Join Podcast</DialogTitle>
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
              <Button color="primary" onClick={this.redirect}>
                Decline
              </Button>
              <Button
                color="primary"
                onClick={() => {
                  this.acceptInvite();
                }}
              >
                Accept
              </Button>
            </DialogActions>
          </React.Fragment>
        )}
        {shouldRedirect && <Redirect to="/" />}

        {!isValid && InvalidLink}
      </Dialog>
    );
  }
}
