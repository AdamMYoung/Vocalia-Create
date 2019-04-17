import React, { Component } from "react";
import TimelineView from "./TimelineView";
import Clip from "../../../../models/editor/Clip";
import ClipEditDialogViewModel from "../dialog/ClipEditDialogViewModel";
import DataManager from "../../../../data/api/DataManager";

interface IProps {
  api: DataManager;
  timeline: Clip[];
}

interface IState {
  currentClipPlaying: string | null;
  currentEditClip: Clip | null;
}

export class TimelineViewModel extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      currentClipPlaying: null,
      currentEditClip: null
    };
  }

  /**
   * Called when a clip has been selected to play.
   */
  private onClipPlay = (clipUid: string) => {
    const { currentClipPlaying } = this.state;
    this.setState({
      currentClipPlaying: currentClipPlaying == clipUid ? null : clipUid
    });
  };

  /**
   * Called when the settings for a clip has been selected.
   */
  private onClipSettings = (clipUid: string) => {
    const { timeline } = this.props;
    var clip = timeline.filter(c => c.uid == clipUid);

    if (clip.length == 1) this.setState({ currentEditClip: clip[0] });
  };

  /**
   * Called when the settings dialog should close.
   */
  private onCloseSettings = () => {
    this.setState({ currentEditClip: null });
  };

  render() {
    const { currentEditClip } = this.state;

    return (
      <div>
        <TimelineView
          {...this.props}
          {...this.state}
          onClipPlay={this.onClipPlay}
          onClipSettings={this.onClipSettings}
        />
        {currentEditClip && (
          <ClipEditDialogViewModel
            clip={currentEditClip}
            onCloseSettings={this.onCloseSettings}
            {...this.props}
          />
        )}
      </div>
    );
  }
}
