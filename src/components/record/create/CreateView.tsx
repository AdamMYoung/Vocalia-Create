import React, { Component } from "react";
import { Podcast } from "../../../utility/types";
import DataManager from "../../../data/api/DataManager";
import { Grid, Divider, Typography, TextField } from "@material-ui/core";
import GroupViewModel from "./group/GroupViewModel";
import PodcastInfoView from "../../dialogs/detail/elements/PodcastInfoView";
import ControlViewModel from "./control/ControlViewModel";

interface IProps {
  api: DataManager;
  podcast: Podcast;
  sessionId: string;
  onInvite: () => void;
}

export default class CreateView extends Component<IProps> {
  render() {
    return (
      <Grid container>
        <Grid item xs={12} style={{ padding: 12 }}>
          <Typography variant="h6">Current Podcast</Typography>
          <PodcastInfoView {...this.props} />
          <Divider />
          <div style={{ margin: 8 }}>
            <ControlViewModel />
          </div>
          <Divider />
        </Grid>

        <Grid item xs={12}>
          <GroupViewModel {...this.props} />
        </Grid>
        {this.props.children}
      </Grid>
    );
  }
}
