import React, { Component } from "react";
import DataManager from "../../api/DataManager";
import { Podcast } from "../../utility/types";
import { Grid, Toolbar, Typography, Button } from "@material-ui/core";
import PodcastEntry from "./PodcastEntry";
import PodcastCreationDialog from "./dialogs/PodcastCreationDialog";
import PodcastDetailDialog from "./dialogs/PodcastSelectedDialog";
import NewSessionConfirmDialog from "./dialogs/NewSessionConfirmDialog";

interface ISelectionProps {
  api: DataManager;
  isMobile: boolean;
}

interface ISelectionState {
  podcasts: Podcast[] | null;
  podcastDetailOpen: boolean;
  newPodcastOpen: boolean;
  newSessionOpen: boolean;
}

export default class Selection extends Component<
  ISelectionProps,
  ISelectionState
> {
  constructor(props: ISelectionProps) {
    super(props);

    this.state = {
      podcasts: null,
      podcastDetailOpen: false,
      newPodcastOpen: false,
      newSessionOpen: false
    };
  }

  componentWillMount = async () => {
    await this.loadPodcasts();
  };

  /**
   * Loads all podcasts belonging to the specified user.
   */
  loadPodcasts = async () => {
    var podcasts = await this.props.api.getPodcasts();
    this.setState({ podcasts });
  };

  render() {
    const {
      podcasts,
      podcastDetailOpen,
      newPodcastOpen,
      newSessionOpen
    } = this.state;

    const { api, isMobile } = this.props;

    return (
      <Grid>
        <Toolbar>
          <Typography style={{ flexGrow: 1 }} variant="h6">
            Podcasts
          </Typography>
          <Button onClick={() => this.setState({ newPodcastOpen: true })}>
            New Podcast
          </Button>
        </Toolbar>

        <Grid container justify={isMobile ? "center" : "flex-start"}>
          {podcasts &&
            podcasts.map(p => <PodcastEntry key={p.uid} podcast={p} />)}
        </Grid>

        <PodcastCreationDialog
          api={api}
          open={newPodcastOpen}
          onFinish={() => {
            this.loadPodcasts();
            this.setState({ newPodcastOpen: false });
          }}
        />
        <PodcastDetailDialog api={api} open={podcastDetailOpen} />
        <NewSessionConfirmDialog api={api} open={newSessionOpen} />
      </Grid>
    );
  }
}
