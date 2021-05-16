import { useEffect, useState } from "react";
import axios from "axios";
import Limit from "../components/Limit";
import Character from "../components/Character";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";

const Characters = ({
  name,
  skip,
  limit,
  setLimit,
  setSkip,
  page,
  setPage,
}) => {
  const [data, setData] = useState({});
  const [isLoading, setLoader] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://marvel-backend-paul.herokuapp.com/characters?name=${name}&skip=${skip}&limit=${limit}`
        );
        console.log(response.data);
        setData(response.data);
        setLoader(false);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, [name, skip, limit]);
  return isLoading ? (
    <Loader />
  ) : (
    <div className="container">
      <div className="limit">
        <Pagination
          limit={limit}
          setSkip={setSkip}
          count={data.count}
          page={page}
          setPage={setPage}
          skip={skip}
        />
        <Limit count={data.count} setLimit={setLimit} />
      </div>
      <div className="comics">
        {data.results.map((character) => {
          return <Character key={character._id} character={character} />;
        })}
      </div>
    </div>
  );
};
export default Characters;