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
          {/* <svg viewBox="0 0 20 20"></svg> */}
          <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="512px"
            height="512px"
            viewBox="0 0 512 512"
            enable-background="new 0 0 512 512"
          >
            <path
              d="M352,255.5l-192,96v-192L352,255.5z M512,31.5v448H0v-448H512z M320,95.5h64v-32h-64V95.5z M224,95.5h64v-32h-64V95.5z
	 M128,95.5h64v-32h-64V95.5z M32,95.5h64v-32H32V95.5z M96,415.5H32v32h64V415.5z M192,415.5h-64v32h64V415.5z M288,415.5h-64v32h64
	V415.5z M384,415.5h-64v32h64V415.5z M480,415.5h-64v32h64V415.5z M480,127.5H32v256h448V127.5z M480,63.5h-64v32h64V63.5z"
            />
          </svg>
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
// <svg viewBox="0 0 20 20" width="1rem">
//<path></path>
//</svg>
