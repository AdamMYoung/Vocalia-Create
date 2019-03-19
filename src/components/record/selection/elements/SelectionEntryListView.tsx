import React, { Component } from "react";
import { Podcast } from "../../../../utility/types";
import { Grid } from "@material-ui/core";
import SelectionEntryView from "./SelectionEntryView";

interface IProps {
  isMobile: boolean;
  podcasts: Podcast[];
  onPodcastSelected: (podcast: Podcast) => void;
}

export default class SelectionEntryListView extends Component<IProps> {
  render() {
    const { isMobile, podcasts } = this.props;

    return (
      <Grid container justify={isMobile ? "center" : "flex-start"}>
        {podcasts.map(p => (
          <SelectionEntryView key={p.uid} podcast={p} {...this.props} />
        ))}
      </Grid>
    );
  }
}
