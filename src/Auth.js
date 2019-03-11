import React from 'react'
import { Route, Redirect } from 'react-router-dom'

// 验证是否登录
class AuthCheck extends React.Component {
  render() {
    let { path, component: Component } = this.props
    let isLogin = sessionStorage.getItem('token') ? true : false
    return (
      <Route
        path={path}
        render={() => {
          let info = <Component />
          if (!isLogin) {
            info = <Redirect to="/" />
          }
          return info
        }}
      />
    )
  }
}

export default AuthCheck
