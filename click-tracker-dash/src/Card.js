import React, { Component } from 'react';

import './chart.css'

class Card extends Component {

  render() {
    return (
        <div className="chart-card">
          { this.props.children }
        </div>
    );
  }
}

export default Card;
