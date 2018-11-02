import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import { getAuthorsQuery, addBookMutation, getBooksQuery } from "../queries/queries";

export class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      genre: "",
      authorId: ""
    };
  }
  displayAuthors() {
    const data = this.props.getAuthors;
    if (data.loading) {
      return <option disabled>Loading authors...</option>;
    } else {
      return data.authors.map(author => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  }
  submitForm(e) {
    e.preventDefault();
    this.props.addBook({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId
      },
      refetchQueries:[{query: getBooksQuery}]
    });
  }
  render() {
    return (
      <form id="add-book" onSubmit={this.submitForm.bind(this)}>
        <div className="field">
          <label>Book name:</label>
          <input
            type="text"
            onChange={e => this.setState({ name: e.target.value })}
          />
        </div>

        <div className="field">
          <label>Genre:</label>
          <input
            type="text"
            onChange={e => this.setState({ genre: e.target.value })}
          />
        </div>

        <div className="field">
          <label>Author:</label>
          <select onChange={e => this.setState({ authorId: e.target.value })}>
            <option>Select author</option>
            {this.displayAuthors()}
          </select>
        </div>

        <button>+</button>
      </form>
    );
  }
}

// export default graphql(getAuthorsQuery)(AddBook);
// old method

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthors" }),
  graphql(addBookMutation, { name: "addBook" })
)(AddBook);
// new method, use compose from react-apollo to use multiple queries
