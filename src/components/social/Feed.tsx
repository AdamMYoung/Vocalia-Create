import React, { Component } from "react";
import { Listen } from "../../utility/types";
import { Typography, Grid, Paper } from "@material-ui/core";

interface IFeedProps {
  feed: Listen[];
  userSelected: (userUid: string) => void;
}

export default class Feed extends Component<IFeedProps> {
  render() {
    const { feed, userSelected } = this.props;

    return (
      <div style={{ margin: 16 }}>
        {feed ? (
          <Grid container justify="center" alignItems="center">
            {feed.map(f => (
              <Paper>
                <Grid container>
                  <Grid item xs={4}>
                    <a onClick={() => userSelected(f.userUID)}>
                      <p>{f.userName}</p>
                    </a>
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
        )}
      </div>
    );
  }
}
