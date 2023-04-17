import React from 'react';
import { useSelector } from 'react-redux';
import CardItem from './CardItem';
import Recommender from './Recommender';
import './Card.css';

export default function Cards(props) {
  const searchResults = useSelector((state) => state.searchResults);
  const recommendResults = useSelector((state) => state.recommendResults);
  const showRecommenderResults = useSelector((state) => state.showRecommenderResults);
  const showRecommenderMenu = useSelector((state) => state.showRecommenderMenu);

  return (
    <>
      <div style={{ marginTop: '6vw' }}>
        <div className={`recommender-container ${showRecommenderMenu ? 'show' : 'hide'}`}>
          {showRecommenderMenu && <Recommender />}
        </div>
        <div className="container">
          <div className="row">
            {/*movies from the search*/}
            {!showRecommenderResults && searchResults.map((movie) => (
              <div className="col-md-4" key={movie.id}>
                <CardItem
                  key={movie.id}
                  title={movie.title}
                  description={movie.overview}
                  genre={movie.genre_ids}
                  date={movie.release_date}
                  imgurl={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                />
              </div>
            ))}
            {/*movies from the recommender*/}
            {showRecommenderResults && recommendResults.map((movie) => (
              movie == null ? null : (
                <div className="col-md-4" key={movie.id}>
                  <CardItem
                    key={movie.id}
                    title={movie.title}
                    description={movie.overview}
                    genre={movie.genre_ids}
                    date={movie.release_date}
                    imgurl={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  />
                </div>
              )
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
