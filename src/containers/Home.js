import { Link } from "react-router-dom";
import characters from "../assets/img/characters.jpeg";
import comics from "../assets/img/comics.jpeg";

const Home = ({ setTitle }) => {
  return (
    <div className="container home">
      <div>
        <Link to="/comics" params={{ setTitle: "" }}>
          <h1>Comic books</h1>
          <img src={comics} alt="Voir les comics"></img>
        </Link>
      </div>
      <div>
        <Link to="/characters">
          <h1>Personnages</h1>
          <img src={characters} alt="Voir les personnages"></img>
        </Link>
      </div>
    </div>
  );
};

export default Home;
