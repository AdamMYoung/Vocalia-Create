import React, { Component } from "react";
import ClipEditDialogView from "./ClipEditDialogView";
import DataManager from "../../../../data/api/DataManager";
import Clip from "../../../../models/editor/Clip";
import ClipEdit from "../../../../models/editor/ClipEdit";

interface IProps {
  api: DataManager;
  clip: Clip;

  onClose: (reload: boolean) => void;
}

interface IState {
  startTrim: number;
  endTrim: number;
  gain: number;
}

export default class ClipEditDialogViewModel extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    var edit = props.clip.edit;

    this.state = {
      startTrim: edit ? edit.startTrim : 0,
      endTrim: edit ? edit.endTrim : 0,
      gain: edit ? edit.gain : 0
    };
  }

  /**
   * Called when the start trim has changed.
   */
  private onStartTrimChanged = (trim: number) => {
    this.setState({ startTrim: Math.max(trim, 0) });
  };

  /**
   * Called when the end trim has changed.
   */
  private onEndTrimChanged = (trim: number) => {
    this.setState({ endTrim: Math.max(trim, 0) });
  };

  /**
   * Called when the settings should be closed.
   */
  private onSubmit = async () => {
    const { api, clip, onClose } = this.props;
    const { startTrim, endTrim, gain } = this.state;

    await api.setEdit({
      clipUID: clip.uid,
      startTrim: startTrim,
      endTrim: endTrim,
      gain: gain
    } as ClipEdit);

    onClose(true);
  };

  render() {
    const { onClose } = this.props;

    return (
      <ClipEditDialogView
        {...this.props}
        {...this.state}
        onStartTrimChanged={this.onStartTrimChanged}
        onEndTrimChanged={this.onEndTrimChanged}
        onCancel={() => onClose(false)}
        onSubmit={this.onSubmit}
      />
    );
  }
}
