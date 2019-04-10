import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import SelectionEntryView from "./SelectionEntryView";
import { Podcast } from "../../models/Podcast";

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
