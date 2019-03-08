import React, { Component } from "react";
import DataManager from "../../../api/DataManager";
import { Dialog } from "@material-ui/core";

interface INewSessionConfirmDialogProps {
  api: DataManager;
  open: boolean;
}

interface INewSessionConfirmDialogState {}

export default class NewSessionConfirmDialog extends Component<
  INewSessionConfirmDialogProps,
  INewSessionConfirmDialogState
> {
  constructor(props: INewSessionConfirmDialogProps) {
    super(props);

    this.state = {};
  }

  render() {
    const { open } = this.props;

    return (
      <Dialog open={open}>
        <p />
      </Dialog>
    );
  }
}
