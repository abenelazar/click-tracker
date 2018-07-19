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

export default Chart;
