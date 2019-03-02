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
import Record from "./record/Record";
import Publish from "./publish/Publish";
import Editor from "./editor/Editor";
import Social from "./social/Social";

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
 * Redirects the user to the login screen if not authenticated, waiting 1 second before redirecting to
 * ensure auth credentials have been fetched first.
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
        <PrivateRoute
          path="/social"
          isAuthenticated={auth.isAuthenticated}
          component={() => <Social api={api} isMobile={isMobile} />}
        />
        <PrivateRoute
          path="/record"
          isAuthenticated={auth.isAuthenticated}
          component={() => <Record />}
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

interface ILoginProps {
  auth: Auth;
}

/**
 * Component to facilitate login redirects.
 */
class Login extends Component<ILoginProps> {
  constructor(props: ILoginProps) {
    super(props);

    console.log("Loading login");
    props.auth.login();
  }

  render() {
    return <div />;
  }
}
