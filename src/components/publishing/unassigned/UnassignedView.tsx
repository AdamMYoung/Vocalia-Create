import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography
} from "@material-ui/core";
import React, { Component } from "react";
import { UnassignedEpisode } from "../../../models/publishing/UnassignedEpisode";
import { UnassignedPodcast } from "../../../models/publishing/UnassignedPodcast";

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
        style={{
          width: 160,
          height: 160,
          margin: 4,
          boxShadow: "0px 0px 10px 2px #3f51b5"
        }}
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
        style={{
          width: 160,
          height: 160,
          margin: 4,
          boxShadow: "0px 0px 10px 2px #3f51b5"
        }}
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
        <Grid item xs={12}>
          {episodes.length > 0 && (
            <div>
              <Typography variant="h6">Unpublished Episodes</Typography>
              <Grid container>{episodeEntries}</Grid>
            </div>
          )}
        </Grid>
        <Grid item xs={12}>
          {podcasts.length > 0 && (
            <div>
              <Typography variant="h6">Unpublished Podcasts</Typography>
              <Grid container>{podcastEntries}</Grid>
            </div>
          )}
        </Grid>
      </Grid>
    );
  }
}
