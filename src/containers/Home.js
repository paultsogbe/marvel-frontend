import { useState, useEffect } from "react";
import axios from "axios";
// Component import
import CharacterCard from "../components/CharacterCard";
import PageNav from "../components/PageNav";
import Loader from "../components/Loader";
import Hero from "../components/Hero";

const Home = ({ search, setDisplayModal }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [skip, setSkip] = useState(0); // For page nav
  const [limit, setLimit] = useState(100); // For page nav

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://marvel-backend-paul.herokuapp.com/characters?limit=${limit}&skip=${skip}&name=${search}`
      );
      setData(response.data);
      setIsLoading(false);
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
          <h1>Browse through characters of the Marvel Universe</h1>
          <main>
            <section className="character-list">
              <CharacterCard
                results={data.results}
                setDisplayModal={setDisplayModal}
              />
            </section>
            <PageNav
              count={data.count}
              skip={skip}
              setSkip={setSkip}
              limit={limit}
              setLimit={setLimit}
            />
          </main>
        </div>
      )}
    </>
  );
};

export default Home;
