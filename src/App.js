import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.less";
import Admin from "./pages/admin/admin";
import Login from "./pages/login/login";
import { getCandidates } from "./redux/actions/candidate";
import schedule from 'node-schedule';
import { getJobs } from "./redux/actions/job";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCandidates());
    dispatch(getJobs());
  }, [dispatch]);

  schedule.scheduleJob({ rule: '20 30 08,16 * * *', tz: 'Australia/Melbourne' }, () => {
    // schedule.scheduleJob({ rule: '20 11,30 08,15 * * *', tz: 'Australia/Melbourne' }, () => {
    dispatch(getCandidates());
  });

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login}></Route>
        <Route path="/" component={Admin}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
