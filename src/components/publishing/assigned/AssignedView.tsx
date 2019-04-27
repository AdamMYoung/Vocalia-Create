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
  CardContent,
  Toolbar
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
        <Toolbar>
          <Typography variant="h6">Published</Typography>
        </Toolbar>

        <Grid item xs={12}>
          {podcasts.length > 0 ? (
            <div>
              <Typography variant="h6">Podcasts</Typography>
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
          ) : (
            <Typography>There's nothing here...</Typography>
          )}
        </Grid>
      </Grid>
    );
  }
}
