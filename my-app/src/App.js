import React, { Component } from 'react';
import './App.css';
class Result extends Component {
  render(){
    if (!this.props.show){
      return null;
    }
    else {
      return <p>{this.props.message}</p>
    }
  }
}
class DForm extends Component{
  constructor(props){
    super(props);
    this.state = {start: "", dir:"", message: "", loaded: false};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e, val) {
    this.setState({[val]: e.target.value});
  }
  handleSubmit(e) {
    e.preventDefault();
    fetch(`http://api.bart.gov/api/etd.aspx?cmd=etd&orig=${this.state.start}&dir=${this.state.dir}&key=MW9S-E7SL-26DU-VV8V&json=y`)
      .then((res) => res.json())
      .then((data) => {
          if (data.root.message.warning) {
            this.setState({
              message: data.root.message.warning, 
              loaded: true
            });
          }
          else{
            this.setState({
              message: `A train heading towards ${data.root.station[0]["etd"][0]["destination"]} will arrive in ${data.root.station[0].etd[0].estimate[0].minutes} minutes.`,
              loaded: true
            })
          }
      },
        (err) => {
            this.setState({
              message: "Invalid input.",
              loaded: true
            })
        }
    );
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
        <Result show={this.state.loaded} message={this.state.message}/>
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
