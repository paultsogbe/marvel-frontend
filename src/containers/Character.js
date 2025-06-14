import React from "react";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ComicCard from "../components/ComicCard";
import Loader from "../components/Loader";

const Character = (props) => {
  const { characterId } = useParams();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          // `https://marvel-backend-paul.herokuapp.com/comics/${characterId}`
          `/comics/${characterId}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Erreur lors du fetch :", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [characterId]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="container">
      <h1>More about {data.name}</h1>
      <main>
        {data.description && (
          <section>
            <p className="character-descr">{data.description}</p>
          </section>
        )}
        <section className="character-comics">
          <ComicCard comics={data.comics} />
        </section>
      </main>
    </div>
  );
};

export default Character;
