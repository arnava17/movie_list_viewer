import React, {Component} from 'react';
import MovieCardList from '../MovieCardList/MovieCardList.jsx';
class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      loading: true
    }
    this.getAllMovies.call(this);
  }

  getAllMovies() {
    const vm = this;
    fetch('http://starlord.hackerearth.com/movieslisting')
      .then((response) => {
        return response.json();
      }).then((response) => {
        vm.mapMovies(response);
        this.setState({
          loading : false
        })
      });
  }

  mapMovies(data) {
    let movies = [];
    let ids = {};
    for(let i = 0; i < data.length ; i++) {
      let o = data[i];
      let id = o.movie_imdb_link.split('/');
      id = id[id.length -2];

      if(ids[id] !== true) {
        ids[id] = true;
        movies.push({
          id,
          title : o.movie_title,
          director: o.director_name,
          actors : [o.actor_1_name, o.actor_2_name],
          geners : o.genres,
          language: o.language,
          country : o.country,
          content_rating: o.content_rating,
          year: o.title_year,
          link: o.movie_imdb_link,
          keywords: o.plot_keywords
        });
      }
    }
    this.movies = movies;
  }


  render() {
    let element;
    if(!this.state.loading) {
      return <MovieCardList movies={this.movies}/>
    } else {
      return <div>LOADING....</div>
    }
  }
}

export default App;
