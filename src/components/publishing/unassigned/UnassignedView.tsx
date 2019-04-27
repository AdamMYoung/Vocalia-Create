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
  ListItemText,
  CardContent
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
        key={p.uid}
        style={{ width: 160, height: 160, margin: 4 }}
        onClick={() => onPodcastSelected(p)}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            style={{ width: 160, height: 160 }}
            image={p.imageUrl}
          />
        </CardActionArea>
      </Card>
    ));

    const episodeEntries = episodes.map(e => (
      <Card
        key={e.uid}
        style={{ width: 160, height: 160, margin: 4 }}
        onClick={() => onEpisodeSelected(e)}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            style={{ width: 160, height: 160 }}
            image={e.imageUrl}
          />
        </CardActionArea>
        <CardContent>
          <Typography>{e.date}</Typography>
        </CardContent>
      </Card>
    ));

    return (
      <Grid container>
        <Toolbar>
          <Typography variant="h6">Unassigned</Typography>
        </Toolbar>
        <Grid item xs={12}>
          {podcasts.length > 0 && (
            <div>
              <Typography variant="h6">Podcasts</Typography>
              <Grid container>{podcastEntries}</Grid>
            </div>
          )}
        </Grid>
        <Grid item xs={12} />
        {episodes.length > 0 && (
          <div>
            <Typography variant="h6">Episodes</Typography>
            <Grid container>{episodeEntries}</Grid>
          </div>
        )}
        {episodes.length == 0 && podcasts.length == 0 && (
          <Typography>There's nothing here...</Typography>
        )}
      </Grid>
    );
  }
}
