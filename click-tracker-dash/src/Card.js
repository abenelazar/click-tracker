import React, { Component } from 'react';
import classnames from 'classnames';

class Card extends Component {

  render() {
    return (
        <div className={classnames("chart-card", this.props.className)}>
          { this.props.children }
        </div>
    );
  }
}

export default Card;
