import React, { Component } from "react";
import EditorDetailDialogView from "./EditorDetailDialogView";
import { Podcast } from "../../../../models/Podcast";
import DataManager from "../../../../data/api/DataManager";
import ConfirmationDialogView from "../../../dialogs/confirmation/ConfirmationDialogView";

interface IProps {
  api: DataManager;
  podcast: Podcast;
  isMobile: boolean;
  onClose: () => void;
}

interface IState {
  podcast: Podcast;
  deletionSession: string | null;
  sessionUrl: string;
  isDeleteSessionOpen: boolean;
}

export default class EditorDetailDialogViewModel extends Component<
  IProps,
  IState
> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      podcast: props.podcast,
      isDeleteSessionOpen: false,
      deletionSession: null,
      sessionUrl: ""
    };
  }

  /**
   * Loads podcast info on initial mount.
   */
  componentWillMount() {
    this.loadPodcast();
  }

  /**
   * Loads detailed data for the current podcast.
   */
  private loadPodcast = async () => {
    const { api } = this.props;
    var podcast = await api.getEditorPodcastDetail(this.props.podcast.uid);
    if (podcast) {
      this.setState({ podcast });
    }
  };

  /**
   * Called when a session has been selected to delete.
   */
  private onDeleteSession = (sessionUid: string) => {
    this.setState({ deletionSession: sessionUid });
  };

  private onDeleteConfirmation = () => {
    const { api } = this.props;
    const { deletionSession } = this.state;
    //api.deleteEditSession(deletionSession);
  };

  private onCancelDeletion = () => {
    this.setState({ isDeleteSessionOpen: false, deletionSession: null });
  };

  render() {
    const { podcast, isDeleteSessionOpen } = this.state;
    return (
      <EditorDetailDialogView
        podcast={podcast}
        onDeleteSession={this.onDeleteSession}
        {...this.props}
        {...this.state}
      >
        {isDeleteSessionOpen && (
          <ConfirmationDialogView
            title="Create Session"
            subtitle="Are you sure you want to create a new session?"
            onConfirm={this.onDeleteConfirmation}
            onDeny={this.onCancelDeletion}
          />
        )}
      </EditorDetailDialogView>
    );
  }
}
