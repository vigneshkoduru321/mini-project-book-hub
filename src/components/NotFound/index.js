import './index.css'

import {Link} from 'react-router-dom'

import {Component} from 'react'

class NotFound extends Component {
  onClickHome = () => {
    const {history} = this.props
    history.replace('/')
  }

  render() {
    return (
      <div className="div-not-found">
        <img
          src="https://res.cloudinary.com/dzn2lfoqa/image/upload/v1672657884/Group_7484_jbbleh.png"
          alt="not found"
          className="not-found"
        />
        <h1 className="head-not-found">Page Not Found</h1>
        <p className="para-not-found">
          we are sorry, the page you requested could not be found
        </p>
        <Link to="/">
          <button>Go Back to Home</button>
        </Link>
      </div>
    )
  }
}

export default NotFound
