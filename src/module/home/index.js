import React from 'react'
import {
  Input,
  Grid,
  Icon,
  Item,
  Button,
  Dimmer,
  Loader
} from 'semantic-ui-react'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import './index.css'
import axios from 'axios'
import { baseURL } from '../../common'

// 菜单组件
function Menu(props) {
  const { menuData } = props
  let menuInfo = menuData.map(item => {
    return (
      <Grid.Column key={item.id}>
        <div className="home-menu-item">
          <Icon name="home" size="big" />
        </div>
        <div>{item.menu_name}</div>
      </Grid.Column>
    )
  })
  return (
    <Grid padded divided>
      <Grid.Row columns={4}>{menuInfo}</Grid.Row>
    </Grid>
  )
}

// 资讯组件
function Info(props) {
  const { infoData } = props
  const infoContent = infoData.map(item => {
    return (
      <Item.Header key={item.id}>
        <span>限购 ●</span>
        <span>{item.info_title}</span>
      </Item.Header>
    )
  })
  return (
    <div className="home-msg">
      <Item.Group unstackable>
        <Item className="home-msg-img">
          <Item.Image size="tiny" src={baseURL + 'public/zixun.png'} />
          <Item.Content verticalAlign="top">
            {infoContent}
            <div className="home-msg-more">
              <Icon name="angle right" size="big" />
            </div>
          </Item.Content>
        </Item>
      </Item.Group>
    </div>
  )
}

// 问答组件
function Faq(props) {
  let { faqData } = props
  let faqContent = faqData.map(item => {
    let arr = item.question_tag.split(',')
    let btns = arr.map((item, index) => {
      return (
        <Button key={index} basic color="green" size="mini">
          {item}
        </Button>
      )
    })
    return (
      <li key={item.question_id}>
        <div>
          <Icon name="question circle outline" />
          <span>{item.question_name}</span>
        </div>
        <div>
          {btns}
          <div>
            {item.atime} ● <Icon name="comment alternate outline" /> {item.qnum}
          </div>
        </div>
      </li>
    )
  })
  return (
    <div className="home-ask">
      <div className="home-ask-title">好客问答</div>
      <ul>{faqContent}</ul>
    </div>
  )
}

// 房屋列表组件
function House(props) {
  let { houseData } = props
  let newHouse = []
  let oldHouse = []
  let hireHouse = []
  houseData.forEach(item => {
    let itemContent = (
      <Item key={item.id}>
        <Item.Image src={baseURL + 'public/home.png'} />
        <Item.Content>
          <Item.Header>{item.home_name}</Item.Header>
          <Item.Meta>
            <span className="cinema">{item.home_desc}</span>
          </Item.Meta>
          <Item.Description>
            {item.home_tags.split(',').map((tag, index) => {
              return (
                <Button key={index} basic color="green" size="mini">
                  {tag}
                </Button>
              )
            })}
          </Item.Description>
          <Item.Description>{item.home_price}</Item.Description>
        </Item.Content>
      </Item>
    )
    // 根据item.home_type区分是哪种房源信息
    if (item.home_type === 1) {
      newHouse.push(itemContent)
    } else if (item.home_type === 2) {
      oldHouse.push(itemContent)
    } else {
      hireHouse.push(itemContent)
    }
  })
  return (
    <div>
      <div>
        <div className="home-hire-title">最新开盘</div>
        <Item.Group divided unstackable>
          {newHouse}
        </Item.Group>
      </div>
      <div>
        <div className="home-hire-title">二手精选</div>
        <Item.Group divided unstackable>
          {oldHouse}
        </Item.Group>
      </div>
      <div>
        <div className="home-hire-title">组一个家</div>
        <Item.Group divided unstackable>
          {hireHouse}
        </Item.Group>
      </div>
    </div>
  )
}

// Home组件
class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      swipe: [], // 轮播图数据
      menu: [], // 菜单数据
      info: [], // 资讯数据
      faq: [], // 问答数据
      house: [], // 房源数据
      loadFlag: true // 数据加载状态位
    }
  }

  // 封装数据加载的功能函数
  loadData = (pathName, dataName) => {
    // return一个Promise对象,then为成功后的数据
    return axios.post(pathName).then(res => {
      // return 获得的数据
      return res.data.list
    })
  }

  // 组件渲染后的生命周期函数
  componentDidMount = () => {
    // const swipe = this.loadData('/homes/swipe','swipe')
    // 请求轮播图数据
    let swipe = this.loadData('/homes/swipe')
    // 请求菜单数据
    let menu = this.loadData('/homes/menu')
    // 请求资讯数据
    let info = this.loadData('/homes/info')
    // 请求问答数据
    let faq = this.loadData('homes/faq')
    // 请求房源数据
    let house = this.loadData('homes/house')
    // Promise.all的作用，发送所有的异步请求，并且所有的结果返回之后触发then
    Promise.all([swipe, menu, info, faq, house]).then(res => {
      this.setState(
        {
          swipe: res[0],
          menu: res[1],
          info: res[2],
          faq: res[3],
          house: res[4]
        },
        () => {
          this.setState({
            loadFlag: false
          })
        }
      )
    })
  }

  render() {
    return (
      <div className="home-container">
        {/*搜索栏部分 */}
        <div className="home-topbar">
          <Input fluid icon="search" placeholder="Search..." />
        </div>
        {/*首页内容部分 */}
        <div className="home-content">
          {/*遮罩效果*/}
          <Dimmer inverted active={this.state.loadFlag} page>
            <Loader>Loading</Loader>
          </Dimmer>
          {/*轮播图部分 */}
          <ImageGallery
            showThumbnails={false}
            showFullscreenButton={false}
            showPlayButton={false}
            items={this.state.swipe}
          />
          {/*菜单*/}
          <div>
            <Menu menuData={this.state.menu} />
          </div>
          {/*资讯*/}
          <div>
            <Info infoData={this.state.info} />
          </div>
          {/*问答*/}
          <div>
            <Faq faqData={this.state.faq} />
          </div>
          {/*房源*/}
          <div>
            <House houseData={this.state.house} />
          </div>
        </div>
      </div>
    )
  }
}

export default Home
