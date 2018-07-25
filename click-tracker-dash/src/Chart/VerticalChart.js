import React, { Component } from 'react';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar, Tooltip } from 'recharts';
import Card from '../Card';

class VerticalChart extends Component {

  render() {
    return (
        <Card>
        {
          !this.props.data.length && !this.props.loading &&
          <div className='chart-no-data-message'>
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

VerticalChart.defaultProps = {
  data: [],
}

export default VerticalChart;
