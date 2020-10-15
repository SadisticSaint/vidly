import React, { Component } from 'react';

class Like extends Component {
  render() {
    let classes = 'fa fa-heart';
    classes += this.props.liked === true ? '' : '-o';
    return (
      <i onClick={this.props.onClick} className={classes} aria-hidden="true" />
    );
  }
}

export default Like;
