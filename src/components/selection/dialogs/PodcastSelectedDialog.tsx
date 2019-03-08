import React, { Component } from "react";
import DataManager from "../../../api/DataManager";
import { Dialog } from "@material-ui/core";

interface IPodcastSelectedDialogProps {
  api: DataManager;
  open: boolean;
}

interface IPodcastSelectedDialogState {}

export default class PodcastSelectedDialog extends Component<
  IPodcastSelectedDialogProps,
  IPodcastSelectedDialogState
> {
  constructor(props: IPodcastSelectedDialogProps) {
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
