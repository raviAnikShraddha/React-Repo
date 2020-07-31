import React, { Component } from "react";
import { Card, Table, Image, ButtonGroup, Button } from "react-bootstrap";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import MyToast from "./MyToast";
import { Link } from "react-router-dom";
//import Book from "./Book";

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      Book: [],
    };
  }

  componentDidMount() {
    axios
      .get("https://books-ops.herokuapp.com/rest/books")
      .then((response) => response.data)
      .then((data) => {
        this.setState({
          Book: data,
        });
      });
  }

  deleteBook = (bookId) => {
    axios
      .delete("https://books-ops.herokuapp.com/rest/books/" + bookId)
      .then((response) => {
        if (response.data != null) {
          this.setState({ show: true });
          setTimeout(() => this.setState({ show: false }), 3000);
          this.setState({
            Book: this.state.Book.filter((Book) => Book.id !== bookId),
          });
        } else {
          this.setState({ show: false });
        }
      });
  };

  render() {
    return (
      <div>
        <div style={{ display: this.state.show ? "block" : "none" }}>
          <MyToast
            show={this.state.show}
            message={"Book deleted successfully!"}
            type={"danger"}
          />
        </div>

        <Card className="border border-dark bg-dark text-white">
          <Card.Header>
            <FontAwesomeIcon icon={faList} /> Book List
          </Card.Header>
          <Card.Body>
            <Table bordered hover striped variant="dark">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>ISBN Number</th>
                  <th>Language</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.Book.length === 0 ? (
                  <tr align="center">
                    <td colSpan="6">No Books Available</td>
                  </tr>
                ) : (
                  this.state.Book.map((book) => (
                    <tr key={book.id}>
                      <td>
                        <Image
                          src={book.coverPhotoURL}
                          roundedCircle
                          width="25"
                          height="25"
                        />{" "}
                        {book.title}
                      </td>
                      <td>{book.author}</td>
                      <td>{book.isbnNumber}</td>
                      <td>{book.language}</td>
                      <td>{book.price}</td>
                      <td>
                        <ButtonGroup>
                          <Link
                            to={"edit/" + book.id}
                            className="btn btn-sm btn-outline-primary"
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </Link>
                          {"  "}
                          <Button
                            size="sm"
                            variant="outline-danger"
                            onClick={this.deleteBook.bind(this, book.id)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default BookList;
