import React from 'react'
import PropTypes from 'prop-types'
import './Grid.scss'

export default class Grid extends React.Component {
  render() {
    return (
      <g className="grid">
        <defs>
          <pattern
            id="grid-pattern"
            patternUnits="userSpaceOnUse"
            width={this.props.size}
            height={this.props.size}>
            <rect
              fill="none"
              x="0"
              y="0"
              width={this.props.size}
              height={this.props.size}
            />
          </pattern>
        </defs>
        <rect
          fill="url(#grid-pattern)"
          x="0"
          y="0"
          width="100%"
          height="100%"
        />
      </g>
    )
  }
}

Grid.propTypes = {
  size: PropTypes.number.isRequired,
}
