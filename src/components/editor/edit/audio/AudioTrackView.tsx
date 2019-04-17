import React, { Component } from "react";
import ClipMedia from "../../../../models/editor/ClipMedia";
import AudioEntryViewModel from "./AudioEntryViewModel";

interface IProps {
  entries: ClipMedia[];
}

export default class AudioTrackView extends Component<IProps> {
  render() {
    const { entries } = this.props;

    return (
      <div style={{ display: "flex", flexWrap: "nowrap" }}>
        {entries.map(entry => (
          <div key={entry.uid} style={{ float: "left" }}>
            <AudioEntryViewModel entry={entry} {...this.props} />
          </div>
        ))}
      </div>
    );
  }
}
