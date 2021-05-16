import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";

const CharacterDetails = () => {
  const [data, setData] = useState({});
  const { characterId } = useParams();
  const [isLoading, setLoader] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://marvel-backend-paul.herokuapp.com/comics/${characterId}`
        );
        console.log(response.data);
        setData(response.data);
        setLoader(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [characterId]);
  return isLoading ? (
    <Loader />
  ) : (
    <div className="character-card">
      <div>
        <img
          src={`${data.thumbnail.path}.${data.thumbnail.extension}`}
          alt={data.name}
        />
      </div>
      <div className="character-details">
        <h1>
          <strong>{data.name}</strong>
        </h1>
        <h1>{data.description}</h1>
      </div>
      {data.comics.map((detail) => {
        return <span key={detail._id}>{detail.description}</span>;
      })}
    </div>
  );
};

export default CharacterDetails;
