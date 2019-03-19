import React, { Component } from "react";
import DataManager from "../data/api/DataManager";
import { Slide } from "@material-ui/core";
import { Route, Switch, Redirect } from "react-router";
import Callback from "../data/auth/Callback";
import Auth from "../data/auth/Auth";
import NavigationViewModel from "./navigation/NavigationViewModel";
import OptionsViewModel from "./options/OptionsViewModel";
import LoginViewModel from "./LoginViewModel";
import SelectionViewModel from "./record/selection/SelectionViewModel";
import InviteViewModel from "./record/invite/InviteViewModel";
import GroupViewModel from "./record/group/GroupViewModel";

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
    const { auth } = this.props;

    const route = (
      <React.Fragment>
        <Switch>
          <Route
            exact
            path="/record/:podcastId/:sessionId/"
            render={props => (
              <GroupViewModel
                {...this.props}
                sessionId={props.match.params.sessionId}
              />
            )}
          />

          <Route
            path="/selection"
            render={() => {
              return <SelectionViewModel {...this.props} />;
            }}
          />

          <Route
            path="/callback"
            render={() => {
              return <Callback auth={auth} />;
            }}
          />

          <Route
            path="/invite/:id"
            render={props => (
              <InviteViewModel
                {...this.props}
                inviteUid={props.match.params.id}
              />
            )}
          />

          <Redirect to="/selection" />
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

    return auth.isAuthenticated() ? (
      <NavigationViewModel {...this.props}>{route}</NavigationViewModel>
    ) : (
      <LoginViewModel {...this.props} />
    );
  }
}
