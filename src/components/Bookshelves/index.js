import Cookies from 'js-cookie'
import {Component} from 'react'

import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'
import HeaderSm from '../HeaderSm'
import ShelfCard from '../ShelfCard'

import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

class Bookshelves extends Component {
  state = {
    selectedBook: 'ALL',
    searchValue: '',
    fetchStatus: 'initial',
    Data: [],
    booksNotFound: false,
  }

  componentDidMount() {
    this.getDataSelectedBooks()
  }

  getDataSelectedBooks = async () => {
    const {searchValue, selectedBook} = this.state
    this.setState({fetchStatus: 'loading'})
    const JWT = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/book-hub/books?shelf=${selectedBook}&search=${searchValue}`
    const options = {
      method: 'GET',
      headers: {Authorization: `Beaber ${JWT}`},
    }
    const response = await fetch(url, options)
    const fetchedData = await response.json()
    if (response.ok) {
      const {books} = fetchedData
      if (books.length === 0) {
        this.setState({booksNotFound: true})
      } else {
        this.setState({booksNotFound: false})
      }
      const updatedData = books.map(each => ({
        authorName: each.author_name,
        coverPic: each.cover_pic,
        rating: each.rating,
        readStatus: each.read_status,
        title: each.title,
        id: each.id,
      }))
      this.setState({Data: updatedData, fetchStatus: 'success'})
    } else {
      this.setState({fetchStatus: 'failure'})
    }
  }

  onSetAll = () => {
    this.setState({selectedBook: 'ALL'}, this.getDataSelectedBooks)
  }

  onSetReading = () => {
    this.setState({selectedBook: 'READ'}, this.getDataSelectedBooks)
  }

  onSetCurrent = () => {
    this.setState(
      {selectedBook: 'CURRENTLY_READING'},
      this.getDataSelectedBooks,
    )
  }

  onSetWant = () => {
    this.setState({selectedBook: 'WANT_TO_READ'}, this.getDataSelectedBooks)
  }

  onChangeSearch = event => {
    this.setState({searchValue: event.target.value})
  }

  onClickSearch = () => {
    this.getDataSelectedBooks()
  }

  renderHeading = () => {
    const {selectedBook} = this.state
    switch (selectedBook) {
      case 'ALL':
        return 'All Books'
      case 'READ':
        return 'Read Books'
      case 'CURRENTLY_READING':
        return 'Currently Reading Books'
      case 'WANT_TO_READ':
        return 'Want to Read Books'
      default:
        return null
    }
  }

  renderLoading = () => (
    <div className="loading-con-book">
      <div testid="loader" className="products-loader-container">
        <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
      </div>
    </div>
  )

  renderSuccess = () => {
    const {Data} = this.state
    return (
      <>
        <ul className="books-containers">
          {Data.map(each => (
            <ShelfCard details={each} key={each.id} />
          ))}
        </ul>
      </>
    )
  }

  getBookShelvesDataAgain = () => {
    this.getDataSelectedBooks()
  }

  renderFailure = () => (
    <div className="wrong-con-bookshelves">
      <img
        className="went-wrong-bookshelves"
        src="https://res.cloudinary.com/dzn2lfoqa/image/upload/v1672392232/Group_7522_wentwrong_faawgk.png"
        alt="failure view"
      />
      <p className="went-wrong-head-bookshelves">
        Something went wrong, Please try again.
      </p>
      <button onClick={this.getBookShelvesDataAgain} className="find-books">
        Try Again
      </button>
    </div>
  )

  renderItem = () => {
    const {fetchStatus} = this.state
    switch (fetchStatus) {
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

  render() {
    const {booksNotFound, searchValue} = this.state
    return (
      <ul className="main-div">
        <div className="header-container-lg">
          <Header />
        </div>
        <div className="header-container-sm">
          <HeaderSm />
        </div>
        <li className="div-container-book">
          <div className="side-bar">
            <div>
              <h1 className="BooksShelves">Bookshelves</h1>
              <button className="button" value="ALL" onClick={this.onSetAll}>
                All
              </button>
              <button
                className="button"
                value="READ"
                onClick={this.onSetReading}
              >
                Read
              </button>
              <button
                className="button"
                value="CURRENTLY_READING"
                onClick={this.onSetCurrent}
              >
                Currently Reading
              </button>
              <button
                className="button"
                value="WANT_TO_READ"
                onClick={this.onSetWant}
              >
                Want to Read
              </button>
            </div>
            <div>
              <Footer />
            </div>
          </div>
          <div className="books-container">
            <div className="search-head-con">
              <div className="render-header-con">
                <h1 className="heading-shelves">{this.renderHeading()}</h1>
              </div>

              <div className="top-bar-sm">
                <button onClick={this.onSetAll} className="sm-button">
                  All
                </button>
                <button onClick={this.onSetReading} className="sm-button">
                  Read
                </button>
                <button onClick={this.onSetCurrent} className="sm-button">
                  Currently Reading
                </button>
                <button onClick={this.onSetWant} className="sm-button">
                  Want to Read
                </button>
              </div>
              <div testid="searchButton" className="search-con">
                <input
                  onChange={this.onChangeSearch}
                  placeholder="SEARCH"
                  className="search-input"
                  type="search"
                />
                <div>
                  <div testid="searchButton">
                    <button
                      testid="searchButton"
                      type="button"
                      onClick={this.onClickSearch}
                      className="search-btn"
                    >
                      <BsSearch />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {booksNotFound ? (
              <div className="no-match-con">
                <img
                  src="https://res.cloudinary.com/dzn2lfoqa/image/upload/v1672656655/Asset_1_1_1_ounbbm.png"
                  alt="no books"
                  className="no-match-img"
                />
                <p className="head-shelves">
                  Your search for {searchValue} did not find any matches.
                </p>
              </div>
            ) : (
              <div className="show-data">{this.renderItem()}</div>
            )}
          </div>
        </li>
      </ul>
    )
  }
}

export default Bookshelves
