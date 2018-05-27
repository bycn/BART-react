import React, { Component } from 'react';
import './App.css';

class DForm extends Component{
  constructor(props){
    super(props);
    this.state = {start: "", dir:""};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e, val) {
    this.setState({[val]: e.target.value});
  }
  handleSubmit(e) {
    e.preventDefault();
    alert(this.state.start);
    alert(this.state.dir);
  }
  render(){ 
    return (
      <form onSubmit={this.handleSubmit}>
        <label> Start: <br />
         <input value={this.state.start} onChange={(e) => this.handleChange(e, "start")}/>
        </label>
        <br />
        <label> Direction: <br />
          <input value={this.state.dir} onChange={(e) => this.handleChange(e,"dir")}/>
        </label>
        <br />
        <input type="submit" value="Submit"/>
      </form>
    )
  }
}
class App extends Component {
  render() {
    return (
      <div>
        <h1>Bart app to learn React</h1>
        <p>
          Enter your nearest station and the direction you'd like to go to find the nearest trains!
        </p>
        <div>
          <DForm />
        </div>
      </div>
    );
  }
}

export default App;
