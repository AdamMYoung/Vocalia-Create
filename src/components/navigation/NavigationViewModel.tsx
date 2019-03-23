import React, { Component } from "react";
import DataManager from "../../data/api/DataManager";
import NavigationView from "./NavigationView";

interface IProps {
  api: DataManager;
  isMobile: boolean;
  isAuthenticated: boolean;
  onAuth: () => void;
}

interface IState {
  drawerOpen: boolean;
  addToHomePrompt: any;
}

export default class NavigationViewModel extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      drawerOpen: false,
      addToHomePrompt: null
    };

    window.addEventListener("beforeinstallprompt", (e: any) => {
      this.setState({ addToHomePrompt: e });
    });
  }

  /**
   * Toggles the status of the drawer.
   */
  setDrawer = (drawerOpen: boolean) => {
    this.setState({ drawerOpen });
  };

  /**
   * Opens the window to add the SPA to the home page of the application.
   */
  onAddToHome = () => {
    const { addToHomePrompt } = this.state;
    addToHomePrompt.prompt();
    addToHomePrompt.userChoice.then(this.setState({ addToHomePrompt: null }));
  };

  render() {
    const { api } = this.props;

    return (
      <NavigationView
        onAddToHome={this.onAddToHome}
        setDrawer={this.setDrawer}
        {...this.props}
        {...this.state}
      />
    );
  }
}
