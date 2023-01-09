import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {Link} from 'react-router-dom'

import './index.css'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Header from '../Header'
import HeaderSm from '../HeaderSm'
import Footer from '../Footer'

import SliderCard from '../SliderCard'
import SliderCardSm from '../SliderCardSm'

class Home extends Component {
  state = {dataState: 'initial', Data: []}

  componentDidMount() {
    this.getTopRatedBooksData()
  }

  getTopRatedBooksData = async () => {
    this.setState({dataState: 'loading'})
    const JWT = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const options = {
      method: 'GET',
      headers: {Authorization: `Beaber ${JWT}`},
    }
    const response = await fetch(url, options)
    const fetchedData = await response.json()
    if (response.ok) {
      const {books} = fetchedData
      const updatedBooks = books.map(each => ({
        authorName: each.author_name,
        coverPic: each.cover_pic,
        id: each.id,
        title: each.title,
      }))
      this.setState({dataState: 'success', Data: updatedBooks})
    } else {
      this.setState({dataState: 'failure'})
    }
  }

  renderLoading = () => (
    <div id="loader" className="loader-con-home">
      <div className="products-loader-container">
        <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
      </div>
    </div>
  )

  renderSuccess = () => {
    const {Data} = this.state
    const settings = {
      dots: false,
      slidesToShow: 4,
      slidesToScroll: 1,
    }
    return (
      <div className="slider-container">
        <Slider className="slider" {...settings}>
          {Data.map(each => (
            <SliderCard details={each} key={each.id} />
          ))}
        </Slider>
      </div>
    )
  }

  renderSuccessSmall = () => {
    const settingsSm = {
      dots: false,
      slidesToShow: 1,
      slidesToScroll: 1,
    }
    const {Data} = this.state
    const settings = {
      dots: false,
      slidesToShow: 4,
      slidesToScroll: 1,
    }
    return (
      <div className="slider-container-sm">
        <Slider className="slider-sm" {...settingsSm}>
          {Data.map(each => (
            <SliderCardSm details={each} key={each.id} />
          ))}
        </Slider>
      </div>
    )
  }

  renderFailure = () => (
    <div className="wrong-con">
      <img
        className="went-wrong"
        src="https://res.cloudinary.com/dzn2lfoqa/image/upload/v1672392232/Group_7522_wentwrong_faawgk.png"
        alt="failure view"
      />
      <p className="went-wrong-head">Something went wrong, Please try again.</p>
      <button onClick={this.getTopRatedBooksData} className="find-books">
        Try Again
      </button>
    </div>
  )

  renderItem() {
    const {dataState} = this.state
    switch (dataState) {
      case 'loading':
        return this.renderLoading()
      case 'success':
        return this.renderSuccess()
      case 'failure':
        return this.renderFailure()
      default:
        return null
    }
  }

  renderItemSm() {
    const {dataState} = this.state
    switch (dataState) {
      case 'loading':
        return this.renderLoading()
      case 'success':
        return this.renderSuccessSmall()
      case 'failure':
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="main-home-container">
        <div className="header-container-lg">
          <Header />
        </div>
        <div className="header-container-sm">
          <HeaderSm />
        </div>
        <div className="scroll-con">
          <div className="find-content-conatiner">
            <h1 className="find-heading">Find Your Next Favorite Books?</h1>
            <p className="find-para">
              You are in the right place. Tell us what titles or genres you have
              enjoyed in the past, and we will give you surprisingly insightful
              recommendations.
            </p>
            <Link style={{textDecoration: 'none'}} to="/shelf">
              <button className="find-books-button">Find Books</button>
            </Link>
          </div>
          <div className="top-rated-container">
            <h1 className="top-heading">Top Rated Books</h1>
            <Link style={{textDecoration: 'none'}} to="/shelf">
              <button className="find-books-button-lg">Find Books</button>
            </Link>
          </div>
          <div className="slider-main-container">
            <div className="slider-container-main">{this.renderItem()}</div>
            <div className="slider-container-main-sm">
              {this.renderItemSm()}
            </div>
          </div>
          <div className="footer-con">
            <Footer />
          </div>
        </div>
      </div>
    )
  }
}

export default Home
