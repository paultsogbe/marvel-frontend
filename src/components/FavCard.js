// import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import axios from "axios";

const FavCard = ({ list, displayComics, setRemovedItem }) => {
   let route = "characters";
   if (displayComics) {
      route = "comics";
   }

   return list.map((item) => {
      let picture = `${item.thumbnail.path}.${item.thumbnail.extension}`;
      return (
         <div
            className="card"
            key={item._id}
            style={{
               backgroundImage: `url(${picture})`,
            }}
         >
            <div>
               <div
                  style={{
                     flexDirection: "row-reverse",
                     marginBottom: "auto",
                     alignItems: "flex-start",
                  }}
               >
                  <FontAwesomeIcon
                     icon="times-circle"
                     className="card-icon"
                     onClick={async () => {
                        try {
                           // axios request to remove from list
                           const response = await axios.post(
                              `https://marvel-teddy.herokuapp.com/${route}/unsave`,
                              {
                                 userId: Cookies.get("userId"),
                                 item: item,
                              },
                              {
                                 headers: {
                                    Authorization: `Bearer ${Cookies.get(
                                       "userToken"
                                    )}`,
                                 },
                              }
                           );
                           console.log("response", response);
                           setRemovedItem(item._id);
                        } catch (error) {
                           console.log(error);
                        }
                     }}
                  />
               </div>
               <h2>{route === "characters" ? item.name : item.title}</h2>
            </div>
         </div>
      );
   });
};

export default FavCard;
