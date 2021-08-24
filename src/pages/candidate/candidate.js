import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import CandidateList from "./candidateList";
import CandidateDetail from "./candidateDetail";
import CandidateAdd from "./candidateAdd";
import "./candidate.less";

export default class Candidate extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/candidate" component={CandidateList} />
        <Route path="/candidate/detail" component={CandidateDetail} />
        <Route path="/candidate/add" component={CandidateAdd} />
        <Redirect to="/candidate" />
      </Switch>
    );
  }
}
