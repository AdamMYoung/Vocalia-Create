import React, { Component } from "react";
import { Listen } from "../../utility/types";
import { Typography, Grid, Paper } from "@material-ui/core";

interface IFeedProps {
  feed: Listen[];
}

export default class Feed extends Component<IFeedProps> {
  render() {
    const { feed } = this.props;

    return feed ? (
      <Grid container justify="center" alignItems="center">
        {feed.map(f => (
          <Paper>
            <Grid container>
              <Grid item xs={4}>
                <p>{f.userName}</p>
              </Grid>

              <Grid item xs={4}>
                <a href={f.episodeUrl}>{f.episodeName}</a>
              </Grid>

              <Grid item xs={4}>
                <p>{f.date}</p>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </Grid>
    ) : (
      <Grid container justify="center" alignItems="center">
        <Typography>No items in your feed.</Typography>
      </Grid>
    );
  }
}
