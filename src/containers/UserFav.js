import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import FavCard from "../components/FavCard";
import Loader from "../components/Loader";

const UserFav = (props) => {
  const { userId } = useParams();
  const [displayComics, setDisplayComics] = useState(false);
  const [removedItem, setRemovedItem] = useState("");

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://marvel-backend-paul.herokuapp.com/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("userToken")}`,
          },
        }
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [userId, removedItem]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="container">
      <main className="user-profile">
        <h1>Your secret identity is safe with us, {data.username} ;)</h1>
        <h2>Here is your list of saved items</h2>
        <nav>
          <div
            onClick={() => setDisplayComics(false)}
            className={!displayComics ? "red-button" : "white-button"}
          >
            SAVED CHARACTERS
          </div>
          <div
            onClick={() => setDisplayComics(true)}
            className={displayComics ? "red-button" : "white-button"}
          >
            SAVED COMICS
          </div>
        </nav>
        <main>
          <FavCard
            list={displayComics ? data.fav_comics : data.fav_characters}
            displayComics={displayComics}
            setRemovedItem={setRemovedItem}
          />
        </main>
      </main>
    </div>
  );
};

export default UserFav;
