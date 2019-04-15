import React, { Component } from "react";
import { Card, CardContent } from "@material-ui/core";
import Waveform from "waveform-react";
import { drawerWidth } from "../../../../utility/constants";
import AudioEntry from "../../../../models/editor/AudioEntry";

interface IProps {
  entry: AudioEntry;
}

export default class AudioEntryView extends Component<IProps> {
  render() {
    const { entry } = this.props;

    return (
      <Card style={{ height: 50 }}>
        <CardContent>
          <Waveform
            // Audio buffer
            buffer={entry.buffer}
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
        </CardContent>
      </Card>
    );
  }
}
