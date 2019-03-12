import React, { Component } from "react";
import { Podcast } from "../../utility/types";
import { LinkContainer } from "react-router-bootstrap";
import {
  Card,
  createStyles,
  Theme,
  withStyles,
  WithStyles,
  Fade,
  CardMedia,
  CardActionArea,
  CardContent,
  Typography
} from "@material-ui/core";

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
    }
  });

/**
 * Properties for a podcast entry.
 */
interface IEntryProps extends WithStyles<typeof styles> {
  podcast: Podcast;
  onSelected: () => void;
}

interface IEntryState {}

/**
 * Single podcast entry for display in the browser.
 * @param props Properties belonging to the podcast entry.
 */
class PodcastEntry extends Component<IEntryProps, IEntryState> {
  constructor(props: IEntryProps) {
    super(props);
  }

  render() {
    const { classes, podcast, onSelected } = this.props;

    return (
      <Card className={classes.paper} onClick={onSelected}>
        <CardActionArea>
          <CardMedia
            component="img"
            image={podcast.imageUrl}
            className={classes.image}
          />
        </CardActionArea>
        <CardContent>
          <Typography variant="h6" style={{ fontSize: 14 }}>
            {podcast.name}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(PodcastEntry);
