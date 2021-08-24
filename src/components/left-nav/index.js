import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Menu } from "antd";

import logo from "../../assets/images/logo.jpg";
import menuList from "../../config/menuConfig";
import "./index.less";

const { SubMenu } = Menu;

class LeftNav extends Component {
  getMenuNodes = (menuList) => {
    const path = this.props.location.pathname;

    return menuList.map((item) => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key} icon={<item.icon />}>
            <Link to={item.key}>{item.title}</Link>
          </Menu.Item>
        );
      } else {
        const child_Item = item.children.find((c_Item) => c_Item.key === path);
        if (child_Item) {
          this.openKey = item.key;
        }

        return (
          <SubMenu key={item.key} icon={<item.icon />} title={item.title}>
            {this.getMenuNodes(item.children)}
          </SubMenu>
        );
      }
    });
  };

  menuNodes = this.getMenuNodes(menuList);

  render() {
    const path = this.props.location.pathname;
    const openKey = this.openKey;
    return (
      <div>
        <div className="left-nav">
          <Link to="/" className="left-nav-logo">
            <img src={logo} alt="logo" />
            <h1>ADBS ATS</h1>
          </Link>
        </div>

        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[path]}
          defaultOpenKeys={[openKey]}
        >
          {this.menuNodes}
        </Menu>
      </div>
    );
  }
}

export default withRouter(LeftNav);
