import React, { Component } from "react";
import {
  Typography,
  IconButton,
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core";
import { Share } from "@material-ui/icons";
import { Podcast } from "../../../../utility/types";

/**
 * CSS Styles of the browser
 */
const styles = (theme: Theme) =>
  createStyles({
    root: { display: "flex", maxHeight: 200 },
    text: {
      display: "inline",
      overflowY: "scroll",
      paddingLeft: 15,
      maxHeight: 250
    },
    description: {
      maxHeight: 200
    },
    content: {
      display: "flex",
      flexGrow: 1
    },
    image: {
      height: 80,
      width: 80
    }
  });

interface IProps extends WithStyles<typeof styles> {
  podcast: Podcast;
  onInvite: () => void;
}

class PodcastInfoView extends Component<IProps> {
  render() {
    const { classes, podcast, onInvite } = this.props;

    return (
      <Typography component={"span"}>
        <div className={classes.root}>
          <div className={classes.content}>
            <div style={{ paddingTop: 16 }}>
              <img className={classes.image} src={podcast.imageUrl} />
            </div>

            <div className={classes.text}>
              <h2>{podcast.name}</h2>
              <p className={classes.description}>{podcast.description}</p>
            </div>
          </div>

          <div>
            <IconButton onClick={onInvite}>
              <Share />
            </IconButton>
          </div>
        </div>
      </Typography>
    );
  }
}

export default withStyles(styles)(PodcastInfoView);
