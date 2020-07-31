import React, { Component } from "react";
import { Card, Form, Button, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MyToast from "./MyToast";
import axios from "axios";
import {
  faSave,
  faPlusSquare,
  faUndo,
  faList,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
//import axios from "axios";

class Book extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.state.show = false;
    this.bookChange = this.bookChange.bind(this);
    this.submitBook = this.submitBook.bind(this);
  }

  initialState = {
    id: "",
    title: "",
    author: "",
    url: "",
    isbn: "",
    language: "",
    price: "",
  };

  componentDidMount() {
    const bookId = +this.props.match.params.id;
    if (bookId) {
      axios
        .get("https://books-ops.herokuapp.com/rest/books/" + bookId)
        .then((response) => {
          if (response.data != null) {
            this.setState({
              id: response.data.id,
              title: response.data.title,
              author: response.data.author,
              url: response.data.coverPhotoURL,
              isbn: response.data.isbnNumber,
              language: response.data.language,
              price: response.data.price,
            });
          }
        })
        .catch((error) => {
          console.error("Error - " + error);
        });
    }
  }

  resetBook = () => {
    this.setState(() => this.initialState);
  };

  updateBook = (event) => {
    event.preventDefault();

    const books = {
      id: this.state.id,
      title: this.state.title,
      author: this.state.author,
      coverPhotoURL: this.state.url,
      isbnNumber: this.state.isbn,
      language: this.state.language,
      price: this.state.price,
    };
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(books),
    };

    fetch("https://books-ops.herokuapp.com/rest/books", requestOptions)
      .then(async (response) => {
        const data = await response.json();
        console.log("data >>>> " + data);
        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          this.setState({ show: false });
          return Promise.reject(error);
        } else {
          this.setState({ show: true });
          setTimeout(() => this.setState({ show: false, method: "put" }), 3000);
          setTimeout(() => this.bookList(), 4000);
        }
      })
      .catch((error) => {
        //this.setState({ errorMessage: error.toString() });
        console.error("There was an error!", error);
      });
    this.setState(this.initialState);
  };

  submitBook = (event) => {
    event.preventDefault();

    const books = {
      title: this.state.title,
      author: this.state.author,
      coverPhotoURL: this.state.url,
      isbnNumber: this.state.isbn,
      language: this.state.language,
      price: this.state.price,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(books),
    };

    fetch("https://books-ops.herokuapp.com/rest/books", requestOptions)
      .then(async (response) => {
        const data = await response.json();
        console.log("data >>>> " + data);
        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          this.setState({ show: false });
          return Promise.reject(error);
        } else {
          this.setState({ show: true, method: "post" });
          setTimeout(() => this.setState({ show: false }), 3000);
        }
      })
      .catch((error) => {
        //this.setState({ errorMessage: error.toString() });
        console.error("There was an error!", error);
      });
    this.setState(this.initialState);
  };

  bookList = () => {
    return this.props.history.push("/list");
  };

  bookChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { title, author, url, language, price, isbn } = this.state;
    return (
      <div>
        <div style={{ display: this.state.show ? "block" : "none" }}>
          <MyToast
            show={this.state.show}
            message={
              this.state.method === "post" ? "Book saved successfully!" : "Book updated successfully!"
            }
            type={"success"}
          />
        </div>
        <Card className="border border-dark bg-dark text-white">
          <Form
            onReset={this.resetBook}
            onSubmit={this.state.id ? this.updateBook : this.submitBook}
            id="bookFormId"
          >
            <Card.Header>
              <FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare} />
              {this.state.id ? "Update Book" : "Add Book"}
            </Card.Header>
            <Card.Body>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridTitle">
                  <Form.Label>Title </Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="text"
                    name="title"
                    value={title}
                    onChange={this.bookChange}
                    className={"bg-dark text-white"}
                    placeholder="Enter Book Title"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridAuthor">
                  <Form.Label>Author</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="text"
                    name="author"
                    value={author}
                    onChange={this.bookChange}
                    className={"bg-dark text-white"}
                    placeholder="Enter Book Author"
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridURL">
                  <Form.Label>Cover Photo URL </Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="text"
                    name="url"
                    value={url}
                    onChange={this.bookChange}
                    className={"bg-dark text-white"}
                    placeholder="Enter Book Cover Photo URL"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridISBN">
                  <Form.Label>ISBN Number</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="text"
                    name="isbn"
                    value={isbn}
                    onChange={this.bookChange}
                    className={"bg-dark text-white"}
                    placeholder="Enter Book ISBN Number"
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridLanguage">
                  <Form.Label>Language </Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="text"
                    name="language"
                    value={language}
                    onChange={this.bookChange}
                    className={"bg-dark text-white"}
                    placeholder="Enter Book Language"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPrice">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="text"
                    name="price"
                    value={price}
                    onChange={this.bookChange}
                    className={"bg-dark text-white"}
                    placeholder="Enter Book Price"
                  />
                </Form.Group>
              </Form.Row>
            </Card.Body>
            <Card.Footer style={{ textAlign: "right" }}>
              <Button size="sm" variant="success" type="submit">
                <FontAwesomeIcon icon={faSave} />{" "}
                {this.state.id ? "Update" : "Save"}
              </Button>{" "}
              <Button size="sm" variant="info" type="reset">
                <FontAwesomeIcon icon={faUndo} /> Reset
              </Button>{" "}
              <Button
                size="sm"
                variant="info"
                type="button"
                onClick={this.bookList.bind()}
              >
                <FontAwesomeIcon icon={faList} /> Book List
              </Button>
            </Card.Footer>
          </Form>
        </Card>
      </div>
    );
  }
}

export default Book;
