import React, { Component } from 'react';

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
