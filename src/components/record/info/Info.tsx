import React, { Component } from "react";
import { Podcast } from "../../../utility/types";
import { Toolbar, Typography, Divider } from "@material-ui/core";

interface IInfoProps {
  podcast: Podcast;
  isMobile: boolean;
}

export default class Info extends Component<IInfoProps> {
  render() {
    const { podcast, isMobile } = this.props;

    return (
      <div>
        <Toolbar variant={isMobile ? "regular" : "dense"}>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            style={{ flexGrow: 1 }}
          >
            {podcast.name}
          </Typography>
        </Toolbar>
        <Divider />
        <div style={{ display: "flex", margin: 8 }}>
          <img
            style={{ height: 100, width: 100, margin: 8 }}
            src={podcast.imageUrl}
          />
          <Typography style={{ margin: 8 }}>{podcast.description}</Typography>
        </div>
      </div>
    );
  }
}
