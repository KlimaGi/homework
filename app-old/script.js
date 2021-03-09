class Movies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // input: "",
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

    // this.setState({
    //   input: event.target.value,
    // });
  }

  render() {
    return (
      <div>
        <input value={this.state.input} onChange={this.handleChange} />

        <button type="submit">Submit!</button>
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
      </div>
    );
  }
}

function Movie(props) {
  return (
    <li>
      {props.title} {props.rating} {props.year}
    </li>
  );
}

ReactDOM.render(<Movies />, document.querySelector("#app"));
