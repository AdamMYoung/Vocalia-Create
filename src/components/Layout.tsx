import React, { Component } from "react";
import Callback from "../auth/Callback";
import DataManager from "../api/DataManager";
import Auth from "../auth/Auth";
import {
  Route,
  RouteComponentProps,
  withRouter,
  Redirect,
  Switch
} from "react-router";
import Navigation from "./navigation/Navigation";

/**
 * State information for the application.
 */
interface ILayoutState {
  auth: Auth;
  api: DataManager;
}

/**
 * Required properties for the application.
 */
interface ILayoutProps extends RouteComponentProps {
  isMobile: boolean;
}

/**
 * UI entry point into the application, handles routing and player interaction.
 */
export class Layout extends Component<ILayoutProps, ILayoutState> {
  displayName = Layout.name;
  constructor(props: ILayoutProps) {
    super(props);

    this.state = {
      auth: new Auth(props, this.apiTokenChanged),
      api: new DataManager()
    };
  }

  /**
   * Called when the API token changes.
   */
  apiTokenChanged = async (token: string) => {
    var api = new DataManager();
    api.accessToken = token;
    this.setState({ api: api });
  };

  render() {
    const { isMobile } = this.props;

    /**
     * Elements that can be routed to.
     */
    const RoutingContents = (
      <Switch>
        <Route
          path="/record"
          render={() => {
            return <p>Record</p>;
          }}
        />
        <Route
          path="/edit"
          render={() => {
            return <p>Edit</p>;
          }}
        />
        <Route
          path="/publish"
          render={() => {
            return <p>Publish</p>;
          }}
        />
        <Route
          path="/callback"
          render={() => {
            return <Callback auth={this.state.auth} />;
          }}
        />

        <Route render={() => <Redirect to="/record" />} />
      </Switch>
    );

    return <Navigation isMobile={isMobile}>{RoutingContents}</Navigation>;
  }
}

export default withRouter(Layout);
