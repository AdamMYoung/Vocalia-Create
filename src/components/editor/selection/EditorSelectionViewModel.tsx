import React, { Component } from "react";
import { Podcast } from "../../../utility/types";
import SelectionView from "../../selection/SelectionView";

export default class EditorSelectionViewModel extends Component {
  private onPodcastSelected = (podcast: Podcast) => {};

  render() {
    return <div />;
    //return <SelectionView onPodcastSelected={this.onPodcastSelected} />;
  }
}
