import React, { Component } from "react";
import AudioEntry from "../../../../models/editor/AudioEntry";
import AudioEntryView from "./AudioEntryView";

interface IProps {
  entries: AudioEntry[];
}

export default class AudioTrackView extends Component<IProps> {
  render() {
    const { entries } = this.props;

    return (
      <div style={{ display: "inline-block" }}>
        {entries.map(entry => (
          <div key={entry.uid} style={{ float: "left" }}>
            <AudioEntryView entry={entry} {...this.props} />
          </div>
        ))}
      </div>
    );
  }
}
