import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";

const AddCharacter = ({ character, setDisplayModal }) => {
   return (
      <div style={{ flexDirection: "row-reverse", textAlign: "right" }}>
         <FontAwesomeIcon
            icon="star"
            className="card-icon"
            onClick={async () => {
               // Not logged in >> show modal
               if (!Cookies.get("userId")) {
                  setDisplayModal(true);
               } else {
                  try {
                     // axios request to add to list
                     const response = await axios.post(
                        `https://marvel-teddy.herokuapp.com/characters/save`,
                        { userId: Cookies.get("userId"), character: character },
                        {
                           headers: {
                              Authorization: `Bearer ${Cookies.get(
                                 "userToken"
                              )}`,
                           },
                        }
                     );
                     console.log("response", response);
                     if (response.data) {
                        alert("This character is already saved in your list!");
                     }
                  } catch (error) {
                     console.log(error);
                  }
               }
            }}
         />
         <span>ADD TO LIST</span>
      </div>
   );
};

export default AddCharacter;
