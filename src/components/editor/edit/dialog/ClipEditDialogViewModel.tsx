import React, { Component } from "react";
import ClipEditDialogView from "./ClipEditDialogView";
import DataManager from "../../../../data/api/DataManager";
import Clip from "../../../../models/editor/Clip";

interface IProps {
  api: DataManager;
  clip: Clip;

  onCloseSettings: () => void;
}

export default class ClipEditDialogViewModel extends Component<IProps> {
  render() {
    return <ClipEditDialogView {...this.props} />;
  }
}
