import React from "react";
import "./Movies.scss";

class Movies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showResults: false,
      movies: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    if (event.target.value.length >= 3) {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=1a6cc1081a2efc60749fdc8435ec64d6&language=en-US&query=${event.target.value}`
      )
        .then((response) => response.json())
        .then((json) => {
          const movies = json.results.slice(0, 8);
          this.setState({
            movies: movies,
          });
        });

      this.setState({
        showResults: true,
      });
    } else {
      this.setState({
        showResults: false,
      });
    }
  }

  render() {
    return (
      <div className="parent-div">
        <header>
          <input
            value={this.state.input}
            onChange={this.handleChange}
            placeholder="Enter movie name"
          />

          <button type="submit">
            <i class="fas fa-search"></i>
          </button>
        </header>

        {this.state.showResults && (
          <ul className="results">
            {this.state.movies.map((movie) => (
              <Movie
                title={movie.title}
                rating={movie.vote_average}
                year={movie.release_date}
              />
            ))}
          </ul>
        )}
        <div className="other-content"></div>
      </div>
    );
  }
}

function Movie(props) {
  return (
    <li className="one-movie">
      <ul>
        <li className="title">{props.title}</li>
        <li>
          {props.rating} Rating, {props.year.slice(0, 4)}
        </li>
      </ul>
    </li>
  );
}

export default Movies;
