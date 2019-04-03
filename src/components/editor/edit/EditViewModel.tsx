import React, { Component } from "react";
import DataManager from "../../../data/api/DataManager";

interface IProps {
  api: DataManager;
  podcastId: string;
  sessionId: string;
}

interface IState {}

export default class EditViewModel extends Component<IProps, IState> {
  render() {
    return <div />;
  }
}
