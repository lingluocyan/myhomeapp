import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css'
// 导入外界字体图标
import './assets/fonts/iconfont.css'
// 导入登录页
import Login from './login'
// 导入首页
import Main from './module/main'
// 导入组件库的样式
import 'semantic-ui-css/semantic.min.css'
// 导入验证是否登录的模块
import AuthCheck from './Auth'
// 导入axios
import Axios from 'axios'
// 导入公共配置文件
import { baseURL } from './common'
// 配置axios的基准路径
Axios.defaults.baseURL = baseURL
// 统一处理接口的token（axios请求拦截器）
Axios.interceptors.request.use(
  function(config) {
    if (!config.url.endsWith('/')) {
      config.headers.Authorization = sessionStorage.getItem('token')
    }
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)
// axios响应拦截器
Axios.interceptors.response.use(
  function(response) {
    // response是axios包装之后的数据
    return response.data
  },
  function(error) {
    return Promise.reject(error)
  }
)

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <AuthCheck path="/home" component={Main} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
