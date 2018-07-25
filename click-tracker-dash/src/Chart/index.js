import React, { Component } from 'react';
import HorizontalChart from './HorizontalChart';
import VerticalChart from './VerticalChart';
import Title from '../Title';

class Chart extends Component {

  state = {
    checked: this.props.horizontal,
  }

  render() {
    return (
      <React.Fragment>
        <div class='chart-header'>
          <Title>
              { this.props.title }
          </Title>
          <div className='chart-options'>
            <span>Toggle horizontal/vertical display</span>
            <input type="checkbox" checked={this.state.checked} onClick={() => this.setState({checked: !this.state.checked})} />
          </div>
        </div>
        {
          this.state.checked ?
            <HorizontalChart { ...this.props } /> :
            <VerticalChart { ...this.props } />
        }
      </React.Fragment>
    )
  }
}

Chart.defaultProps = {
  data: [],
}

export default Chart;
