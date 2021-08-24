import { Layout } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import Header from "../../components/header";
import LeftNav from "../../components/left-nav";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import Candidate from "../candidate/candidate";
import Search from "../candidate_search/search";
import Home from "../home/home";
import JobList from "../jobList/jobList";
import Role from "../role/role";


const { Footer, Sider, Content } = Layout;

class Admin extends Component {
  render() {
    // const user = this.props.currentUser.username;
    // if (!user) {
    //   return <Redirect to="/login" />;
    // }
    return (
      <Layout style={{ height: "100%" }}>
        <Sider>
          <LeftNav />
        </Sider>
        <Layout>
          <Header>Header</Header>
          <Content style={{ margin: 20, backgroundColor: "#fff" }}>
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/search" component={Search} />
              <Route path="/joblist" component={JobList} />
              <Route path="/candidate" component={Candidate} />
              <Route path="/role" component={Role} />
              <Redirect to="/home" />
            </Switch>
          </Content>
          <Footer style={{ textAlign: "center", color: "#cccccc" }}>Aussie Digital Business System</Footer>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(Admin);
