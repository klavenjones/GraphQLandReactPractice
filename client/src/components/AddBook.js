import React, { Component } from "react";
import { graphql } from "react-apollo";
import compose from "lodash.flowright";
import { getAuthorsQuery, addBookMutation, getBooksQuery } from "../queries";

class AddBook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      genre: "",
      authorId: "",
    };
  }

  displayAuthors() {
    const { authors, loading } = this.props.getAuthorsQuery;
    if (loading) {
      return <option>Loading Authors..</option>;
    } else {
      return authors.map((author) => (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      ));
    }
  }

  submitForm(e) {
    e.preventDefault();
    const { name, genre, authorId } = this.state;

    this.props.addBookMutation({
      variables: {
        name: name,
        genre: genre,
        authorId: authorId,
      },
      refetchQueries: [{ query: getBooksQuery }],
    });
  }

  render() {
    return (
      <form onSubmit={this.submitForm.bind(this)} id="add-book">
        <div className="field">
          <label>Book Name:</label>
          <input
            name="name"
            type="text"
            value={this.state.name}
            onChange={(e) => this.setState({ name: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Genre: </label>
          <input
            name="genre"
            type="text"
            value={this.state.genre}
            onChange={(e) => this.setState({ genre: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Author:</label>
          <select onChange={(e) => this.setState({ authorId: e.target.value })}>
            <option>Select author</option>
            {this.displayAuthors()}
          </select>
        </div>
        <button>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
