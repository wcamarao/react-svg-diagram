import React from 'react'
import PropTypes from 'prop-types'
import './Shape.scss'

const R = 2

export default class Shape extends React.Component {
  render() {
    return (
      <rect
        className="shape"
        id={this.props.id}
        x={this.props.x}
        y={this.props.y}
        width={this.props.width}
        height={this.props.height}
        rx={R}
        ry={R}
      />
    )
  }
}

Shape.propTypes = {
  id: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
}
