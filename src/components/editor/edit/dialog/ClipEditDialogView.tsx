import React, { Component } from "react";
import { Dialog, DialogTitle } from "@material-ui/core";
import Clip from "../../../../models/editor/Clip";

interface IProps {
  clip: Clip;

  onCloseSettings: () => void;
}

export default class ClipEditDialogView extends Component<IProps> {
  render() {
    const { clip, onCloseSettings } = this.props;

    return (
      <Dialog open onClose={onCloseSettings}>
        <DialogTitle>{clip.name}</DialogTitle>
      </Dialog>
    );
  }
}
