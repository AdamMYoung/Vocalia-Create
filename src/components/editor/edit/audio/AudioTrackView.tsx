import React, { Component } from "react";
import AudioEntry from "../../../../models/editor/AudioEntry";
import AudioEntryView from "./AudioEntryView";
import AudioEntryViewModel from "./AudioEntryViewModel";

interface IProps {
  entries: AudioEntry[];
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
