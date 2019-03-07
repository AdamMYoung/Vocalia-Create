import React, { Component } from "react";
import DataManager from "../../api/DataManager";
import {
  Grid,
  Drawer,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Toolbar,
  Typography,
  AppBar,
  Divider
} from "@material-ui/core";
import Selection from "./selection/Selection";
import Chat from "./communication/Chat";

interface IRecordProps {
  api: DataManager;
  isMobile: boolean;
  sessionId: string | null;
  podcastName: string | null;
}

interface IRecordState {
  dialogOpen: boolean;
  selectedSession: string | null;
  selectedPodcastName: string;
}

export default class Record extends Component<IRecordProps, IRecordState> {
  constructor(props: IRecordProps) {
    super(props);

    const { sessionId, podcastName } = this.props;

    this.state = {
      dialogOpen: false,
      selectedSession: sessionId,
      selectedPodcastName:
        podcastName != null ? podcastName : "Select a Podcast"
    };
  }

  render() {
    const { api, isMobile } = this.props;
    const { selectedSession, selectedPodcastName } = this.state;

    const SelectionItem = (
      <Selection
        api={api}
        onSessionSelected={() => this.setState({ dialogOpen: false })}
        onPodcastSelected={(podcastName: string) =>
          this.setState({ selectedPodcastName: podcastName })
        }
      />
    );

    const SelectionDialog = (
      <Dialog
        open={this.state.dialogOpen}
        fullScreen
        onClose={() => this.setState({ dialogOpen: false })}
      >
        <DialogContent>{SelectionItem}</DialogContent>
        <DialogActions>
          <Button
            onClick={() => this.setState({ dialogOpen: false })}
            color="primary"
            autoFocus
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
                {selectedPodcastName}
              </Typography>
              {isMobile && (
                <Button onClick={() => this.setState({ dialogOpen: true })}>
                  Change
                </Button>
              )}
            </Toolbar>
            <Divider />
            {SelectionDialog}
            <Chat api={api} sessionId={selectedSession} />
          </div>
        </Grid>

        <Grid item xs={4}>
          {!isMobile && SelectionItem}
        </Grid>
      </Grid>
    );
  }
}
