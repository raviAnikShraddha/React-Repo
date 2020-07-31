import React, { Component } from "react";
import { Navbar, Container, Col } from "react-bootstrap";
class Footer extends Component {
  render() {
    let mydate = new Date().getFullYear();
    return (
      <Navbar fixed="bottom" bg="dark" variant="dark">
        <Container>
          <Col lg={12} className="text-center text-muted">
            <div>
              {mydate}, {mydate + 1} All right reserved by Ravi CoDeEnGiNe...
            </div>
          </Col>
        </Container>
      </Navbar>
    );
  }
}

export default Footer;
