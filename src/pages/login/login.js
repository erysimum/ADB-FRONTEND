import React, { Component } from "react";
import "./login.less";
import logo from "../../assets/images/logo.jpg";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { reqLogin } from "../../api";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { setCurrentUser, setToken } from "../../redux/user/user.actions";
import storageUtils from "../../utils/storageUtils";
import { selectToken } from "../../redux/user/user.selectors";
import { Redirect } from "react-router-dom";

class Login extends Component {
  onFinish = async (values) => {
    // console.log("Received values of form: ", values);
    const { username, password } = values;
    const { setCurrentUser } = this.props;

    // result = {success: true, data: {token, user}, msg: "success"} / {success: false, msg: "...error"}
    const result = await reqLogin(username, password);

    if (result.success) {
      message.success("Login successfully");
      // setToken(result.data.token);
      setCurrentUser({ username: result.data.user });
      storageUtils.saveToken(result.data.token);
      this.props.history.replace("/");
    } else {
      message.error(result.msg);
    }
  };

  validatePassword = (rule, value, callback) => {
    !value
      ? callback("Please input your Password!")
      : value.length < 4
      ? callback("Password should not be less than 4 characters!")
      : value.length > 12
      ? callback("Password should not be more than 12 characters!")
      : !/^[a-zA-Z0-9_]+$/.test(value)
      ? callback(
          "Password should only include characters, number or underscore!"
        )
      : callback();
  };
  render() {
    if (this.props.token.length > 0) {
      return <Redirect to="/" />;
    }
    return (
      <div className="login">
        <div className="login-header">
          <img src={logo} alt="logo" />
          <h1>Applicant Tracking System</h1>
        </div>
        <section className="login-content">
          <h2>User Login</h2>
          <Form
            name="normal_login"
            className="login-form"
            onFinish={this.onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "Please input your Username!",
                },
                {
                  min: 4,
                  message: "Username should not be less than 4 characters!",
                },
                {
                  max: 12,
                  message: "Username should not be more than 12 characters!",
                },
                {
                  pattern: /^[a-zA-Z0-9_]+$/,
                  message:
                    "Username should only include characters, number or underscore!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  validator: this.validatePassword,
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <br />
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  setToken: (token) => dispatch(setToken(token)),
});

const mapStateToProps = createStructuredSelector({
  token: selectToken,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
