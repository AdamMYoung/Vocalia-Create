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
import Publish from "./publish/Publish";
import Editor from "./editor/Editor";
import Record from "./record/Record";
import Login from "./Login";
import Selection from "./selection/Selection";
import Invite from "./invite/Invite";

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
 * Redirects the user to the login screen if not authenticated, otherwise allows access to the
 * provided component. Works with components with additional props, but instantiates it twice.
 */
function PrivateRoute({ component: Component, isAuthenticated, ...rest }: any) {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login"
            }}
          />
        )
      }
    />
  );
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
    const { auth, api } = this.state;

    /**
     * Elements that can be routed to.
     */
    const RoutingContents = (
      <Switch>
        <Route
          exact
          path="/record/:podcastId/:sessionId/"
          render={props =>
            auth.isAuthenticated() ? (
              <Record
                api={api}
                isMobile={isMobile}
                podcastId={props.match.params.podcastId}
                sessionId={props.match.params.sessionId}
              />
            ) : (
              <Login auth={auth} />
            )
          }
        />

        <Route
          path="/selection/"
          render={() =>
            auth.isAuthenticated() ? (
              <Selection api={api} isMobile={isMobile} />
            ) : (
              <Login auth={auth} />
            )
          }
        />

        <Route
          path="/invite/:id"
          render={props =>
            auth.isAuthenticated() ? (
              <Invite api={api} inviteUid={props.match.params.id} />
            ) : (
              <Login auth={auth} />
            )
          }
        />

        <PrivateRoute
          path="/edit"
          isAuthenticated={auth.isAuthenticated}
          component={() => <Editor />}
        />
        <PrivateRoute
          path="/publish"
          isAuthenticated={auth.isAuthenticated}
          component={() => <Publish />}
        />

        <Route
          path="/callback"
          render={() => {
            return <Callback auth={this.state.auth} />;
          }}
        />
        <Route
          path="/login"
          render={() => {
            return <Login auth={this.state.auth} />;
          }}
        />

        <Redirect to="/selection" />
      </Switch>
    );

    return (
      <Navigation isMobile={isMobile} auth={auth}>
        {RoutingContents}
      </Navigation>
    );
  }
}

export default withRouter(Layout);
