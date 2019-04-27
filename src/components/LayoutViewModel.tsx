import React, { Component } from "react";
import DataManager from "../data/api/DataManager";
import LayoutView from "./LayoutView";
import Auth from "../data/auth/Auth";
import { Theme, createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { SettingsManager } from "../data/settings/SettingsManager";

interface IProps {
  isMobile: boolean;
  isAuthenticated: boolean;
  api: DataManager;
  auth: Auth;
  onAuth: () => void;
}

interface IState {
  theme: Theme;
}

export class LayoutViewModel extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      theme: createMuiTheme({
        typography: {
          useNextVariants: true
        }
      })
    };
  }

  componentWillMount() {
    this.onOptionsChanged();
  }

  /*
   * Called when the options have changed.
   */
  private onOptionsChanged = async () => {
    this.setState({ theme: await this.getTheme() });
  };

  /**
   * Returns the current theme.
   */
  private getTheme = async (): Promise<Theme> => {
    var options = new SettingsManager();

    var isDarkMode = await options.getDarkMode();

    return createMuiTheme({
      typography: {
        useNextVariants: true
      },
      palette: {
        type: isDarkMode ? "dark" : "light"
      },
      overrides: {
        MuiButton: {
          root: {
            color: isDarkMode ? "white" : "black"
          }
        }
      }
    });
  };

  render() {
    const { theme } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
        <LayoutView
          onOptionsChanged={this.onOptionsChanged}
          {...this.props}
          {...this.state}
        />
      </MuiThemeProvider>
    );
  }
}
