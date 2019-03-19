import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { MuiPickersUtilsProvider } from "material-ui-pickers";

import DateFnsUtils from "@date-io/date-fns";

ReactDOM.render(
  <BrowserRouter>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <App />
    </MuiPickersUtilsProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
