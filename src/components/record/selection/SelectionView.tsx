import React, { Component } from "react";
import { Grid, Toolbar, Typography, Button } from "@material-ui/core";
import SelectionEntryListView from "./elements/SelectionEntryListView";
import { Podcast } from "../../../utility/types";

interface IProps {
  isMobile: boolean;
  podcasts: Podcast[];
  onPodcastSelected: (podcast: Podcast) => void;
  onNewPodcast: () => void;
}

export default class SelectionView extends Component<IProps> {
  render() {
    const { onNewPodcast } = this.props;

    return (
      <Grid>
        <Toolbar>
          <Typography style={{ flexGrow: 1 }} variant="h6">
            Podcasts
          </Typography>
          <Button onClick={onNewPodcast}>New Podcast</Button>
        </Toolbar>
        <SelectionEntryListView {...this.props} />
        {this.props.children}
      </Grid>
    );
  }
}
