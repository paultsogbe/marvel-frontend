// React import
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Component import
import AddCharacter from "./AddCharacter";

const CharacterCard = ({ results, setDisplayModal }) => {
   return results.map((character) => {
      let picture = `${character.thumbnail.path}.${character.thumbnail.extension}`;
      return (
         <div
            className="card"
            key={character._id}
            style={{
               backgroundImage: `url(${picture})`,
            }}
         >
            <div>
               <div>
                  <Link to={`/comics/${character._id}`}>
                     <FontAwesomeIcon
                        icon="info-circle"
                        className="card-icon"
                     />
                     <span>MORE INFO</span>
                  </Link>
                  <AddCharacter
                     character={character}
                     setDisplayModal={setDisplayModal}
                  />
               </div>
               {character.name && <h2>{character.name}</h2>}
            </div>
         </div>
      );
   });
};

export default CharacterCard;
