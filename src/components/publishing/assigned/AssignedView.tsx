import {
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Typography
} from "@material-ui/core";
import React, { Component } from "react";
import { PublishedPodcast } from "../../../models/publishing/PublishedPodcast";

interface IProps {
  podcasts: PublishedPodcast[];
  onPodcastSelected: (podcast: PublishedPodcast) => void;
}

export default class AssignedView extends Component<IProps> {
  render() {
    const { podcasts, onPodcastSelected } = this.props;

    return (
      <Grid container>
        <Grid item xs={12}>
          {podcasts.length > 0 && (
            <div>
              <Typography variant="h6">Published Episodes</Typography>
              <Grid container>
                {podcasts.map(p => (
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
                ))}
              </Grid>
            </div>
          )}
        </Grid>
      </Grid>
    );
  }
}
