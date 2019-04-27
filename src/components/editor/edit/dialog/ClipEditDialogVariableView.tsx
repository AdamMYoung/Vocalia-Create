import React, { Component } from "react";
import { IconButton, TextField } from "@material-ui/core";
import { Remove, Add } from "@material-ui/icons";

interface IProps {
  value: number;
  valueName?: string;
  onValueChanged: (value: number) => void;
}

export default class ClipEditDialogVariableView extends Component<IProps> {
  render() {
    const { value, valueName, onValueChanged } = this.props;

    return (
      <div style={{ display: "flex" }}>
        <IconButton onClick={() => onValueChanged(value - 1)}>
          <Remove />
        </IconButton>
        <TextField
          inputProps={{
            style: { textAlign: "center" }
          }}
          margin="normal"
          variant="outlined"
          value={value + " " + valueName}
        />
        <IconButton onClick={() => onValueChanged(value + 1)}>
          <Add />
        </IconButton>
      </div>
    );
  }
}
