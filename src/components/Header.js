import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "../assets/images/marvel-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
// Component import
import Modal from "./Modal";

const Header = ({
   userCookie,
   userToken,
   search,
   setSearch,
   displayModal,
   setDisplayModal,
}) => {
   const history = useHistory(); // Handle redirect upon click

   const [smartphoneMenu, setSmartphoneMenu] = useState(false);

   return (
      <>
         <div className="container">
            <header>
               <Link to="/">
                  <img src={logo} alt="Marvel" />
               </Link>

               <div className="hide-on-smartphone">
                  <label htmlFor="search">
                     <FontAwesomeIcon icon="search" />
                  </label>
                  <input
                     type="search"
                     id="search"
                     placeholder="Search..."
                     value={search}
                     onChange={(event) => {
                        setSearch(event.target.value);
                     }}
                     style={{ width: search && 200 }}
                  />
               </div>

               {!smartphoneMenu ? (
                  <FontAwesomeIcon
                     icon="bars"
                     className="display-on-smartphone"
                     onClick={() => setSmartphoneMenu(true)}
                  />
               ) : (
                  <>
                     <nav className="smartphone-nav display-on-smartphone">
                        <FontAwesomeIcon
                           icon="times"
                           className=""
                           onClick={() => setSmartphoneMenu(false)}
                        />
                        <Link to="/" onClick={() => setSmartphoneMenu(false)}>
                           Characters
                        </Link>
                        <Link
                           to="/comics"
                           onClick={() => setSmartphoneMenu(false)}
                        >
                           Comics
                        </Link>
                        {!userToken ? (
                           <span
                              onClick={() => {
                                 setDisplayModal(true);
                                 setSmartphoneMenu(false);
                              }}
                           >
                              Sign up | Login
                           </span>
                        ) : (
                           <>
                              <Link
                                 to={`/user/${Cookies.get("userId")}`}
                                 onClick={() => setSmartphoneMenu(false)}
                              >
                                 My List
                              </Link>
                              <span
                                 onClick={() => {
                                    userCookie(null);
                                    history.push("/");
                                    setSmartphoneMenu(false);
                                 }}
                              >
                                 Log out
                              </span>
                           </>
                        )}
                     </nav>
                  </>
               )}

               <nav className="hide-on-smartphone">
                  <Link to="/">Characters</Link>
                  <Link to="/comics">Comics</Link>
                  {!userToken ? (
                     <div
                        className="white-to-red-button"
                        onClick={() => setDisplayModal(true)}
                     >
                        Sign up | Login
                     </div>
                  ) : (
                     <>
                        <Link to={`/user/${Cookies.get("userId")}`}>
                           My List
                        </Link>
                        <span
                           onClick={() => {
                              userCookie(null);
                              history.push("/");
                           }}
                        >
                           Log out
                        </span>
                     </>
                  )}
               </nav>
            </header>
         </div>
         <Modal
            displayModal={displayModal}
            setDisplayModal={setDisplayModal}
            userCookie={userCookie}
         />
      </>
   );
};

export default Header;
