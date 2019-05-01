import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router";
import DataManager from "../data/api/DataManager";
import Auth from "../data/auth/Auth";
import Callback from "../data/auth/Callback";
import EditViewModel from "./editor/edit/EditViewModel";
import EditorSelectionViewModel from "./editor/selection/EditorSelectionViewModel";
import InviteViewModel from "./invite/InviteViewModel";
import LoginView from "./LoginView";
import NavigationViewModel from "./navigation/NavigationViewModel";
import OptionsViewModel from "./options/OptionsViewModel";
import PublishingViewModel from "./publishing/PublishingViewModel";
import CreateViewModel from "./record/create/CreateViewModel";
import RecordSelectionViewModel from "./record/selection/RecordSelectionViewModel";

interface IProps {
  isMobile: boolean;
  isAuthenticated: boolean;
  api: DataManager;
  auth: Auth;
  onAuth: () => void;
  onOptionsChanged: () => void;
}

export default class LayoutView extends Component<IProps> {
  render() {
    const { auth, isAuthenticated } = this.props;

    const route = (
      <React.Fragment>
        <Switch>
          <Route
            exact
            path="/record/:podcastId/:sessionId/"
            render={props => (
              <CreateViewModel
                {...this.props}
                podcastId={props.match.params.podcastId}
                sessionId={props.match.params.sessionId}
              />
            )}
          />

          <Route
            path="/record/selection"
            render={() => {
              return <RecordSelectionViewModel {...this.props} />;
            }}
          />

          <Route
            exact
            path="/editor/:podcastId/:sessionId/"
            render={props => (
              <EditViewModel
                {...this.props}
                podcastId={props.match.params.podcastId}
                sessionId={props.match.params.sessionId}
              />
            )}
          />

          <Route
            path="/editor/selection"
            render={() => {
              return <EditorSelectionViewModel {...this.props} />;
            }}
          />

          <Route
            path="/publishing"
            render={() => {
              return <PublishingViewModel {...this.props} />;
            }}
          />

          <Route
            path="/callback"
            render={() => {
              return <Callback auth={auth} />;
            }}
          />

          <Route
            exact
            path="/invite/:id"
            render={props => (
              <InviteViewModel
                {...this.props}
                inviteUid={props.match.params.id}
              />
            )}
          />

          <Route
            path="/options"
            render={props => <OptionsViewModel {...this.props} />}
          />

          <Redirect to="/record/selection" />
        </Switch>
      </React.Fragment>
    );

    return (
      <NavigationViewModel {...this.props}>
        {isAuthenticated ? route : <LoginView />}
      </NavigationViewModel>
    );
  }
}
