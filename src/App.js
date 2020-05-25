import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom'
import './App.css';
import Header from "./components/Header"
import Landing from "./components/landing"
import Protected from "./components/Protected"
import Nomore from "./components/Nomore"
import MainPage from "./views/MainPage"
import LoginPage from "./views/LoginPage"
import Coaches from "./views/Coaches"
import Camps from "./views/camps"
import Profile from "./views/profile"
import RegisterPage from './views/RegisterPage';

function App() {
  let [user, setUser] = useState(null);
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    checkUser();
  }, [])

  const checkUser = async () => {
    // extracting token from url
    console.log(window.location.href)

    const urlToken = window.location.href.split("?token=")[1]
      ? window.location.href.split("?token=")[1].split("#")[0]
      : null;
    // get token from storage or urlToken
    const token = localStorage.getItem("token") || urlToken;

    // if there is no token, we don't need to do anything else, just set our app state as LOADED
    if (!token) {
      setLoaded(true);
      return;
    }

    // if there is token, we will fetch user information from api server using the token.
    try {
      const url = "https://localhost:5000/users/me";
      const resp = await fetch(url, {
        headers: {
          Authorization: "Bearer " + token
        }
      });

      const data = await resp.json();
      // if we get user object from response, it means token is correct, we save it back to storage
      if (data.status === "Success") {
        localStorage.setItem("token", token);
        setUser(data.data);
      } else {
        // remove invalid tokens
        localStorage.removeItem("token");
      }
    } catch (err) {
      console.log(err);
    }
    // finally set our app state to LOADED
    setLoaded(true);
  };
  if (!loaded) return <h3>app is loading</h3>
  return (
    <div>
      <Header user={user} setUser={setUser} />
      <Route exact path="/" render={() => <Landing user={user}></Landing>} />

      <section className="container">
        <Switch>
          <Route exact path="/main" render={() => <MainPage user={user} />} />
          <Route exact path="/coaches" component={Coaches} />
          <Protected exact path="/camps/:id" user={user} component={Camps} />
          <Route exact path="/camps" component={Camps} />
          <Nomore exact path="/register" user={user} component={RegisterPage} />
          <Nomore exact path="/login" user={user} setUser={setUser} component={LoginPage} />
          <Protected exact path="/profile" setUser={setUser} user={user} component={Profile} />
        </Switch>
      </section>
    </div>
  );
}

export default App;
