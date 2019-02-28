import React, { Component } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  AppBar,
  createStyles,
  withStyles,
  WithStyles,
  Theme,
  Toolbar,
  Typography,
  Button
} from "@material-ui/core";
import { LinkContainer } from "react-router-bootstrap";
import { Mic, Edit, Public, Person } from "@material-ui/icons";
import Auth from "../../auth/Auth";

/**
 * CSS Styles of the browser
 */
const styles = (theme: Theme) =>
  createStyles({
    nav: {
      background: theme.palette.primary.main
    },
    navItem: {
      color: "#ffffff99",
      "&$selected": {
        color: "#ffffffff !important"
      }
    },
    selected: {
      color: "#ffffffff"
    }
  });

interface INavigationState {
  selectedNavItem: number;
}

interface INavigationProps extends WithStyles<typeof styles> {
  isMobile: boolean;
  auth: Auth;
}

export class Navigation extends Component<INavigationProps, INavigationState> {
  constructor(props: INavigationProps) {
    super(props);

    this.state = {
      selectedNavItem: 0
    };
  }

  handleChange = (event: any, selectedNavItem: any) => {
    this.setState({ selectedNavItem });
    switch (selectedNavItem as number) {
    }
  };

  render() {
    const { selectedNavItem } = this.state;
    const { classes, isMobile } = this.props;
    const { isAuthenticated, logout } = this.props.auth;

    return (
      <div>
        {/* Top Bar */}
        <AppBar position="static">
          <Toolbar variant={isMobile ? "regular" : "dense"}>
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              style={{ flexGrow: 1 }}
            >
              Vocalia Create
            </Typography>
            {isAuthenticated() && (
              <Button onClick={() => logout()} color="inherit">
                Logout
              </Button>
            )}
          </Toolbar>
        </AppBar>
        {/* Content */}
        {this.props.children}
        {/* Bottom Bar */}
        <AppBar
          position="fixed"
          style={{ top: "auto", bottom: 0 }}
          color="primary"
        >
          <BottomNavigation
            value={selectedNavItem}
            onChange={this.handleChange}
            className={classes.nav}
          >
            <LinkContainer to="/social">
              <BottomNavigationAction
                className={classes.navItem}
                classes={{ selected: classes.selected }}
                label="Social"
                icon={<Person />}
              />
            </LinkContainer>
            <LinkContainer to="/record">
              <BottomNavigationAction
                className={classes.navItem}
                classes={{ selected: classes.selected }}
                label="Record"
                icon={<Mic />}
              />
            </LinkContainer>
            <LinkContainer to="/edit">
              <BottomNavigationAction
                className={classes.navItem}
                classes={{ selected: classes.selected }}
                label="Edit"
                icon={<Edit />}
              />
            </LinkContainer>
            <LinkContainer to="/publish">
              <BottomNavigationAction
                className={classes.navItem}
                classes={{ selected: classes.selected }}
                label="Publish"
                icon={<Public />}
              />
            </LinkContainer>
          </BottomNavigation>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(Navigation);
