import React, { Component } from 'react';
import Card from './Card';
import Title from './Title';

class Error extends Component {

  render() {
    return (
      <Card>
        <Title>
          { this.props.err.message }
        </Title>
        <div className='error-stack-trace'>
          { this.props.err.stack }
        </div>
      </Card>
    );
  }
}

export default Error;
