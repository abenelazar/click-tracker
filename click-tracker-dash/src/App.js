import React, { Component } from 'react';
import axios from 'axios'
import Dash from './Dash';
import Error from './Error';
import './chart.css'

class App extends Component {


  state = {
    elements: undefined,
    ip_addresses: undefined,
    user_agent: undefined,
    err: undefined,
  };

  componentWillMount() {
    axios.get('http://localhost:8722/api/report/elements')
      .then(res => this.setState({ elements: res.data }))
      .catch(err => this.setState({ err: err }))
    axios.get('http://localhost:8722/api/report/ip_addresses')
      .then(res => this.setState({ ip_addresses: res.data }))
      .catch(err => this.setState({ err: err }))
    /*
    axios.get('http://localhost:8722/api/report/links')
      .then(res => this.setState({ links: res.data }))
      .catch(err => this.setState({ err: err }))
    axios.get('http://localhost:8722/api/report/user_agent')
      .then(res => this.setState({ user_agent: res.data }))
      .catch(err => this.setState({ err: err }))*/
  }

  render() {
    return (
      <div className="click-tracker-dash">
        {
          this.state.err ?
          <Error err={this.state.err} /> :
          <Dash
            elements={this.state.elements}
            ip_addresses={this.state.ip_addresses}
            links={this.state.links}
            user_agent={this.state.user_agent}
          />
        }
      </div>
    );
  }
}

export default App;
