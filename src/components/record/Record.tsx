import React, { Component } from "react";
import DataManager from "../../api/DataManager";
import {
  Grid,
  Toolbar,
  Typography,
  Divider,
  Dialog,
  Drawer,
  Button,
  DialogContent,
  DialogActions
} from "@material-ui/core";
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
  isDialogOpen: boolean;
}

export default class Record extends Component<IRecordProps, IRecordState> {
  constructor(props: IRecordProps) {
    super(props);

    this.state = {
      dialogOpen: false,
      currentPodcast: null,
      isDialogOpen: false
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
    const { currentPodcast, isDialogOpen } = this.state;

    const infoDialog = currentPodcast && (
      <Dialog
        open={isDialogOpen}
        fullScreen
        onClose={() => this.setState({ isDialogOpen: false })}
      >
        <DialogContent>
          <Info isMobile={isMobile} podcast={currentPodcast} />
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={() => this.setState({ isDialogOpen: false })}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );

    return (
      <Grid container>
        <Grid item xs={isMobile ? 12 : 8}>
          <div>
            <Toolbar variant={isMobile ? "regular" : "dense"}>
              <Typography
                variant="h6"
                color="inherit"
                noWrap
                style={{ flexGrow: 1 }}
              >
                Current Users
              </Typography>
              {isMobile && (
                <Button onClick={() => this.setState({ isDialogOpen: true })}>
                  Podcast Details
                </Button>
              )}
            </Toolbar>
            <Divider />
            <Chat api={api} sessionId={sessionId} />
          </div>
        </Grid>
        {!isMobile ? (
          <Grid item xs={4}>
            {currentPodcast && (
              <Info isMobile={isMobile} podcast={currentPodcast} />
            )}
          </Grid>
        ) : (
          infoDialog
        )}
      </Grid>
    );
  }
}
