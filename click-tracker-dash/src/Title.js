import React, { Component } from 'react';

class Title extends Component {

  render() {
    return (
        <h1 className='chart-card-title'>
          { this.props.children}
        </h1>
    );
  }
}

export default Title;
