import { useState } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PageNav = ({ count, limit, setLimit, skip, setSkip }) => {
   const location = useLocation();

   const [page, setPage] = useState(1);

   return (
      (location.pathname === "/" || location.pathname === "/comics") && (
         <div className="page-nav">
            {page > 1 ? (
               <FontAwesomeIcon
                  icon="chevron-circle-left"
                  onClick={() => {
                     setPage(page - 1);
                     setSkip(skip - limit);
                     window.scrollTo(0, 0);
                  }}
                  style={{ cursor: "pointer" }}
               />
            ) : (
               <FontAwesomeIcon
                  icon="chevron-circle-left"
                  style={{ color: "#555" }}
               />
            )}

            <div>
               Results per page:
               <span
                  onClick={() => {
                     setLimit(20);
                  }}
               >
                  [20]
               </span>
               <span
                  onClick={() => {
                     setLimit(50);
                  }}
               >
                  [50]
               </span>
               <span
                  onClick={() => {
                     setLimit(100);
                  }}
               >
                  [100]
               </span>
            </div>

            {page * limit < count ? (
               <FontAwesomeIcon
                  icon="chevron-circle-right"
                  onClick={() => {
                     setPage(page + 1);
                     setSkip(skip + limit);
                     window.scrollTo(0, 0);
                  }}
                  style={{ cursor: "pointer" }}
               />
            ) : (
               <FontAwesomeIcon
                  icon="chevron-circle-right"
                  style={{ color: "#555" }}
               />
            )}
         </div>
      )
   );
};

export default PageNav;
