import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
// import Cookies from "js-cookie";

import ComicCard from "../components/ComicCard";
import Loader from "../components/Loader";
import PageNav from "../components/PageNav";
import Hero from "../components/Hero";

const Comics = ({ search, setDisplayModal }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [skip, setSkip] = useState(0); // For page nav
  const [limit, setLimit] = useState(100); // For page nav

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          //axios.get(`https://marvel-backend-paul.herokuapp.com/comics?limit=${limit}&skip=${skip}&title=${search}`);

          `/comics?limit=${limit}&skip=${skip}&title=${search}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Erreur lors du fetch :", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [limit, skip, search]);
  

  return (
    <>
      <Hero />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container">
          <h1>Browse through Marvel's comics collection</h1>
          <main>
            <section className="character-list">
              <ComicCard
                comics={data?.results || []}
                setDisplayModal={setDisplayModal}
              />
            </section>
          </main>
          <PageNav
            count={data.count}
            skip={skip}
            setSkip={setSkip}
            limit={limit}
            setLimit={setLimit}
          />
        </div>
      )}
    </>
  );
};

export default Comics;
