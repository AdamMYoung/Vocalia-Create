import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography
} from "@material-ui/core";
import React, { Component } from "react";
import { Redirect } from "react-router";
import { Podcast } from "../../models/Podcast";

interface IProps {
  podcast: Podcast | null;
  isValid: boolean;
  shouldRedirect: boolean;
  onAcceptInvite: () => void;
  onRejectInvite: () => void;
}

export default class InviteView extends Component<IProps> {
  render() {
    const {
      podcast,
      isValid,
      shouldRedirect,
      onAcceptInvite,
      onRejectInvite
    } = this.props;

    const invalid = (
      <React.Fragment>
        <DialogTitle>Invalid Link</DialogTitle>
        <DialogContent>
          <DialogContentText>
            The link provided may have expired or is invalid.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onRejectInvite}>Close</Button>
        </DialogActions>
      </React.Fragment>
    );

    const valid = podcast && (
      <React.Fragment>
        <DialogTitle>Join Podcast</DialogTitle>
        <DialogContent style={{ display: "flex" }}>
          <img style={{ height: 80, width: 80 }} src={podcast.imageUrl} />
          <DialogContentText component="span">
            <div
              style={{
                paddingLeft: 15,
                height: 250,
                minWidth: 200
              }}
            >
              <Typography variant="h6">{podcast.name}</Typography>
              <Typography>{podcast.description}</Typography>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onRejectInvite}>Decline</Button>
          <Button onClick={onAcceptInvite}>Accept</Button>
        </DialogActions>
      </React.Fragment>
    );

    return (
      <Dialog open>
        {podcast && isValid ? valid : invalid}
        {shouldRedirect && <Redirect to="/" />}
      </Dialog>
    );
  }
}
