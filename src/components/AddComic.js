import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";

const AddComic = ({ comic, setDisplayModal }) => {
   return (
      <div style={{ flexDirection: "row-reverse", marginLeft: "auto" }}>
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
                        `https://marvel-teddy.herokuapp.com/comics/save`,
                        { userId: Cookies.get("userId"), comic: comic },
                        {
                           headers: {
                              Authorization: `Bearer ${Cookies.get(
                                 "userToken"
                              )}`,
                           },
                        }
                     );
                     if (response.data) {
                        alert("This comic is already saved in your list!");
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

export default AddComic;
