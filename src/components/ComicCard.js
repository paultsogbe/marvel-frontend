// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddComic from "../components/AddComic";

const ComicCard = ({ comics, setDisplayModal }) => {
   return comics.map((comic) => {
      let picture = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
      return (
         <div
            to={`/comics/${comic._id}`}
            className="card"
            key={comic._id}
            style={{ backgroundImage: `url(${picture})` }}
         >
            <div>
               <div>
                  <AddComic comic={comic} setDisplayModal={setDisplayModal} />
               </div>
               {comic.title && <h2>{comic.title}</h2>}
            </div>
         </div>
      );
   });
};

export default ComicCard;
