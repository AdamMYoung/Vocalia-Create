import React, { Component } from "react";
import { PublishedEpisode } from "../../../../models/publishing/PublishedEpisode";
import { List, ListItemText, ListItem, Typography } from "@material-ui/core";

interface IProps {
  episodes: PublishedEpisode[];
}

export default class PodcastEpisodeDialogView extends Component<IProps> {
  render() {
    const { episodes } = this.props;

    return (
      <div>
        <Typography variant="h6">Episodes</Typography>
        <List>
          {episodes.map(e => (
            <ListItem key={e.uid}>
              <ListItemText primary={e.title} secondary={e.publishDate} />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}
