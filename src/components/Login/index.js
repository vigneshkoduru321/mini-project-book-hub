import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    isShowPass: false,
    isError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onTogglePassword = () => {
    this.setState(prevState => ({isShowPass: !prevState.isShowPass}))
  }

  onSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const fetchedData = await response.json()
    this.setState({username: '', password: ''})
    if (response.ok) {
      const JWT = fetchedData.jwt_token
      Cookies.set('jwt_token', JWT, {expires: 360})
      const {history} = this.props
      history.replace('/')
      this.setState({isError: false})
    } else {
      this.setState({isError: true, errorMsg: fetchedData.error_msg})
    }
  }

  render() {
    const {username, password, isShowPass, isError, errorMsg} = this.state
    const JWT = Cookies.get('jwt_token')
    if (JWT !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-main-container">
        <img
          src="https://res.cloudinary.com/dzn2lfoqa/image/upload/v1672326518/Rectangle_1467_qqm7z8.png"
          alt="website login"
          className="login-img"
        />
        <div className="form-container">
          <form onSubmit={this.onSubmit} className="form">
            <img
              src="https://res.cloudinary.com/dzn2lfoqa/image/upload/v1672330658/Group_7731_logo_krdzru.png"
              alt="login website logo"
              className="website-logo"
            />
            <div className="label-con-user">
              <label className="label" htmlFor="username">
                Username*
              </label>
              <input
                onChange={this.onChangeUsername}
                value={username}
                id="username"
                placeholder="USERNAME"
                className="input-elements"
              />
            </div>
            <div className="label-con-pass">
              <label className="label" htmlFor="password">
                Password*
              </label>
              <input
                onChange={this.onChangePassword}
                value={password}
                type="password"
                id="password"
                placeholder="PASSWORD"
                className="input-elements"
              />
            </div>
            <div className="check-box-con">
              <input
                onChange={this.onTogglePassword}
                id="checkbox"
                type="checkbox"
              />
              <label className="show-pass" htmlFor="checkbox">
                Show Password
              </label>
            </div>
            <div>
              <button type="submit" className="submit-button">
                Login
              </button>
            </div>
            <div className="error-con">
              {isError ? <p className="error-msg">{errorMsg}</p> : null}
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
