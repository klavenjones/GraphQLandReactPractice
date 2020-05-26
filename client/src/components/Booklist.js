import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getBooksQuery } from "../queries";
import BookDetails from "./BookDetails";

//component

class Booklist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: null,
    };
  }

  diplayBooks() {
    const { books, loading } = this.props.data;
    if (loading) {
      return (
        <div>
          <h1>Loading Books..</h1>
        </div>
      );
    } else {
      return books.map((book, i) => (
        <li
          key={book.id}
          onClick={(e) => {
            this.setState({ selected: book.id });
          }}
        >
          {book.name}
        </li>
      ));
    }
  }

  render() {
    return (
      <div>
        <ul id="book-list">{this.diplayBooks()}</ul>
        <BookDetails bookId={this.state.selected} />
      </div>
    );
  }
}

export default graphql(getBooksQuery)(Booklist);
