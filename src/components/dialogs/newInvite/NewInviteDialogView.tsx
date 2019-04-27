import React, { Component } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  FormControlLabel,
  Switch,
  TextField,
  DialogActions,
  Button
} from "@material-ui/core";
import { DateTimePicker } from "material-ui-pickers";

interface IProps {
  expiry: Date;
  hasExpiry: boolean;
  isLoadingInvite: boolean;
  inviteCode: string;
  onClose: () => void;
  onExpiryChanged: (date: Date) => void;
  onExpiryToggle: () => void;
  onCreateInvite: () => void;
}

export default class NewInviteDialogView extends Component<IProps> {
  render() {
    const {
      expiry,
      hasExpiry,
      isLoadingInvite,
      inviteCode,
      onClose,
      onExpiryToggle,
      onExpiryChanged,
      onCreateInvite
    } = this.props;

    const controls = (
      <form
        autoComplete="off"
        style={{ display: "flex", alignItems: "center" }}
      >
        <FormControlLabel
          control={<Switch checked={hasExpiry} onChange={onExpiryToggle} />}
          label="Can Expire"
        />
        <DateTimePicker
          value={expiry}
          disablePast
          ampm={false}
          disabled={!hasExpiry}
          onChange={onExpiryChanged}
          label="Expiry"
          variant="outlined"
          margin="dense"
          showTodayButton
        />

        {inviteCode.length > 0 && (
          <TextField
            label="Invite Link"
            style={{ margin: 8 }}
            fullWidth
            margin="normal"
            variant="outlined"
            value={process.env.REACT_APP_INVITE_LINK + inviteCode}
          />
        )}
      </form>
    );

    return (
      <Dialog open onClose={onClose}>
        <DialogTitle>New Invite</DialogTitle>
        <DialogContent>{controls}</DialogContent>
        <DialogActions>
          <Button color="primary" onClick={onClose}>
            {inviteCode.length > 0 ? "Close" : "Cancel"}
          </Button>
          <Button
            color="primary"
            onClick={onCreateInvite}
            disabled={isLoadingInvite || inviteCode.length > 0}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
