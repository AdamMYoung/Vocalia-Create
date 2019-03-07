import React, { Component } from "react";
import DataManager from "../../api/DataManager";
import {
  Grid,
  Drawer,
  Button,
  Dialog,
  DialogContent,
  DialogActions
} from "@material-ui/core";
import Selection from "./selection/Selection";
import Chat from "./communication/Chat";

interface IRecordProps {
  api: DataManager;
  isMobile: boolean;
  sessionId: string | null;
}

interface IRecordState {
  dialogOpen: boolean;
  selectedSession: string | null;
}

export default class Record extends Component<IRecordProps, IRecordState> {
  constructor(props: IRecordProps) {
    super(props);

    this.state = {
      dialogOpen: false,
      selectedSession: this.props.sessionId
    };
  }

  render() {
    const { api, isMobile } = this.props;
    const { selectedSession } = this.state;

    return (
      <Grid container>
        <Grid item xs={8}>
          {isMobile && (
            <div>
              <Button onClick={() => this.setState({ dialogOpen: true })}>
                Podcast Selection
              </Button>
              <Chat api={api} sessionId={selectedSession} />
            </div>
          )}
        </Grid>
        <Grid item xs={4}>
          {isMobile ? (
            <Dialog
              open={this.state.dialogOpen}
              fullScreen
              onClose={() => this.setState({ dialogOpen: false })}
            >
              <DialogContent>
                <Selection api={api} />
              </DialogContent>
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
          ) : (
            <Selection api={api} />
          )}
        </Grid>
      </Grid>
    );
  }
}
