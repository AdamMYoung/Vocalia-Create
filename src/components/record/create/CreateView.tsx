import React, { Component } from "react";
import { Podcast } from "../../../utility/types";
import DataManager from "../../../data/api/DataManager";
import { Grid, Divider } from "@material-ui/core";
import GroupViewModel from "./group/GroupViewModel";
import PodcastInfoView from "../../dialogs/detail/elements/PodcastInfoView";

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
        <Grid item xs={12}>
          <PodcastInfoView {...this.props} />
          <Divider style={{ marginTop: 16 }} />
        </Grid>
        <Grid item xs={12}>
          <GroupViewModel {...this.props} />
        </Grid>
        {this.props.children}
      </Grid>
    );
  }
}
