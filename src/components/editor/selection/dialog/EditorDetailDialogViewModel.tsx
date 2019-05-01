import React, { Component } from "react";
import DataManager from "../../../../data/api/DataManager";
import { Podcast } from "../../../../models/Podcast";
import ConfirmationDialogView from "../../../dialogs/confirmation/ConfirmationDialogView";
import EditorDetailDialogView from "./EditorDetailDialogView";

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
    this.setState({ deletionSession: sessionUid, isDeleteSessionOpen: true });
  };

  /**
   * Deletes the session from the editor API.
   */
  private onDeleteConfirmation = async () => {
    const { api } = this.props;
    const { deletionSession } = this.state;
    console.log(deletionSession);
    if (deletionSession) await api.deleteEditSession(deletionSession);
    await this.loadPodcast();
    this.onCancelDeletion();
  };

  /**
   * Closes the deletion window.
   */
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
            title="Delete Recording"
            subtitle="Are you sure you want to delete this recording?"
            onConfirm={this.onDeleteConfirmation}
            onDeny={this.onCancelDeletion}
          />
        )}
      </EditorDetailDialogView>
    );
  }
}
