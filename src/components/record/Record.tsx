import React, { Component } from "react";
import DataManager from "../../api/DataManager";
import { Grid, Toolbar, Typography, Divider } from "@material-ui/core";
import Chat from "./communication/Chat";
import { Podcast } from "../../utility/types";
import Info from "./info/Info";

interface IRecordProps {
  api: DataManager;
  isMobile: boolean;
  sessionId: string | null;
  podcastId: string | null;
}

interface IRecordState {
  dialogOpen: boolean;
  currentPodcast: Podcast | null;
}

export default class Record extends Component<IRecordProps, IRecordState> {
  constructor(props: IRecordProps) {
    super(props);

    this.state = {
      dialogOpen: false,
      currentPodcast: null
    };

    this.loadPodcast();
  }

  /**
   * Loads the selected podcast from the API.
   */
  private loadPodcast = async () => {
    const { podcastId, api } = this.props;

    if (podcastId) {
      console.log(podcastId);
      var currentPodcast = await api.getPodcastDetail(podcastId);
      this.setState({ currentPodcast });
    }
  };

  render() {
    const { api, isMobile, sessionId } = this.props;
    const { currentPodcast } = this.state;

    return (
      <Grid container>
        <Grid item xs={8}>
          <div>
            <Chat api={api} sessionId={sessionId} />
          </div>
        </Grid>
        <Grid item xs={4}>
          {currentPodcast && (
            <Info isMobile={isMobile} podcast={currentPodcast} />
          )}
        </Grid>
      </Grid>
    );
  }
}
