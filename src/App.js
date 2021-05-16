import "./index.css";
import "./App.css";
import Cookies from "js-cookie";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState } from "react";
import Home from "./containers/Home";
import Comics from "./containers/Comics";
import Characters from "./containers/Characters";
import Header from "./components/Header";
import CharDetails from "./containers/CharacterDetails";
import SignUp from "./containers/SignUp";
import Login from "./containers/Login";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faKey } from "@fortawesome/free-solid-svg-icons";
library.add(faSearch, faKey);

function App() {
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  const [searchBar, setSearchBar] = useState(false);
  const [title, setTitle] = useState("");
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(100);
  const [page, setPage] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");

  const setUser = (token) => {
    if (token) {
      Cookies.set("userToken", token, { expires: 5 });
      setUserToken(token);
    } else {
      Cookies.remove("userToken");
      setUserToken(null);
    }
  };

  const setError = (e) => {
    setErrorMessage(e);
  };

  const handleSearchBar = () => {
    setSearchBar(true);
  };
  const handleSearch = (event) => {
    const value = event.target.value;
    setTitle(value);
  };

  return (
    <Router>
      <Header
        handleSearch={handleSearch}
        title={title}
        token={userToken}
        setUser={setUser}
      />
      <Switch>
        <Route path="/signup">
          <SignUp
            setUser={setUser}
            setError={setError}
            errorMessage={errorMessage}
          />
        </Route>
        <Route path="/login">
          <Login
            setUser={setUser}
            setError={setError}
            errorMessage={errorMessage}
          />
        </Route>
        <Route path="/comics/:characterId">
          <CharDetails />
        </Route>
        <Route path="/comics">
          <Comics
            handleSearchBar={handleSearchBar}
            title={title}
            skip={skip}
            limit={limit}
            setLimit={setLimit}
            setSkip={setSkip}
            page={page}
            setPage={setPage}
          />
        </Route>
        <Route path="/characters">
          <Characters
            handleSearchBar={handleSearchBar}
            name={title}
            limit={limit}
            skip={skip}
            setLimit={setLimit}
            setSkip={setSkip}
            page={page}
            setPage={setPage}
          />
        </Route>
        <Route path="/">
          <Home setTitle={setTitle} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
