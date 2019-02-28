import React, { Component } from "react";
import { Tabs, Tab, AppBar } from "@material-ui/core";
import Feed from "./Feed";
import Profile from "./Profile";

interface ISocialState {}

interface ISocialProps {
  isMobile: boolean;
}

export default class Social extends Component<ISocialProps, ISocialState> {
  constructor(props: ISocialProps) {
    super(props);
  }

  render() {
    const { isMobile } = this.props;

    return <div />;
  }
}
