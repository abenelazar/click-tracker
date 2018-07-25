import React, { Component } from 'react';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar, Tooltip } from 'recharts';
import Card from './Card';
import Title from './Title';

class Chart extends Component {

  render() {
    return (
        <Card>
          <Title>
            { this.props.title }
        </Title>
        {
          !this.props.data.length && !this.props.loading &&
          <div className='chart-no-data-message'>
            No data available for the specified range
          </div>
        }
          <ResponsiveContainer width='100%' height={this.props.data.length*100} >
            <BarChart layout={this.props.layout} data={this.props.data}>
              <XAxis type='number' />
              <YAxis type='category' dataKey="key" />
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
