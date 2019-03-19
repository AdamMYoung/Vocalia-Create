import React, { Component } from "react";
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
  Dialog
} from "@material-ui/core";
import { Podcast } from "../../../utility/types";
import { Redirect } from "react-router";

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
          <Button color="primary" onClick={onRejectInvite}>
            Close
          </Button>
        </DialogActions>
      </React.Fragment>
    );

    const valid = podcast && (
      <React.Fragment>
        <DialogTitle>Join Podcast</DialogTitle>
        <DialogContent style={{ display: "flex" }}>
          <img style={{ height: 80, width: 80 }} src={podcast.imageUrl} />
          <DialogContentText>
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
          <Button color="primary" onClick={onRejectInvite}>
            Decline
          </Button>
          <Button color="primary" onClick={onAcceptInvite}>
            Accept
          </Button>
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
