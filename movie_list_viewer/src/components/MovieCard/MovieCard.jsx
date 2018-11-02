import React, {Component} from "react";

class MovieCard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      imdb_data_loading : true
    }
    this.getDataFromImdb.call(this);
  }

  getDataFromImdb() {
    const vm = this;
    const movie = this.props.movie;
    fetch(`http://www.omdbapi.com/?i=${this.props.movie.id}&apikey=8209e48e`)
    .then((response) => {
      return response.json();
    }).then(({Poster, imdbRating}) => {
      movie.posterLink = Poster;
      movie.rating = imdbRating;
      this.setState({
        imdb_data_loading : false
      })
    })
  }

  getKeyWords(keywords) {
    if(keywords) {
      return (<div><span>Keywords: </span>{keywords.split('|').join(', ')}</div>);
    }
  }

  getContentRatingAndCountry(rating, country) {
    if(rating && country) {
      return (<div className="col-md-4 right">{rating} | {country}</div>);
    }
  }

  goToImdbPage(link) {
    console.log("aya");
    window.open(link,'_blank');
  }

  render() {
    let movie = this.props.movie;
    let imgSrc, rating;
    if(this.state.imdb_data_loading) {
      imgSrc =  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlcCOy_C-MkuEiCIBZQyjy_BBn2s1jS3-rLY8bv10uKn4UiNsj';
    } else {
      imgSrc = movie.posterLink;
    }


    return (
      <div className="movie-card row">
        <div className="movie-poster col-md-3">
          <img src={imgSrc}></img>
        </div>
        <div className="movie-details col-md-9">
          <div className="movie-det-header row">
            <div className="title col-md-9">
              <div onClick={this.goToImdbPage.bind(this, movie.link)}>{movie.title} {movie.year? `(${movie.year})`:''}</div>
            </div>
            <div className="rating right col-md-3">
              <div>
                <img src='http://pngimg.com/uploads/star/star_PNG41514.png'/>
                {movie.rating}
              </div>
            </div>
            <div className="title-info row">
              <div className="col-md-8">{movie.geners.split('|').join(', ')}</div>
              {this.getContentRatingAndCountry(movie.content_rating, movie.country)}
            </div>
          </div>
          <div className="sub-details row">
            <div><span>Director: </span>{movie.director}</div>
            <div><span>Actors: </span>{movie.actors[0]}, {movie.actors[1]}</div>
            {this.getKeyWords(movie.keywords)}
          </div>
        </div>
      </div>
    );
  }
}

export default MovieCard;
