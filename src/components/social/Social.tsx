import React, { Component } from "react";
import { Tabs, Tab } from "@material-ui/core";
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
        <Tabs
          value={this.state.selectedTab}
          indicatorColor="primary"
          textColor="primary"
          centered={!isMobile}
          onChange={this.handleChange}
          variant={isMobile ? "fullWidth" : "standard"}
        >
          <Tab label="Feed" />
          <Tab label="Profile" />
        </Tabs>
        {currentTab}
      </div>
    );
  }
}
