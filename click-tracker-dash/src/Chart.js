import React, { Component } from 'react';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar, Tooltip } from 'recharts';
import axios from 'axios';
import Card from './Card';
import Title from './Title';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

class Chart extends Component {

  render() {
    return (
        <Card>
          <Title>
            { this.props.title }
        </Title>
        {
          !this.props.data.length &&
          <div className='chart-no-data-message fade-in'>
            No data available for the specified range
          </div>
        }
          <ResponsiveContainer width='100%' height={300} >
            <BarChart width={800} height={300} data={this.props.data}>
                <XAxis dataKey="key" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
    )
  }
}

Chart.defaultProps = {
  data: [],
}

export default Chart;
