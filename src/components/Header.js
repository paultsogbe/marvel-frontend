import React from "react";
import logo from "../assets/img/logo.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useLocation } from "react-router-dom";

const Header = ({ handleSearch, title, token, setUser }) => {
  let location = useLocation();
  console.log(location.pathname);
  return (
    <header>
      <div className="container">
        <Link to="/">
          <img src={logo} alt="logo"></img>
        </Link>
        {(location.pathname === "/comics" ||
          location.pathname === "/characters") && (
          <div className="search">
            <div className="input-wrapper">
              <FontAwesomeIcon icon="search" />
              <input
                placeholder="Ex : The Hulk..."
                onChange={handleSearch}
                spellCheck={false}
              />
              <span className="input-highlight">{title.replace("\u00a0")}</span>
            </div>
          </div>
        )}

        {token ? (
          <button className="blanc" onClick={() => setUser(null)}>
            Se déconnecter
          </button>
        ) : (
          <div>
            <Link to="/signup">
              <button>S'inscire</button>
            </Link>
            <Link to="/login">
              <button>Se connecter</button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;