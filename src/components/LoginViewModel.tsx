import React, { Component } from "react";
import Auth from "../data/auth/Auth";

interface ILoginProps {
  auth: Auth;
}

/**
 * Component to facilitate login redirects.
 */
export default class LoginViewModel extends Component<ILoginProps> {
  constructor(props: ILoginProps) {
    super(props);

    localStorage.setItem("path", window.location.pathname);
    props.auth.renewSession();
  }

  render() {
    return <div />;
  }
}
