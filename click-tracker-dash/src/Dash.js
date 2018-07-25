import React, { Component } from 'react';
import axios from 'axios';
import Card from './Card';
import Title from './Title';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';
import Chart from './Chart';
import HorizontalChart from './HorizontalChart';
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
    axios.get('/api/report/elements')
      .then(res => this.setState({ elements: res.data }))
      .catch(err => this.setState({ err: err }))
    axios.get('/api/report/ip_addresses')
      .then(res => this.setState({ ip_addresses: res.data }))
      .catch(err => this.setState({ err: err }))
    axios.get('/api/report/links')
      .then(res => this.setState({ links: res.data }))
      .catch(err => this.setState({ err: err }))
    axios.get('/api/report/user_agent')
      .then(res => this.setState({ user_agent: res.data, loading: false }))
      .catch(err => this.setState({ err: err }))

  }

  formatDates = (start, end) => {
    let _start = start.toDate().toISOString().slice(0, 10);
    let _end = end.toDate()
    _end.setDate(_end.getDate() + 1)
    _end = _end.toISOString().slice(0, 10);
    return { _start, _end };
  }

  onDatesChange = (startDate, endDate) => {
    this.setState(startDate, endDate);
    const start = (startDate && startDate.startDate) || (endDate && endDate.startDate);
    const end = (startDate && startDate.endDate) || (endDate && endDate.endDate);
    if (start && end) {
      const { _start, _end } = this.formatDates(start, end);
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
    let dates;
    if(this.state.startDate && this.state.endDate) {
      dates = this.formatDates(this.state.startDate, this.state.endDate);
    }
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
        <HorizontalChart
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
        <Card>
           <a download="tracking.csv"
              href={dates ? `/api/download/${dates._start}/${dates._end}` : '/api/download'} className='download-btn'>
            Download DB
          </a>
        </Card>
      </React.Fragment>
    )
  }
}

export default Dash;
