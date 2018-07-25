import React, { Component } from 'react';
import HorizontalChart from './HorizontalChart';
import VerticalChart from './VerticalChart';

class Chart extends Component {

  render() {
    return (
      this.props.horizontal ?
          <HorizontalChart { ...this.props } /> :
          <VerticalChart { ...this.props } />
    )
  }
}

Chart.defaultProps = {
  data: [],
}

export default Chart;
