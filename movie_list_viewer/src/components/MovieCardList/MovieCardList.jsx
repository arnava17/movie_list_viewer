import React, {Component} from 'react';
import MovieCard from '../MovieCard/MovieCard.jsx';

class MovieCardList extends Component {

  render() {
    return (
      <div className="movie-list">
        {this.props.movies.map((movie) => {
          return <MovieCard key={movie.id} movie={movie}></MovieCard>
        })
      }
      </div>
    )

  }
}

export default MovieCardList
