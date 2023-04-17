import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TMDB_API_KEY = '0f291a33c0a1475d91923c15d6889904';

const MovieSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${searchTerm}`);
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    if (searchTerm) {
      fetchMovies();
    } else {
      setMovies([]);
    }
  }, [searchTerm]);

  return (
    <div style={{marginTop: '10vh'}}>
      <input
        type="text"
        placeholder="Search for a movie"
        value={searchTerm}
        onChange={event => setSearchTerm(event.target.value)}
      />
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>{movie.id}  {movie.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default MovieSearch;
