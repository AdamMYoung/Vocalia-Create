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
    /**
     * Elements that can be routed to.
     */
    const RoutingContents = (
      <Switch>
        <Route
          path="/callback"
          render={() => {
            return <Callback auth={this.state.auth} />;
          }}
        />
      </Switch>
    );

    return { RoutingContents };
  }
}

export default withRouter(Layout);
