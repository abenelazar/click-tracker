import React, { Component } from 'react';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar, Tooltip } from 'recharts';
import axios from 'axios';
import Card from './Card';
import Title from './Title';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';
import Chart from './Chart';

class Dash extends Component {

  state = {
    startDate: undefined,
    endDate: undefined,
    element: [],
    ip_addresses: [],
    links: [],
    today: new Date(),
    user_agent: [],
  }

  componentDidMount() {
    axios.get('http://localhost:8722/api/report/elements')
      .then(res => this.setState({ elements: res.data }))
      .catch(err => this.setState({ err: err }))
    axios.get('http://localhost:8722/api/report/ip_addresses')
      .then(res => this.setState({ ip_addresses: res.data }))
      .catch(err => this.setState({ err: err }))
    axios.get('http://localhost:8722/api/report/links')
      .then(res => this.setState({ links: res.data }))
      .catch(err => this.setState({ err: err }))
    axios.get('http://localhost:8722/api/report/user_agent')
      .then(res => this.setState({ user_agent: res.data }))
      .catch(err => this.setState({ err: err }))

  }

  onDatesChange = (startDate, endDate) => {
    console.log(startDate.startDate.toDate().toISOString().slice(0, 10))
    console.log(startDate.endDate && startDate.endDate.toDate().toISOString().slice(0, 10))
    this.setState(startDate, endDate);
    const start = (startDate && startDate.startDate) || (endDate && endDate.startDate);
    const end = (startDate && startDate.endDate) || (endDate && endDate.endDate);
    if(start && end) {
      let _start = start.toDate().toISOString().slice(0, 10);
      let _end = end.toDate()
      debugger;
      _end.setDate(_end.getDate() + 1)
      debugger;
      _end = _end.toISOString().slice(0, 10);
      axios.get(`http://localhost:8722/api/report/elements/${_start}/${_end}`)
      .then(res => this.setState({ elements: res.data }))
      .catch(err => this.setState({ err: err }))
      axios.get(`http://localhost:8722/api/report/user_agent/${_start}/${_end}`)
      .then(res => this.setState({ user_agent: res.data }))
      .catch(err => this.setState({ err: err }))
      axios.get(`http://localhost:8722/api/report/links/${_start}/${_end}`) 
      .then(res => this.setState({ links: res.data }))
      .catch(err => this.setState({ err: err }))
      axios.get(`http://localhost:8722/api/report/ip_addresses/${_start}/${_end}`) 
      .then(res => this.setState({ ip_addresses: res.data }))
      .catch(err => this.setState({ err: err }))
  
    } 

  };

  render() {
    return (
      <React.Fragment>
        <Card>
          <Title>
            Click Tracker
          </Title>
        </Card>
        <div className='date-picker-container'>
          <DateRangePicker
            startDate={this.state.startDate}
            startDateId="start-date"
            endDate={this.state.endDate}
            endDateId="end-date"
            onDatesChange={this.onDatesChange}
            isOutsideRange={date => date > this.state.today}
            focusedInput={this.state.focusedInput}
            onFocusChange={focusedInput => this.setState({ focusedInput })}
          />
        </div>
        <Chart
          data={this.state.elements}
          title='Clicks'
        />
        <Chart
          data={this.state.links}
          title='Links'
        />
        <Chart
          data={this.state.user_agent}
          title='User Agent'
        />
        <Chart
          data={this.state.ip_addresses}
          title='IP Adresses'
        />
      </React.Fragment>
    )
  }
}

export default Dash;
