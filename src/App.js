import "./App.scss";
import "./assets/styles/media-queries.scss";
import { useState } from "react";
import Cookies from "js-cookie";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// CONTAINER IMPORT
import Comics from "./containers/Comics";
import Character from "./containers/Character";
import UserFav from "./containers/UserFav";
import Home from "./containers/Home";

// COMPONENT IMPORT
import Header from "./components/Header";
import Footer from "./components/Footer";

// FONTAWESOME
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faStar,
  faSearch,
  faTimesCircle,
  faInfoCircle,
  faChevronCircleLeft,
  faChevronCircleRight,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faSearch,
  faTimesCircle,
  faStar,
  faInfoCircle,
  faChevronCircleLeft,
  faChevronCircleRight,
  faBars,
  faTimes
);

function App() {
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  const [displayModal, setDisplayModal] = useState(false);

  const [search, setSearch] = useState(""); // For search bar

  const userCookie = (token, id, username) => {
    if (token) {
      Cookies.set("userToken", token, { expires: 7 });
      Cookies.set("userId", id, { expires: 7 });
      Cookies.set("username", username, { expires: 7 });
      setUserToken(token);
    } else {
      Cookies.remove("userToken");
      Cookies.remove("userId");
      Cookies.remove("username");
      setUserToken(null);
    }
  };

  return (
    <Router>
      <Header
        userCookie={userCookie}
        userToken={userToken}
        search={search}
        setSearch={setSearch}
        displayModal={displayModal}
        setDisplayModal={setDisplayModal}
      />
      <Switch>
        <Route path="/comics/:characterId">
          <Character />
        </Route>
        <Route path="/comics">
          <Comics search={search} setDisplayModal={setDisplayModal} />
        </Route>
        <Route path="/user/:userId">
          <UserFav />
        </Route>
        <Route path="/">
          <Home search={search} setDisplayModal={setDisplayModal} />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
