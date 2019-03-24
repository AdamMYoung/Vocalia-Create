import React, { Component } from "react";
import ControlView from "./ControlView";
import moment from "moment";

interface IProps {}

interface IState {
  duration: number;
  isRecording: boolean;
}

export default class ControlViewModel extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      duration: 0,
      isRecording: false
    };
  }

  /**
   * Gets the duration time formatted as a string.
   */
  private getDurationText = (): string => {
    const { duration } = this.state;

    return moment("2015-01-01")
      .startOf("day")
      .seconds(duration)
      .format("H:mm:ss");
  };

  render() {
    return <ControlView {...this.state} duration={this.getDurationText()} />;
  }
}
