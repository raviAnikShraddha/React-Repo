import React, { Component } from "react";
class Tute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   count: 0,
      message: "ravi",
    };
  }

  increment() {
    // this code not incrementing on the html but increment on console
    //   this.state.count = this.state.count + 1;
    //   console.log('counter -> ', this.state.count);
    // to increment th e counter in html u have to use
    // this.setState({
    //   count: this.state.count + 1,
    // });
    // u have to also use the call back function
    // this.setState({ count: this.state.count + 1 }, () => {
    //   console.log("counter -> ", this.state.count);
    // });
  }
  incrementFive() {
    this.setState({
      message: "Ravi Good bye",
    });

    // this.increment();
    // this.increment();
    // this.increment();
    // this.increment();
    // this.increment();
  }

  render() {
    return (
      <div>
        Welcome {this.props.name} !<h1>{this.props.children}</h1>
        <div>Counter -- {this.state.message}</div>
        {/* 
                First approach with bind
        <button onClick={this.incrementFive.bind(this)}>Counter</button> */}
                {/* Second approach with arrow function */}
        <button onClick={() => this.incrementFive()}>Counter</button>
      </div>
    );
  }
}

export default Tute;
