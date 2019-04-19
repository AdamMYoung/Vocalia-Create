import React, { Component } from "react";
import DataManager from "../data/api/DataManager";
import { Route, Switch, Redirect } from "react-router";
import Callback from "../data/auth/Callback";
import Auth from "../data/auth/Auth";
import NavigationViewModel from "./navigation/NavigationViewModel";
import OptionsViewModel from "./options/OptionsViewModel";
import RecordSelectionViewModel from "./record/selection/RecordSelectionViewModel";
import InviteViewModel from "./invite/InviteViewModel";
import CreateViewModel from "./record/create/CreateViewModel";
import LoginView from "./LoginView";
import EditorSelectionViewModel from "./editor/selection/EditorSelectionViewModel";
import EditViewModel from "./editor/edit/EditViewModel";

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

          <Redirect to="/record/selection" />
        </Switch>

        <Route
          path="/:location/:dialog"
          render={props =>
            props.match.params.dialog == "options" && (
              <OptionsViewModel {...this.props} />
            )
          }
        />
      </React.Fragment>
    );

    return (
      <NavigationViewModel {...this.props}>
        {isAuthenticated ? route : <LoginView />}
      </NavigationViewModel>
    );
  }
}
