import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getBookQuery } from "../queries";

class BookDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  displayBoookDetails() {
    const { book } = this.props.data;
    console.log(book);
    if (book) {
      return (
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All books by author</p>
          <ul className="other-books">
            {book.author.books.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
      );
    } else {
      return (
        <div>
          <h3>No Book Selected</h3>
        </div>
      );
    }
  }

  render() {
    console.log(this.props);
    return <div id="book-details">{this.displayBoookDetails()}</div>;
  }
}

export default graphql(getBookQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.bookId,
      },
    };
  },
})(BookDetails);
