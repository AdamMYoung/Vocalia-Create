import React, { Component } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText
} from "@material-ui/core";
import { Redirect } from "react-router";

interface IProps {
  redirectPath: string;
}

interface IState {
  seconds: number;
}

export default class SessionEndDialog extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      seconds: 5
    };

    setInterval(this.decreaseTimer, 1000);
  }

  /**
   * Decreses the timer until it reaches zero, then redirects.
   */
  private decreaseTimer = () => {
    const { seconds } = this.state;

    this.setState({ seconds: seconds - 1 });
  };

  render() {
    const { seconds } = this.state;
    const { redirectPath } = this.props;

    return (
      <Dialog open>
        <DialogTitle>Session Finished</DialogTitle>
        <DialogContent>
          <DialogContentText style={{ textAlign: "center" }}>
            {"Closing in " + seconds}
          </DialogContentText>
        </DialogContent>
        {seconds == 0 && <Redirect to={redirectPath} />}
      </Dialog>
    );
  }
}
