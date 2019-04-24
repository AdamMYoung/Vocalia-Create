import React, { Component } from "react";
import { PublishedPodcast } from "../../../models/publishing/PublishedPodcast";
import {
  Grid,
  Tabs,
  Tab,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent
} from "@material-ui/core";

interface IProps {
  podcasts: PublishedPodcast[];
  onPodcastSelected: (podcast: PublishedPodcast) => void;
}

export default class AssignedView extends Component<IProps> {
  render() {
    const { podcasts, onPodcastSelected } = this.props;

    return (
      <Grid container>
        <Typography variant="h4">Published</Typography>
        {podcasts.map(p => (
          <Card
            style={{ width: 160, height: 160, margin: 4 }}
            onClick={() => onPodcastSelected(p)}
          >
            <CardActionArea>
              <CardMedia component="img" image={p.imageUrl} />
            </CardActionArea>
          </Card>
        ))}
      </Grid>
    );
  }
}
