import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import decodeJWT from 'jwt-decode'
import { api, setJwt } from './api/init'
import Bookmark from './components/Bookmark'
import SignIn from './components/SignIn'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  state = {
    bookmarks: [],
    loginError: null
  }

  get token() {
    return localStorage.getItem('token')
  }

  set token(value) {
    localStorage.setItem('token', value)
  }

  handleSignIn = async (event) => {
    try {
      event.preventDefault()
      const form = event.target
      const response = await api.post('/auth/login', {
        email: form.elements.email.value,
        password: form.elements.password.value
      })
      this.token = response.data.token
      setJwt(response.data.token)
      this.fetchBookmarks()
      // this.forceUpdate()
    } catch (error) {
      this.setState({ loginError: error.message })
    }
  }

  handleSignOut = (event) => {
    api.get('/auth/logout').then(() => {
      localStorage.removeItem('token')
      this.setState({ bookmarks: [] })
      // this.forceUpdate()
    })
  }

  remove = (id) => { // id = Mongo _id of the bookmark
      const index = this.state.bookmarks.findIndex(bookmark => bookmark._id === id)
      if (index >= 0) {
        const bookmarks = [...this.state.bookmarks]
        bookmarks.splice(index, 1)
        this.setState({ bookmarks })
      }
  }

  render() {
    const tokenDetails = this.token && decodeJWT(this.token)
    const { bookmarks } = this.state
    return (
      <div className="App">
      {
        // <Route exact path="/home" render={(props) => (
        //   isUserLoggedIn() ? (
        //     <Home {...props} />
        //   ) : (
        //     <Redirect to="/login"/>
        //   )
        // )}/>
          localStorage.getItem('token') ? (
            <Fragment>
              <h4>Welcome { tokenDetails.email }!</h4>
              <p>You logged in at: { new Date(tokenDetails.iat * 1000).toLocaleString() }</p>
              <p>Your token expires at: { new Date(tokenDetails.exp * 1000).toLocaleString() }</p>
              <button onClick={this.handleSignOut}>Logout</button>
              <ul>
              {
                bookmarks.map(
                  bookmark => <Bookmark key={bookmark._id} {...bookmark} remove={this.remove} />
                )
              }
              </ul>
            </Fragment>
          ) : (
            <SignIn loginError={this.state.loginError} handleSignIn={this.handleSignIn} />
          )
        }
        <h1>Bookmarks</h1>

      </div>
    );
  }

  async fetchBookmarks() {
    try {
      const bookmarks = await axios.get(
        'http://localhost:3000/bookmarks'
      )
      this.setState({ bookmarks: bookmarks.data })
    }
    catch(error) {
      alert('Can\'t get bookmarks!')
    }
  }
}


export default App;
