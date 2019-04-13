import React, { Component } from "react";
import { EditStream } from "../../../../models/editor/EditStream";
import Waveform from "waveform-react";
import { drawerWidth } from "../../../../utility/constants";
import { Typography, Card } from "@material-ui/core";

interface IProps {
  stream: EditStream;
  audioBuffer: AudioBuffer | null;
  position: number;
  onPositionChanged: (position: number) => void;
}

export default class TrackView extends Component<IProps> {
  render() {
    const { audioBuffer, stream, position, onPositionChanged } = this.props;

    return (
      <Card style={{ marginTop: 5, padding: 5 }}>
        <Typography>{stream.userName}</Typography>
        <div style={{ height: 50 }}>
          <Waveform
            // Audio buffer
            buffer={audioBuffer}
            // waveform height
            height={50}
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
            position={position}
            // Optionally handle user manually changing position (0 - 1)
            onPositionChange={(pos: number) => onPositionChanged(pos)}
            showPosition={true}
            waveStyle={{
              // animate waveform on draw (default: true)
              animate: true,
              // waveform color
              color: "#fff",
              // width of each rendered point (min: 1, max: 10)
              pointWidth: 2
            }}
            // waveform width
            width={window.innerWidth - drawerWidth - 30}
          />
        </div>
      </Card>
    );
  }
}
