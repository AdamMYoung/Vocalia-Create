import React, { Component } from "react";
import { Tabs, Tab, AppBar } from "@material-ui/core";
import Feed from "./Feed";
import Profile from "./Profile";

interface ISocialState {
  selectedTab: number;
}

interface ISocialProps {
  isMobile: boolean;
}

export default class Social extends Component<ISocialProps, ISocialState> {
  constructor(props: ISocialProps) {
    super(props);

    this.state = {
      selectedTab: 0
    };
  }

  handleChange = (event: any, selectedTab: number): any => {
    this.setState({ selectedTab });
  };

  render() {
    const { isMobile } = this.props;
    const { selectedTab } = this.state;

    var currentTab = null;
    switch (selectedTab) {
      case 0:
        currentTab = <Feed />;
        break;
      case 1:
        currentTab = <Profile />;
        break;
    }

    return (
      <div>
        <AppBar position="static" style={{ background: "#fff" }}>
          <Tabs
            value={this.state.selectedTab}
            indicatorColor="primary"
            textColor="primary"
            onChange={this.handleChange}
            variant="fullWidth"
          >
            <Tab label="Feed" />
            <Tab label="Profile" />
          </Tabs>
        </AppBar>
        {currentTab}
      </div>
    );
  }
}
