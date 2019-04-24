import React, { Component } from "react";
import { UnassignedPodcast } from "../../../models/publishing/UnassignedPodcast";
import { UnassignedEpisode } from "../../../models/publishing/UnassignedEpisode";
import {
  Grid,
  Tabs,
  Tab,
  AppBar,
  Toolbar,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  List,
  ListItem,
  ListItemText
} from "@material-ui/core";

interface IProps {
  podcasts: UnassignedPodcast[];
  episodes: UnassignedEpisode[];

  onPodcastSelected: (podcast: UnassignedPodcast) => void;
  onEpisodeSelected: (podcast: UnassignedEpisode) => void;
}

export default class UnassignedView extends Component<IProps> {
  render() {
    const {
      podcasts,
      episodes,
      onPodcastSelected,
      onEpisodeSelected
    } = this.props;

    const podcastEntries = podcasts.map(p => (
      <Card
        style={{ width: 160, height: 160, margin: 4 }}
        onClick={() => onPodcastSelected(p)}
      >
        <CardActionArea>
          <CardMedia component="img" image={p.imageUrl} />
        </CardActionArea>
      </Card>
    ));

    const episodeEntries = (
      <List>
        {episodes.map(e => (
          <ListItem onClick={() => onEpisodeSelected(e)}>
            <ListItemText>{e.name}</ListItemText>
          </ListItem>
        ))}
      </List>
    );

    return (
      <Grid container>
        <Typography variant="h4">Unpublished</Typography>
        <Grid item xs={12}>
          {podcasts.length > 0 && (
            <div>
              <Typography variant="h6">Podcasts</Typography>
              {podcastEntries}
            </div>
          )}
        </Grid>
        <Grid item xs={12} />
        {episodes.length > 0 && (
          <div>
            <Typography variant="h6">Episodes</Typography>
            {episodeEntries}
          </div>
        )}
      </Grid>
    );
  }
}
