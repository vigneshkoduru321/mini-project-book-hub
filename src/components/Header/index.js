import './index.css'

import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

class Header extends Component {
  onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    return (
      <ul className="nav">
        <li>
          <Link style={{textDecoration: 'none'}} to="/">
            <img
              className="nav-logo"
              src="https://res.cloudinary.com/dzn2lfoqa/image/upload/v1672330658/Group_7731_logo_krdzru.png"
              alt="website logo"
            />
          </Link>
        </li>
        <li>
          <div className="logout-container">
            <Link style={{textDecoration: 'none'}} to="/">
              <p className="home-name">Home</p>
            </Link>
            <Link style={{textDecoration: 'none'}} to="/shelf">
              <p className="bookshelves-name">Bookshelves</p>
            </Link>
            <button
              type="button"
              className="log-out-button"
              onClick={this.onClickLogout}
            >
              Logout
            </button>
          </div>
        </li>
      </ul>
    )
  }
}

export default withRouter(Header)
