import { List, ListItem, ListItemText, Typography } from "@material-ui/core";
import React, { Component } from "react";
import TimeAgo from "react-timeago";
import { PublishedEpisode } from "../../../../models/publishing/PublishedEpisode";

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
              <ListItemText
                primary={e.title}
                secondary={<TimeAgo date={e.publishDate} />}
              />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}
