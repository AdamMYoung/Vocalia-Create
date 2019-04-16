import React, { Component } from "react";
import AudioTrackView from "../audio/AudioTrackView";
import UserTrack from "../../../../models/editor/UserTrack";
import { Button, Card, CardContent } from "@material-ui/core";

interface IProps {
  track: UserTrack;
}

export default class UserTrackView extends Component<IProps> {
  render() {
    const { track } = this.props;
    return (
      <div style={{ display: "flex", flexWrap: "nowrap" }}>
        <Button style={{ margin: 4 }}>{track.userName}</Button>

        <Card style={{ margin: 4 }}>
          <CardContent>
            <AudioTrackView entries={track.entries} />
          </CardContent>
        </Card>
      </div>
    );
  }
}
