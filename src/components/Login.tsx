import React, { Component } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import Auth from "../auth/Auth";

interface ILoginProps extends RouteComponentProps {
  auth: Auth;
}

/**
 * Component to facilitate login redirects.
 */
class Login extends Component<ILoginProps> {
  constructor(props: ILoginProps) {
    super(props);

    localStorage.setItem("path", this.props.location.pathname);
    props.auth.renewSession();
  }

  render() {
    return <div />;
  }
}

export default withRouter(Login);
