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
}

export default class Record extends Component<IRecordProps, IRecordState> {
  constructor(props: IRecordProps) {
    super(props);

    const { sessionId } = this.props;

    this.state = {
      dialogOpen: false,
      selectedSession: sessionId
    };
  }

  componentWillReceiveProps = (props: IRecordProps) => {
    if (this.props.sessionId != props.sessionId)
      this.setState({ selectedSession: props.sessionId });
  };

  render() {
    const { api, isMobile, podcastName } = this.props;
    const { selectedSession } = this.state;

    return (
      <Grid container>
        <Grid item xs={12}>
          <div>
            <Toolbar variant={isMobile ? "regular" : "dense"}>
              <Typography
                variant="h6"
                color="inherit"
                noWrap
                style={{ flexGrow: 1 }}
              >
                {podcastName}
              </Typography>
            </Toolbar>
            <Divider />
            <Chat api={api} sessionId={selectedSession} />
          </div>
        </Grid>
      </Grid>
    );
  }
}
