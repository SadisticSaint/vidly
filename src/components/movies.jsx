import React, { Component } from 'react';
import { isCompositeComponent } from 'react-dom/test-utils';
import { getMovies } from '../services/fakeMovieService';
import Like from './common/like';

class Movies extends Component {
  state = {
    movies: getMovies(),
    count: getMovies().length,
  };

  listStyles = {
    class: 'list-unstyled',
  };

  render() {
    const { length: count } = this.state.movies;

    if (count === 0) return <p>There are no movies in this database.</p>;
    return (
      <React-Fragment>
        <p>Showing {count} movies in the database.</p>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map(movie => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like
                    liked={movie.liked}
                    onClick={() => this.handleLike(movie)}
                  />
                </td>
                <td>
                  <button
                    onClick={() => this.handleDelete(movie)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React-Fragment>
    );
  }

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);

    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
    console.log(movies[index].liked);
  };

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);

    //this.setState({movies: movies});
    this.setState({ movies });
    this.setState({ count: this.state.count - 1 });
  };
}

export default Movies;
