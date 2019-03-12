import React, { Component } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Switch,
  FormControlLabel,
  DialogActions,
  Button
} from "@material-ui/core";
import { DateTimePicker } from "material-ui-pickers";
import DataManager from "../../../api/DataManager";

interface IInviteLinkDialogProps {
  podcastUid: string;
  open: boolean;
  api: DataManager;
  onClose: () => void;
}

interface IInviteLinkDialogState {
  expiry: Date;
  hasExpiry: boolean;
  inviteCode: string;
  hasInvite: boolean;
}

export default class InviteLinkDialog extends Component<
  IInviteLinkDialogProps,
  IInviteLinkDialogState
> {
  constructor(props: IInviteLinkDialogProps) {
    super(props);

    this.state = {
      expiry: new Date(new Date().getTime() + 120 * 60000),
      hasExpiry: true,
      inviteCode: "",
      hasInvite: false
    };
  }

  /**
   * Generates an invite code.
   */
  generateInvite = async () => {
    const { api, podcastUid } = this.props;
    const { expiry, hasExpiry } = this.state;
    this.setState({ hasInvite: true });

    var invite = await api.createInviteLink(
      podcastUid,
      hasExpiry ? expiry : null
    );

    if (invite) this.setState({ inviteCode: invite });
    else this.setState({ hasInvite: false });
  };

  render() {
    const { open, onClose } = this.props;
    const { expiry, hasExpiry, hasInvite, inviteCode } = this.state;

    return (
      <Dialog open={open}>
        <DialogTitle>New Invite</DialogTitle>
        <DialogContent>
          <form autoComplete="off">
            <FormControlLabel
              control={
                <Switch
                  checked={hasExpiry}
                  onChange={e => this.setState({ hasExpiry: e.target.checked })}
                />
              }
              label="Can Expire"
            />
            <DateTimePicker
              value={expiry}
              disablePast
              ampm={false}
              disabled={!hasExpiry}
              onChange={e => this.setState({ expiry: e })}
              label="Expiry"
              showTodayButton
            />

            {hasInvite && (
              <TextField
                label="Invite Link"
                style={{ margin: 8 }}
                fullWidth
                margin="normal"
                value={process.env.REACT_APP_INVITE_LINK + inviteCode}
              />
            )}
          </form>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={onClose}>
            {hasInvite ? "Close" : "Cancel"}
          </Button>
          <Button
            color="primary"
            onClick={this.generateInvite}
            disabled={hasInvite}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
