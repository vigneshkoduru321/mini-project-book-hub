import {Component} from 'react'

import {ImCross} from 'react-icons/im'

import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {GiHamburgerMenu} from 'react-icons/gi'

import './index.css'

class HeaderSm extends Component {
  state = {showMenu: false}

  onClickMenu = () => {
    this.setState(prevState => ({showMenu: !prevState.showMenu}))
  }

  onClickLogoutMenu = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  onClickCross = () => {
    console.log('hahah')
    this.setState(prevState => ({showMenu: !prevState.showMenu}))
  }

  render() {
    const {showMenu} = this.state
    return (
      <div>
        <nav className="nav-sm">
          <Link style={{textDecoration: 'none'}} to="/">
            <img
              className="nav-logo-sm"
              src="https://res.cloudinary.com/dzn2lfoqa/image/upload/v1672330658/Group_7731_logo_krdzru.png"
              alt="website logo"
            />
          </Link>
          <button onClick={this.onClickMenu} className="menu-button">
            <GiHamburgerMenu className="GiHamburgerMenu" />
          </button>
        </nav>
        <div className="show-menu-con">
          {showMenu ? (
            <>
              <Link style={{textDecoration: 'none'}} to="/">
                <p className="home-menu">Home</p>
              </Link>
              <Link style={{textDecoration: 'none'}} to="/shelf">
                <p className="home-menu">Bookshelves</p>
              </Link>

              <button
                type="button"
                className="log-out-button-menu"
                onClick={this.onClickLogoutMenu}
              >
                Logout
              </button>
              <button onClick={this.onClickCross} className="cross-button">
                <ImCross className="ImCross" />
              </button>
            </>
          ) : null}
        </div>
      </div>
    )
  }
}
export default withRouter(HeaderSm)
