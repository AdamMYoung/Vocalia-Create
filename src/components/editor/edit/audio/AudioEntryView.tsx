import React, { Component } from "react";
import Waveform from "waveform-react";

interface IProps {
  buffer: AudioBuffer | null;
}

export default class AudioEntryView extends Component<IProps> {
  render() {
    const { buffer } = this.props;

    return (
      <div id={"wave"} style={{ height: 40 }}>
        <Waveform
          // Audio buffer
          buffer={buffer}
          // waveform height
          height={40}
          markerStyle={{
            // Position marker color
            color: "#3f51b5",
            // Position marker width (in pixels)
            width: 1
          }}
          // Wave plot type (line or bar)
          plot="line"
          // redraw waveform on window size change (default: true)
          responsive={true}
          waveStyle={{
            // animate waveform on draw (default: true)
            animate: true,
            // waveform color
            color: "#fff",
            // width of each rendered point (min: 1, max: 10)
            pointWidth: 2
          }}
        />
      </div>
    );
  }
}
