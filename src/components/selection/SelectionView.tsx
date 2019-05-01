import { Button, Grid, Toolbar, Typography } from "@material-ui/core";
import React, { Component } from "react";
import { Podcast } from "../../models/Podcast";
import SelectionEntryListView from "./SelectionEntryListView";

interface IProps {
  isMobile: boolean;
  podcasts: Podcast[];
  title: string;
  canCreateNewPodcast: boolean;
  onPodcastSelected: (podcast: Podcast) => void;
  onNewPodcast?: () => void;
}

export default class SelectionView extends Component<IProps> {
  public static defaultProps = {
    canCreateNewPodcast: true
  };

  render() {
    const { onNewPodcast, canCreateNewPodcast, title } = this.props;

    return (
      <Grid>
        <Toolbar>
          <Typography style={{ flexGrow: 1 }} variant="h6">
            {title}
          </Typography>
          {canCreateNewPodcast && (
            <Button onClick={onNewPodcast}>New Podcast</Button>
          )}
        </Toolbar>
        <SelectionEntryListView {...this.props} />
        {this.props.children}
      </Grid>
    );
  }
}
