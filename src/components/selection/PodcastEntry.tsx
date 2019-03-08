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
      [theme.breakpoints.down("sm")]: {
        height: 160,
        width: 160,
        margin: 3
      },
      [theme.breakpoints.up("md")]: {
        height: 200,
        width: 200,
        margin: 4
      }
    }
  });

/**
 * Properties for a podcast entry.
 */
interface IEntryProps extends WithStyles<typeof styles> {
  podcast: Podcast;
}

interface IEntryState {
  isLoaded: boolean;
}

/**
 * Single podcast entry for display in the browser.
 * @param props Properties belonging to the podcast entry.
 */
class PodcastEntry extends Component<IEntryProps, IEntryState> {
  constructor(props: IEntryProps) {
    super(props);

    this.state = {
      isLoaded: false
    };
  }

  render() {
    const { classes, podcast } = this.props;
    const { isLoaded } = this.state;

    const Entry = (
      <Card className={classes.paper}>
        <CardActionArea>
          <Fade in={isLoaded} timeout={300}>
            <CardMedia
              component="img"
              image={podcast.imageUrl}
              onLoad={() => this.setState({ isLoaded: true })}
            />
          </Fade>
          <CardContent>
            <Typography variant="h6">{podcast.name}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );

    return <LinkContainer to={podcast.uid}>{Entry}</LinkContainer>;
  }
}

export default withStyles(styles)(PodcastEntry);
