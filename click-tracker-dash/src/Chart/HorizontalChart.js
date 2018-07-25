import React, { Component } from 'react';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar, Tooltip } from 'recharts';
import Card from '../Card';

class HorizontalChart extends Component {

  render() {
    return (
        <Card className='horizontal-card'>
        {
          !this.props.data.length && !this.props.loading &&
          <div className='chart-no-data-message'>
            No data available for the specified range
          </div>
        }
          <ResponsiveContainer width='90%' height={this.props.data.length*70} >

            <BarChart layout='vertical' data={this.props.data}>
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

HorizontalChart.defaultProps = {
  data: [],
}

export default HorizontalChart;
