import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import searchHome from "./searchHome";
import searchDetail from "./searchDetail";

export default class Search extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/search" component={searchHome} />
        <Route path="/search/detail" component={searchDetail} />
        <Redirect to="/search" />
      </Switch>
    );
  }
}
