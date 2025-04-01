import React from "react";
import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Modal = ({ displayModal, setDisplayModal, userCookie }) => {
   // Form inputs:
   const [email, setEmail] = useState("");
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   // To switch between login and sign up form:
   const [displayLogin, setDisplayLogin] = useState(true);
   const switchForm = () => {
      if (displayLogin) {
         setDisplayLogin(false);
      } else {
         setDisplayLogin(true);
      }
   };

   const handleSubmit = async (event) => {
      event.preventDefault();
      try {
         if (displayLogin) {
            const response = await axios.post(
               `https://marvel-teddy.herokuapp.com/user/login`,
               {
                  email: email,
                  password: password,
               }
            );
            userCookie(
               response.data.token,
               response.data._id,
               response.data.username
            );
         } else {
            const response = await axios.post(
               `https://marvel-teddy.herokuapp.com/user/signup`,
               {
                  email: email,
                  username: username,
                  password: password,
               }
            );
            userCookie(
               response.data.token,
               response.data._id,
               response.data.username
            );
            console.log(response.data);
         }
         setDisplayModal(false);
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <div
         className="modal-container"
         style={{ display: displayModal ? "flex" : "none" }}
      >
         <div className="modal-frame">
            <FontAwesomeIcon
               icon="times-circle"
               onClick={() => setDisplayModal(false)}
            />
            <h2>
               {displayLogin
                  ? "Log into your account to manage your list of saved items"
                  : "Create an account to save your favorite characters and comics"}
            </h2>
            <div>
               <div
                  onClick={switchForm}
                  className={displayLogin ? "red-button" : "white-button"}
               >
                  LOGIN
               </div>
               <div
                  onClick={switchForm}
                  className={!displayLogin ? "red-button" : "white-button"}
               >
                  SIGN UP
               </div>
            </div>
            {displayLogin ? (
               <>
                  <form
                     style={{ opacity: displayLogin ? "flex" : "none" }}
                     onSubmit={handleSubmit}
                  >
                     <input
                        type="text"
                        value={email}
                        placeholder="E-mail"
                        onChange={(event) => setEmail(event.target.value)}
                     />
                     <input
                        type="password"
                        value={password}
                        placeholder="Password"
                        onChange={(event) => setPassword(event.target.value)}
                     />
                     <button type="submit" className="white-button">
                        LOGIN
                     </button>
                  </form>
                  <p onClick={() => setDisplayLogin(false)}>
                     No account yet? Click here!
                  </p>
               </>
            ) : (
               <>
                  <form
                     style={{ display: !displayLogin ? "flex" : "none" }}
                     onSubmit={handleSubmit}
                  >
                     <input
                        type="email"
                        value={email}
                        placeholder="E-mail"
                        onChange={(event) => setEmail(event.target.value)}
                     />
                     <input
                        type="text"
                        value={username}
                        placeholder="Username"
                        onChange={(event) => setUsername(event.target.value)}
                     />
                     <input
                        type="password"
                        value={password}
                        placeholder="Password"
                        onChange={(event) => setPassword(event.target.value)}
                     />
                     <button type="submit" className="white-button">
                        SIGN UP NOW
                     </button>
                  </form>
                  <p onClick={() => setDisplayLogin(true)}>
                     Already registered? Click here!
                  </p>
               </>
            )}
         </div>
      </div>
   );
};

export default Modal;
