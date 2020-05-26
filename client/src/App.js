import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

// components
import Booklist from "./components/Booklist";
import AddBook from "./components/AddBook";

// apollo client
const client = new ApolloClient({
  uri: "http://localhost:5001/graphql",
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1>Reading List</h1>
          <Booklist />
          <AddBook />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
