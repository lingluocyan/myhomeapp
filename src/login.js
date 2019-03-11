import React from 'react'
import axios from 'axios'
import { Button, Icon, Form, Divider } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

// 导入需要的css样式
import './login.css'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  handleUsername = event => {
    this.setState({
      username: event.target.value
    })
  }

  handlePassword = event => {
    this.setState({
      password: event.target.value
    })
  }

  submit = async () => {
    // 发起post请求获取Token登录
    const res = await axios.post('users/login', {
      uname: this.state.username,
      pwd: this.state.password
    })
    // 本地存储token
    sessionStorage.setItem('token', res.data.data.token)
    // 编程式导航跳转到其他页面
    let {history} = this.props
    history.push('/home')
  }

  render() {
    return (
      <div className="login-container">
        <div className="login-logo">
          <Icon name="diamond" color="teal" size="massive" />
        </div>
        <div className="login-form">
          <Form>
            <Form.Input
              icon="user"
              size="big"
              required
              onChange={this.handleUsername}
              placeholder="请输入用户名"
              iconPosition="left"
              value={this.state.username}
            />
            <Form.Input
              onChange={this.handlePassword}
              required
              iconPosition="left"
              icon="lock"
              size="big"
              type="password"
              placeholder="请输入密码"
              value={this.state.password}
            />
            <Button onClick={this.submit} history={'true'} primary fluid>
              登录
            </Button>
            <Divider horizontal>.....</Divider>
            <div className="login-third">
              <Icon name="twitter" color="black" size="big" />
              <Icon name="qq" color="black" size="big" />
            </div>
          </Form>
        </div>
      </div>
    )
  }
}

export default withRouter(Login)
