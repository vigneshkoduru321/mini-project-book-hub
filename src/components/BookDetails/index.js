import {Component} from 'react'
import Cookies from 'js-cookie'

import {BsFillStarFill} from 'react-icons/bs'
import './index.css'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import HeaderSm from '../HeaderSm'
import Footer from '../Footer'

class BookDetails extends Component {
  state = {Data: [], fetchStatus: 'initial'}

  componentDidMount() {
    this.getBookDetails()
  }

  getBookDetails = async () => {
    this.setState({fetchStatus: 'loading'})
    const JWT = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Beaber ${JWT}`,
      },
    }
    const response = await fetch(url, options)
    const fetchedData = await response.json()
    if (response.ok) {
      const bookdetails = {book: fetchedData.book_details}
      const updatedData = {
        aboutAuthor: bookdetails.book.about_author,
        aboutBook: bookdetails.book.about_book,
        authorName: bookdetails.book.author_name,
        coverPic: bookdetails.book.cover_pic,
        id: bookdetails.book.id,
        rating: bookdetails.book.rating,
        readStatus: bookdetails.book.read_status,
        title: bookdetails.book.title,
      }
      this.setState({Data: updatedData, fetchStatus: 'success'})
    } else {
      this.setState({fetchStatus: 'failure'})
    }
  }

  renderLoading = () => (
    <div className="loading-con">
      <div testid="loader" className="products-loader-container">
        <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
      </div>
    </div>
  )

  renderSuccess = () => {
    const {Data} = this.state
    const {
      aboutAuthor,
      aboutBook,
      authorName,
      coverPic,
      id,
      rating,
      readStatus,
      title,
    } = Data
    return (
      <div className="div-book-details">
        <div className="img-con">
          <img src={coverPic} alt={title} className="cover-pic-detail" />
          <div className="content-detail-con">
            <h1 className="head">{title}</h1>
            <p className="para">{authorName}</p>
            <p className="para">
              Avg Rating <BsFillStarFill className="star" />
              {rating}
            </p>
            <p className="paraa">Status: {readStatus}</p>
          </div>
        </div>
        <hr className="horizontal-line" />
        <div className="about-con">
          <h1 className="heading-detail">About Author</h1>
          <p className="para-detail">{aboutAuthor}</p>
          <h1 className="heading-detail">About Book</h1>
          <p className="para-detail">{aboutBook}</p>
        </div>
        <Footer />
      </div>
    )
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
      <button onClick={this.getBookDetails} className="find-books">
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
    return (
      <div className="main-details-container">
        <div className="header-container-lg">
          <Header />
        </div>
        <div className="header-container-sm">
          <HeaderSm />
        </div>
        <div className="container-details">{this.renderItem()}</div>
      </div>
    )
  }
}

export default BookDetails
