import React, { Component } from "react";
import DataManager from "../../../api/DataManager";
import { Podcast, Group, Session } from "../../../utility/types";
import RecordEntry from "./RecordEntry";
import { Typography, Button, Toolbar, Divider } from "@material-ui/core";
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

    if (podcasts)
      this.setState({
        podcasts: podcasts,
        currentGroupUid: uid,
        currentPodcastUid: ""
      });
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
        <Toolbar variant="dense">
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            style={{ flexGrow: 1 }}
          >
            Groups
          </Typography>
          <Button onClick={() => this.setState({ groupDialogOpen: true })}>
            New Group
          </Button>
        </Toolbar>
        <div style={{ display: "flex", flexWrap: "nowrap", overflowX: "auto" }}>
          {groups.map(g => (
            <RecordEntry
              key={g.uid}
              name={g.name}
              uid={g.uid}
              description={g.description}
              image={null}
              isSelected={this.state.currentGroupUid == g.uid ? true : false}
              onClick={this.onGroupSelected}
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
        <Toolbar variant="dense">
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            style={{ flexGrow: 1 }}
          >
            Podcasts
          </Typography>
          <Button onClick={() => this.setState({ podcastDialogOpen: true })}>
            New Podcast
          </Button>
        </Toolbar>
        <div style={{ display: "flex", flexWrap: "nowrap", overflowX: "auto" }}>
          {podcasts.map(p => (
            <RecordEntry
              key={p.uid}
              name={p.name}
              uid={p.uid}
              description={null}
              image={null}
              isSelected={this.state.currentPodcastUid == p.uid ? true : false}
              onClick={this.onPodcastSelected}
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
        <Toolbar variant="dense">
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            style={{ flexGrow: 1 }}
          >
            Sessions
          </Typography>
          <Button onClick={() => this.setState({ sessionDialogOpen: true })}>
            New Session
          </Button>
        </Toolbar>
        <div style={{ display: "flex", flexWrap: "nowrap", overflowX: "auto" }}>
          {sessions.map(s => (
            <RecordEntry
              key={s.uid}
              name={new Date(s.date).toLocaleString()}
              uid={s.uid}
              description={null}
              image={null}
              isSelected={false}
              onClick={() => this.props.history.push("/record/" + s.uid)}
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
        {this.state.currentGroupUid.length > 0 && (
          <div>
            <Divider /> {Podcasts}
          </div>
        )}
        {this.state.currentPodcastUid.length > 0 && (
          <div>
            <Divider /> {Sessions}
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Selection);
