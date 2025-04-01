import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';

const Home = () => {
   const [characters, setCharacters] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   const fetchCharacters = async () => {
      try {
         const response = await axios.get('/characters?limit=100&skip=0&name='); // Ensure this uses the proxy
         setCharacters(response.data.results);
         setError(null);
      } catch (error) {
         console.error('Error fetching characters:', error.message);
         setError('Failed to fetch characters. Please try again later.');
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      fetchCharacters();
   }, []);

   if (loading) {
      return <Loader />;
   }

   if (error) {
      return <div className="error-message">{error}</div>;
   }

   return (
      <div>
         <h1>Marvel Characters</h1>
         <ul>
            {characters.map((character) => (
               <li key={character.id}>{character.name}</li>
            ))}
         </ul>
      </div>
   );
};

export default Home;

