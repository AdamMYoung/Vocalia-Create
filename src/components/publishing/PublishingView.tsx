import { Grid } from "@material-ui/core";
import React, { Component } from "react";
import DataManager from "../../data/api/DataManager";
import { PublishedPodcast } from "../../models/publishing/PublishedPodcast";
import { UnassignedEpisode } from "../../models/publishing/UnassignedEpisode";
import { UnassignedPodcast } from "../../models/publishing/UnassignedPodcast";
import AssignedViewModel from "./assigned/AssignedViewModel";
import UnassignedViewModel from "./unassigned/UnassignedViewModel";

interface IProps {
  api: DataManager;
  publishedPodcasts: PublishedPodcast[];
  unassignedPodcasts: UnassignedPodcast[];
  unassignedEpisodes: UnassignedEpisode[];
  onReload: () => void;
}

export default class PublishingView extends Component<IProps> {
  render() {
    const {
      publishedPodcasts,
      unassignedPodcasts,
      unassignedEpisodes
    } = this.props;

    return (
      <Grid container>
        <Grid item xs={12}>
          <UnassignedViewModel
            {...this.props}
            podcasts={unassignedPodcasts}
            episodes={unassignedEpisodes}
          />
        </Grid>
        <Grid item xs={12}>
          <AssignedViewModel {...this.props} podcasts={publishedPodcasts} />
        </Grid>
      </Grid>
    );
  }
}
