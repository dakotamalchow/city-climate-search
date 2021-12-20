import React, { Component } from "react";

class App extends Component {
  state = {
    message: null
  }

  componentDidMount() {
    this.getData()
      .then(data => this.setState({message: data.message}))
      .catch(error => console.log(error));
  }

  getData = async () => {
    const response = await fetch("http://localhost:5000/");
    const data = await response.json();

    if(response.status !== 200) {
      throw Error(data.message);
    }
    return data;
  }

  render() {
    return (
      <div>
        <pre>{this.state.message}</pre>
      </div>
    );
  }
}

export default App;
