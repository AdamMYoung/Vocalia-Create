import React, { Component } from "react";
import DataManager from "../../../api/DataManager";
import { Podcast, Group, Session } from "../../../utility/types";
import RecordEntry from "./RecordEntry";
import { Typography, Button } from "@material-ui/core";
import { LinkContainer } from "react-router-bootstrap";
import PodcastDialog from "./PodcastDialog";
import GroupDialog from "./GroupDialog";
import SessionDialog from "./SessionDialog";
import { withRouter, RouteComponentProps } from "react-router-dom";

interface ISelectionProps extends RouteComponentProps {
  api: DataManager;
}

interface ISelectionState {
  groups: Group[];
  podcasts: Podcast[];
  sessions: Session[];
  currentGroupUid: string;
  currentPodcastUid: string;
  groupDialogOpen: boolean;
  podcastDialogOpen: boolean;
  sessionDialogOpen: boolean;
}

class Selection extends Component<ISelectionProps, ISelectionState> {
  constructor(props: ISelectionProps) {
    super(props);

    this.state = {
      groups: [],
      podcasts: [],
      sessions: [],
      currentGroupUid: "",
      currentPodcastUid: "",
      groupDialogOpen: false,
      podcastDialogOpen: false,
      sessionDialogOpen: false
    };

    this.loadGroups();
  }

  /**
   * Loads all groups belonging to the user.
   */
  loadGroups = async () => {
    const { api } = this.props;
    var groups = await api.getUserGroups();

    if (groups) this.setState({ groups });
  };

  /**
   * Called when a group has been selected.
   */
  onGroupSelected = async (uid: string) => {
    const { api } = this.props;
    var podcasts = await api.getGroupPodcasts(uid);

    if (podcasts) this.setState({ podcasts: podcasts, currentGroupUid: uid });
  };

  /**
   * Called when a podcast has been selected.
   */
  onPodcastSelected = async (uid: string) => {
    const { api } = this.props;
    var sessions = await api.getPodcastSessions(uid);

    if (sessions) this.setState({ sessions: sessions, currentPodcastUid: uid });
  };

  /**
   * Closes the group creation dialog.
   */
  closeGroupDialog = () => {
    this.setState({ groupDialogOpen: false });
    this.loadGroups();
  };

  /**
   * Closes the podcast creation dialog.
   */
  closePodcastDialog = () => {
    this.setState({ podcastDialogOpen: false });
    this.onGroupSelected(this.state.currentGroupUid);
  };

  closeSessionDialog = () => {
    this.setState({ sessionDialogOpen: false });
    this.onPodcastSelected(this.state.currentPodcastUid);
  };

  render() {
    const { groups, podcasts, sessions } = this.state;

    /**
     * Displays all groups belonging to the user.
     */
    const Groups = (
      <div>
        <Typography component="div">
          <h1 style={{ display: "inline-block" }}>Groups</h1>
          <Button
            style={{ marginLeft: 8, marginBottom: 8 }}
            onClick={() => this.setState({ groupDialogOpen: true })}
          >
            New Group
          </Button>
        </Typography>
        <div style={{ display: "flex", flexWrap: "nowrap", overflowX: "auto" }}>
          {groups.map(g => (
            <RecordEntry
              key={g.uid}
              name={g.name}
              uid={g.uid}
              onClick={this.onGroupSelected}
              description={g.description}
              image={null}
            />
          ))}
        </div>
      </div>
    );

    /**
     * Displays all podcasts belonging to the selected group.
     */
    const Podcasts = (
      <div>
        <Typography component="div">
          <h1 style={{ display: "inline-block" }}>Podcasts</h1>
          <Button
            style={{ marginLeft: 8, marginBottom: 8 }}
            onClick={() => this.setState({ podcastDialogOpen: true })}
          >
            New Podcast
          </Button>
        </Typography>
        <div style={{ display: "flex", flexWrap: "nowrap", overflowX: "auto" }}>
          {podcasts.map(p => (
            <RecordEntry
              key={p.uid}
              name={p.name}
              uid={p.uid}
              onClick={this.onPodcastSelected}
              description={null}
              image={null}
            />
          ))}
        </div>
      </div>
    );

    /**
     * Displays all active sessions belonging to the selected podcast.
     */
    const Sessions = (
      <div>
        <Typography component="div">
          <h1 style={{ display: "inline-block" }}>Sessions</h1>
          <Button
            style={{ marginLeft: 8, marginBottom: 8 }}
            onClick={() => this.setState({ sessionDialogOpen: true })}
          >
            New Session
          </Button>
        </Typography>
        <div style={{ display: "flex", flexWrap: "nowrap", overflowX: "auto" }}>
          {sessions.map(s => (
            <RecordEntry
              name={new Date(s.date).toLocaleString()}
              uid={s.uid}
              onClick={() => this.props.history.push("/record/" + s.uid)}
              description={null}
              image={null}
            />
          ))}
        </div>
      </div>
    );

    return (
      <div>
        <SessionDialog
          open={this.state.sessionDialogOpen}
          closeDialog={this.closeSessionDialog}
          podcastId={this.state.currentPodcastUid}
          api={this.props.api}
        />
        <PodcastDialog
          open={this.state.podcastDialogOpen}
          closeDialog={this.closePodcastDialog}
          api={this.props.api}
          groupId={this.state.currentGroupUid}
        />
        <GroupDialog
          open={this.state.groupDialogOpen}
          closeDialog={this.closeGroupDialog}
          api={this.props.api}
        />

        {Groups}
        {this.state.currentGroupUid.length > 0 && Podcasts}
        {this.state.currentPodcastUid.length > 0 && Sessions}
      </div>
    );
  }
}

export default withRouter(Selection);
