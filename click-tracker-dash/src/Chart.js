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
          <ResponsiveContainer width='100%' height={300} >
            <BarChart width={800} height={300} data={this.props.data}>
              <XAxis interval={0} dataKey="key" />
              <YAxis interval={0} />
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
