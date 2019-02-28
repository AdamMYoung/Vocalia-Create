import React, { Component } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  AppBar,
  createStyles,
  withStyles,
  WithStyles,
  Theme
} from "@material-ui/core";
import { LinkContainer } from "react-router-bootstrap";
import { RecordVoiceOver, Edit, Public } from "@material-ui/icons";

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
    const { classes } = this.props;

    return (
      <div>
        {this.props.children}
        <AppBar
          position="fixed"
          style={{ top: "auto", bottom: 0 }}
          color="primary"
        >
          <BottomNavigation
            value={selectedNavItem}
            onChange={this.handleChange}
            showLabels
            className={classes.nav}
          >
            <LinkContainer to="/record">
              <BottomNavigationAction
                className={classes.navItem}
                classes={{ selected: classes.selected }}
                label="Record"
                icon={<RecordVoiceOver />}
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
