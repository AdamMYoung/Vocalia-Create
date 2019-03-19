import React, { Component } from "react";
import {
  withStyles,
  Theme,
  createStyles,
  WithStyles,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography
} from "@material-ui/core";
import { Podcast } from "../../../../utility/types";

/**
 * CSS Styles of the browser
 */
const styles = (theme: Theme) =>
  createStyles({
    paper: {
      [theme.breakpoints.down("xs")]: {
        width: 120,
        margin: 3
      },
      [theme.breakpoints.up("sm")]: {
        width: 180,
        margin: 4
      }
    },
    image: {
      [theme.breakpoints.down("xs")]: {
        height: 120
      },
      [theme.breakpoints.up("sm")]: {
        height: 180
      }
    },
    cardText: {
      fontSize: 14,
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis"
    }
  });

interface IProps extends WithStyles<typeof styles> {
  podcast: Podcast;
  onPodcastSelected: (podcast: Podcast) => void;
}

class SelectionEntryView extends Component<IProps> {
  render() {
    const { classes, onPodcastSelected, podcast } = this.props;

    return (
      <Card
        className={classes.paper}
        onClick={() => onPodcastSelected(podcast)}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            image={podcast.imageUrl}
            className={classes.image}
          />

          <CardContent>
            <Typography variant="h6" className={classes.cardText}>
              {podcast.name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
}

export default withStyles(styles)(SelectionEntryView);
