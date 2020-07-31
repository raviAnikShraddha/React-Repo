import React, { Component } from "react";
import { Card, Table, InputGroup, FormControl, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faStepBackward,
  faStepForward,
  faFastBackward,
  faFastForward,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
class CustomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      currentPage: 1,
      usersPerPage: 5,
    };
  }

  componentDidMount() {
    axios
      .get(
        "https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole"
      )
      .then((response) => response.data)
      .then((data) => {
        this.setState({
          users: data,
        });
      });
  }

  firstPage = () => {
    if (this.state.currentPage > 1) {
      this.setState({
        currentPage: 1,
      });
    }
  };

  prevPage = () => {
    if (this.state.currentPage > 1) {
      this.setState({
        currentPage: this.state.currentPage - 1,
      });
    }
  };

  nextPage = () => {
    if (
      this.state.currentPage <
      Math.ceil(this.state.users.length / this.state.usersPerPage)
    )
      this.setState({
        currentPage: this.state.currentPage + 1,
      });
  };

  lastPage = () => {
    if (
      this.state.currentPage <
      Math.ceil(this.state.users.length / this.state.usersPerPage)
    ) {
      this.setState({
        currentPage: Math.ceil(
          this.state.users.length / this.state.usersPerPage
        ),
      });
    }
  };

  changePageNumber = (event) => {
    this.setState({
      [event.target.name]: parseInt(event.target.value),
    });
  };

  render() {
    const { users, currentPage, usersPerPage } = this.state;
    const totalPage = users.length / usersPerPage;
    const lastIndex = currentPage * usersPerPage;
    const firstIndex = lastIndex - usersPerPage;
    const currentUsers = users.slice(firstIndex, lastIndex);
    const pageCss = {
      width: "45px",
      border: "1px solid #17A2B8",
      color: "#17A2B8",
      textAlign: "center",
      fontWeight: "bold",
    };

    return (
      <div>
        <Card className="border border-dark bg-dark text-white">
          <Card.Header>
            <FontAwesomeIcon icon={faUsers} /> User List
          </Card.Header>
          <Card.Body>
            <Table bordered hover striped variant="dark">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Created</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                {this.state.users.length === 0 ? (
                  <tr>
                    <td colSpan="6" className={"text-center"}>
                      No Records Available
                    </td>
                  </tr>
                ) : (
                  currentUsers.map((users, index) => (
                    <tr key={index}>
                      <td>{users.first}</td>
                      <td>{users.last}</td>
                      <td>{users.email}</td>
                      <td>{users.address}</td>
                      <td>{users.created}</td>
                      <td>{users.balance}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Card.Body>
          <Card.Footer>
            <div style={{ float: "left" }}>
              Showing Page {currentPage} of {totalPage}
            </div>
            <div style={{ float: "right" }}>
              <InputGroup size="md">
                <InputGroup.Prepend>
                  <Button
                    variant={"outline-info"}
                    disabled={currentPage === 1 ? true : false}
                    onClick={this.firstPage}
                  >
                    <FontAwesomeIcon icon={faFastBackward} /> First
                  </Button>
                  <Button
                    variant={"outline-info"}
                    disabled={currentPage === 1 ? true : false}
                    onClick={this.prevPage}
                  >
                    <FontAwesomeIcon icon={faStepBackward} /> Prev
                  </Button>
                </InputGroup.Prepend>
                <FormControl
                  style={pageCss}
                  className={"bg-dark"}
                  name="currentPage"
                  value={currentPage}
                  onChange={this.changePageNumber}
                />
                <InputGroup.Append>
                  <Button
                    variant={"outline-info"}
                    disabled={currentPage === totalPage ? true : false}
                    onClick={this.nextPage}
                  >
                    <FontAwesomeIcon icon={faStepForward} /> Next
                  </Button>
                  <Button
                    variant={"outline-info"}
                    disabled={currentPage === totalPage ? true : false}
                    onClick={this.lastPage}
                  >
                    <FontAwesomeIcon icon={faFastForward} /> Last
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </div>
          </Card.Footer>
        </Card>
      </div>
    );
  }
}

export default CustomList;
