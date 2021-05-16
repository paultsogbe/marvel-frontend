import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Comic from "../components/Comic";
import Limit from "../components/Limit";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";

const Comics = ({ title, skip, limit, setLimit, setSkip, page, setPage }) => {
  const [data, setData] = useState({});
  const [isLoading, setLoader] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://marvel-backend-paul.herokuapp.com/comics?title=${title}&limit=${limit}&skip=${skip}`
        );
        console.log(response.data);
        setData(response.data);
        setLoader(false);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, [title, limit, skip]);
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
        />
        <Limit count={data.count} setLimit={setLimit} />
      </div>
      <div className="comics">
        {data.results.map((comic) => {
          return <Comic key={comic._id} comic={comic} />;
        })}
      </div>
    </div>
  );
};

export default Comics;
