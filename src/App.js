import React from "react";
import "./App.css";
//import Tute from "./Tute";
//import FunLevel from "./component/FunLevel";
//import PersonList from "./component/PersonList";
import Welcome from "./component/Welcome";
import Footer from "./component/Footer";
import Book from "./component/Book";
import BookList from "./component/BookList";
import CustomList from "./component/CustomList";
import NavigationBar from "./component/NavigationBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

function App() {
  const marginTop = {
    marginTop: "20px",
  };

  const heading = "Welcome to Book Shop";
  const quote =
    "Good friends, good books, and a sleepy conscience: this is ideal life";
  const footer = "Mark Twain";

  return (
    <div className="">
      {/* <PersonList /> */}
      {/* <Tute name="ravi" >
              <p>This is the statement ....</p>
            </Tute>  */}
      {/* <FunLevel /> */}

      <Router>
        <NavigationBar />
        <Container>
          <Row>
            <Col lg={12} style={marginTop}>
              <Switch>
                <Route
                  path="/"
                  exact
                  component={() => (
                    <Welcome heading={heading} quote={quote} footer={footer} />
                  )}
                ></Route>
                <Route path="/add" exact component={Book}></Route>
                <Route path="/edit/:id" exact component={Book}></Route>
                <Route path="/list" exact component={BookList}></Route>
                <Route path="/users" exact component={CustomList}></Route>
              </Switch>
            </Col>
          </Row>
        </Container>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
