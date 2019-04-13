import React, { Component } from "react";
import DataManager from "../../../data/api/DataManager";
import { EditStream } from "../../../models/editor/EditStream";
import TrackViewModel from "./tracks/TrackViewModel";

interface IProps {
  streams: EditStream[];
}

export default class EditView extends Component<IProps> {
  render() {
    const { streams } = this.props;

    return (
      <div>
        {streams.map(s => (
          <TrackViewModel key={s.userUID} stream={s} />
        ))}
      </div>
    );
  }
}
