import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from "axios";
import { Configuration, OpenAIApi } from 'openai';
import { setRecommendResults, setShowRecommenderResult, setProgress, setShowRecommenderMenu } from "../redux/ActionCreator";
import { useDispatch } from "react-redux";
import './Recommender.css';
const apiKey = "";// TMBD api key

function MovieForm() {
  const dispatch = useDispatch();
  const [genre, setGenre] = useState('');
  const [similarMovies, setSimilarMovies] = useState('');
  const [occasion, setOccasion] = useState('');
  const [actor, setActor] = useState('');
  const [language, setLanguage] = useState('');
  const [description, setDescription] = useState('');
  // create openai configuration
  const configuration = new Configuration({
    apiKey: "",
  });

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
  };

  const handleSimilarMoviesChange = (e) => {
    setSimilarMovies(e.target.value);
  };

  const handleOccasionChange = (e) => {
    setOccasion(e.target.value);
  };

  const handleActorChange = (e) => {
    setActor(e.target.value);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const movies = [[]];
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setShowRecommenderMenu(false));
    dispatch(setProgress(50));
    const response = await res();
    if (response) { // check if response is not null or undefined
      const data = response.data.choices[0].text;// set first choice as data
      if (data.length !== 0) {
        const arr = data.split(', ');
        arr[0] = arr[0].slice(2); // removing the \n\n
        // console.log(arr);
        arr.forEach((item) => {
          //add movie name to movie array
          //add last 4 characters to year array
          movies.push([item.slice(0, item.length - 5), item.slice(item.length - 4)]);
        });
        dispatch(setProgress(60));
        handleSearch();
        //console.log(movie);
      }
    } else {
      console.log("Error: response is null or undefined");
    }
  };

  // dispatch search results to redux store
  const handleSearch = async (event) => {
    //event.preventDefault(); // Prevents the page from reloading when the form is submitted
    try {
      const movie = [];
      //loop through movie array and search for movie name and year
      for (let i = 1; i < movies.length; i++) {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movies[i][0]}&year=${movies[i][1]}` //
        );
        movie.push(response.data.results[0]);
      }
      dispatch(setProgress(100));
      dispatch(setRecommendResults(movie));
      dispatch(setShowRecommenderResult(true));
    } catch (er̥ror) {
      console.log("🚀 ~ file: Recommender.js:42 ~ handleSearch ~ er̥ror:", er̥ror)
    }
  };


  const openai = new OpenAIApi(configuration);
  // create completion function
  const res = async () => {
    try {
      dispatch(setProgress(10));
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `give me list of comma separated movie recommendation in form of only movie name year (example: The Hangover 2009)(max 12 movies) based on the following information:
              \ngenre: ${genre}
              \nlanguage: ${language}
              \nactors/directors: ${actor}
              \nsimilar movies: ${similarMovies}
              \nabout which occasion the movie should be: ${occasion}
              \ndescription about the movie: ${description}`,
        max_tokens: 1000,
        temperature: 0,
        n: 1,
      });
      dispatch(setProgress(30));
      return response; // return the response object
    } catch (erro̥r) {
      console.log("🚀 ~ file: Recommender.js:103 ~ res ~ erro̥r:", erro̥r)
      return null; // return null or some default value if there's an error
    }
  };
  return (
    <div className="movie-form">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="genre">
          <Form.Label>Genre</Form.Label>
          <Form.Control type="text" placeholder="Enter movie genre" value={genre} onChange={handleGenreChange} />
        </Form.Group>
        <Form.Group controlId="similarMovies">
          <Form.Label>Similar Movies</Form.Label>
          <Form.Control type="text" placeholder="Enter similar movies" value={similarMovies} onChange={handleSimilarMoviesChange} />
        </Form.Group>
        <Form.Group controlId="occasion">
          <Form.Label>Occasion</Form.Label>
          <Form.Control type="text" placeholder="What's the occasion" value={occasion} onChange={handleOccasionChange} />
        </Form.Group>
        <Form.Group controlId="actor">
          <Form.Label>Actors/Directors</Form.Label>
          <Form.Control type="text" placeholder="Enter Actors or Directors" value={actor} onChange={handleActorChange} />
        </Form.Group>
        <Form.Group controlId="language">
          <Form.Label>Language</Form.Label>
          <Form.Control type="text" placeholder="Enter language" value={language} onChange={handleLanguageChange} />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Describe the story you are searching" value={description} onChange={handleDescriptionChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default MovieForm;
