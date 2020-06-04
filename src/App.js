import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom'
import {
  CircleLoader
} from 'react-spinners'
import './App.css'
import Header from "./components/Header"
import Footer from "./components/Footer"
import Landing from "./components/landing"
import Protected from "./components/Protected"
import Nomore from "./components/Nomore"
import MainPage from "./views/MainPage"
import EntryPage from "./views/EntryPage"
import CoachCard from "./components/CoachCard"
import CampFullCard from "./components/CampFull"
import CampCard from "./components/CampCard"
import Camp from "./views/Camp"
import Profile from "./views/Profile"
import ChangePassword from './views/changePassword';
import CoachFullProfile from "./components/CoachFullProfile"


function App(props) {
  const history = useHistory()
  let [user, setUser] = useState(null);
  const [loaded, setLoaded] = useState(false)
  const [formInput, setFormInput] = useState({ ...props })

  useEffect(async () => {
    await checkUser();
    // setLoaded(true)
  }, [])

  useEffect(() => {
    navbarChange()
  }, [])

  //check for scrolling action - navbar will change
  function navbarChange() {
    window.addEventListener("scroll", function (event) {

      let y = window.pageYOffset
      if (y > 10) {
        document.getElementById("mynav") && document.getElementById("mynav").classList.add('active')
      } else {
        document.getElementById("mynav") && document.getElementById("mynav").classList.remove('active')
      }
    }, false)
  }

  const checkUser = async () => {
    console.log(window.location.href)

    const urlToken = window.location.href.split("?token=")[1]
      ? window.location.href.split("?token=")[1].split("#")[0]
      : null;
    const token = localStorage.getItem("token") || urlToken;

    if (!token) {
      setLoaded(true);
      return;
    }

    // fetch API if token awailable
    try {
      const url = process.env.REACT_APP_SERVER + "/users/me";
      const resp = await fetch(url, {
        headers: {
          Authorization: "Bearer " + token
        }
      });

      const data = await resp.json();
      if (data.status === "Success") {
        localStorage.setItem("token", token);
        setUser(data.data);
        setLoaded(true)

      } else {
        localStorage.removeItem("token");
      }
    } catch (err) {
      console.log(err);
    }
    // set state to LOADED
    setLoaded(true)

  };

  if (!loaded) {
    console.log("user", user)
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
      }}  >
        <CircleLoader />
      </div>
    )
  }

  return (
    <div>
      <Header user={user} setUser={setUser} formInput={formInput} setFormInput={setFormInput} />

      <div className="mainSection">
        <section className="container-fluid footerPos">
          <div className="jsection">
            <Switch>
              <Route exact path="/" render={() => <Landing user={user} />} />
              <Route exact path="/main" render={() => <MainPage user={user} />} />

              <Protected exact path="/coaches/profile" user={user} setUser={setUser} component={CoachFullProfile} />
              <Protected exact path="/coaches" user={user} setUser={setUser} component={CoachCard} />

              <Protected exact path="/camps/create" user={user} setUser={setUser} component={Camp} />
              <Protected exact path="/camps/:campId" user={user} setUser={setUser} component={CampFullCard} />
              <Protected exact path="/camps" user={user} setUser={setUser} component={CampCard} />

              <Nomore exact path="/register" user={user} setUser={setUser} page="register" component={EntryPage} />
              <Nomore exact path="/email/:urlToken" user={user} component={ChangePassword} />
              <Nomore exact path="/login" setUser={setUser} user={user} page="login" component={EntryPage} />
              <Protected exact path="/profile" setUser={setUser} user={user} component={Profile} />

              <Protected exact path="/test" user={user} setUser={setUser} component={() => { console.log("khoa"); return <div>hello world</div> }} />
            </Switch>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}

export default App;
