import React, { Component } from 'react';
import axios from 'axios';
import Card from './Card';
import Title from './Title';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';
import Chart from './Chart';
import Error from './Error';

class Dash extends Component {

  state = {
    startDate: undefined,
    endDate: undefined,
    elements: [],
    ip_addresses: [],
    links: [],
    user_agent: [],
    today: new Date(),
    err: null,
    loading: true,
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
      .then(res => this.setState({ user_agent: res.data, loading: false }))
      .catch(err => this.setState({ err: err }))

  }

  onDatesChange = (startDate, endDate) => {
    this.setState(startDate, endDate);
    const start = (startDate && startDate.startDate) || (endDate && endDate.startDate);
    const end = (startDate && startDate.endDate) || (endDate && endDate.endDate);
    if (start && end) {
      let _start = start.toDate().toISOString().slice(0, 10);
      let _end = end.toDate()
      _end.setDate(_end.getDate() + 1)
      _end = _end.toISOString().slice(0, 10);
      axios.get(`/api/report/elements/${_start}/${_end}`)
        .then(res => this.setState({ elements: res.data }))
        .catch(err => this.setState({ err }))
      axios.get(`/api/report/user_agent/${_start}/${_end}`)
        .then(res => this.setState({ user_agent: res.data }))
        .catch(err => this.setState({ err }))
      axios.get(`/api/report/links/${_start}/${_end}`)
        .then(res => this.setState({ links: res.data }))
        .catch(err => this.setState({ err }))
      axios.get(`/api/report/ip_addresses/${_start}/${_end}`)
        .then(res => this.setState({ ip_addresses: res.data }))
        .catch(err => this.setState({ err }))
    }

  };

  render() {
    return (
      <React.Fragment>
        <Card>
          <Title>
            Click Tracker Dashboard
          </Title>
        </Card>
        {
          this.state.err && 
          <Error err={this.state.err} />
        }
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
          loading={this.state.loading}
        />
        <Chart
          data={this.state.links}
          title='Links'
          loading={this.state.loading}
        />
        <Chart
          data={this.state.user_agent}
          title='User Agent'
          loading={this.state.loading}
        />
        <Chart
          data={this.state.ip_addresses}
          title='IP Addresses'
          loading={this.state.loading}
        />
      </React.Fragment>
    )
  }
}

export default Dash;
