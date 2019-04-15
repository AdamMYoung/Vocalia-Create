import React, { Component } from "react";
import DataManager from "../../../data/api/DataManager";
import {
  Grid,
  Divider,
  Typography,
  AppBar,
  Toolbar,
  Card,
  CardContent
} from "@material-ui/core";
import GroupViewModel from "./group/GroupViewModel";
import PodcastInfoView from "../../dialogs/detail/elements/PodcastInfoView";
import ControlViewModel from "./control/ControlViewModel";
import { Podcast } from "../../../models/Podcast";
import { User } from "../../../models/User";
import ClipListViewModel from "./clips/ClipListViewModel";
import { SessionClip } from "../../../models/SessionClip";

interface IProps {
  sessionId: string;
  api: DataManager;
  podcast: Podcast;
  currentUser: User;
  hub: signalR.HubConnection;
  clips: SessionClip[];

  onInvite: () => void;
  onClipsChanged: () => void;
}

export default class CreateView extends Component<IProps> {
  render() {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Card style={{ margin: 4 }}>
            <CardContent>
              <Typography variant="h6">Current Podcast</Typography>
              <PodcastInfoView {...this.props} />
              <Divider />
              <div style={{ margin: 8 }}>
                <ControlViewModel {...this.props} />
              </div>
              <Divider />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card style={{ margin: 4 }}>
            <CardContent>
              <Typography variant="h6">Members</Typography>
              <GroupViewModel {...this.props} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card style={{ margin: 4 }}>
            <CardContent>
              <Typography variant="h6">Clips</Typography>
              <ClipListViewModel {...this.props} />
            </CardContent>
          </Card>
        </Grid>

        {this.props.children}
      </Grid>
    );
  }
}
