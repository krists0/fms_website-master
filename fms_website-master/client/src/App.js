import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router,Route,Switch } from "react-router-dom"
import authPage from './authentication/authPage'
import userMainp from "./userMainp"
import showLoginReg from './authentication/show_login_reg'
import jwt_decode from 'jwt-decode';
import setAuthToken from './authentication/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { Provider } from 'react-redux';
import store from './store';
import LoginBox from './authentication/login';
//import { clearCurrentProfile } from './actions/profileActions';





// Check for token
if (localStorage.jwtToken) {
    // Set auth token header auth
    setAuthToken(localStorage.jwtToken);
    // Decode token and get user info and exp
    const decoded = jwt_decode(localStorage.jwtToken);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));

    // Check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        // Logout user
        store.dispatch(logoutUser());
        // Clear current Profile
       // store.dispatch(clearCurrentProfile());
        // Redirect to login
        window.location.href = '/showLoginReg';
    }
}







class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <Router>
            <Switch>
            <Route path="/" exact component={authPage} />
            <Route exact path="/userMainp" component={userMainp}/>
            <Route path="/showLoginReg" component={showLoginReg}/>
            <Route path="/showLogin" component={LoginBox}/>

            </Switch>
            </Router>
        </Provider>
    );
  }
}

export default App;
