import React, { Component } from "react";
import {
  Card,
  Fade,
  Typography,
  CardContent,
  CardMedia,
  CardActionArea
} from "@material-ui/core";

interface IEntryProps {
  name: string;
  uid: string;
  description: string | null;
  image: string | null;
  onClick: (uid: string) => void;
}

interface IEntryState {
  isLoaded: boolean;
}

export default class RecordEntry extends Component<IEntryProps, IEntryState> {
  constructor(props: IEntryProps) {
    super(props);

    this.state = {
      isLoaded: false
    };
  }
  render() {
    const { isLoaded } = this.state;
    const { name, description, image, uid, onClick } = this.props;

    return (
      <Card
        onClick={() => onClick(uid)}
        style={{ margin: 4, flex: "0 0 auto" }}
      >
        <CardActionArea style={{ width: 180, height: 150 }}>
          {image && (
            <Fade in={isLoaded} timeout={300}>
              <CardMedia
                style={{ height: 100 }}
                image={image}
                onLoad={() => this.setState({ isLoaded: true })}
              />
            </Fade>
          )}
          <CardContent>
            <Typography variant="h5" component="h2">
              {name}
            </Typography>
            <Typography component="p" style={{ overflowY: "hidden" }}>
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
}
