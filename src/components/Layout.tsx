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
import { Edit } from "@material-ui/icons";
import Publish from "./publish/Publish";

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

function PrivateRoute({ component: Component, isAuthenticated, ...rest }: any) {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
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
    const { isAuthenticated } = this.state.auth;

    /**
     * Elements that can be routed to.
     */
    const RoutingContents = (
      <Switch>
        <PrivateRoute
          path="/record"
          isAuthenticated={isAuthenticated}
          component={() => <Record />}
        />
        <PrivateRoute
          path="/edit"
          isAuthenticated={isAuthenticated}
          component={() => <Edit />}
        />
        <PrivateRoute
          path="/publish"
          isAuthenticated={isAuthenticated}
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

    return <Navigation isMobile={isMobile}>{RoutingContents}</Navigation>;
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

    props.auth.login();
  }

  render() {
    return <div />;
  }
}
