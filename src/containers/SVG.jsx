import React from 'react'
import {connect} from 'react-redux'
import {createShape, updateShape, updateSelection} from '../redux/modules/svg'
import DOM from '../util/DOM'
import Grid from '../components/Grid'
import Shape from '../components/Shape'
import './SVG.scss'

const defaults = {
  gridSize: 10,
  shapeWidth: 50,
  shapeHeight: 50,
}

class SVG extends React.Component {
  render() {
    return (
      <svg
        id="svg"
        className={`svg ${this.props.className}`}
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        onMouseDown={e => this.onMouseDown(e)}
        onMouseMove={e => this.onMouseMove(e)}
        onMouseLeave={() => this.onMouseLeave()}
        onMouseUp={() => this.onMouseUp()}>
        <Grid size={this.props.gridSize} />
        {this.props.shapes.map(shape => (
          <Shape
            key={shape.id}
            id={shape.id}
            x={shape.x}
            y={shape.y}
            width={shape.width}
            height={shape.height}
          />
        ))}
      </svg>
    )
  }

  onMouseDown(e) {
    if (!DOM.isShape(e.target)) {
      this.createShape(e)
      return
    }
    if (DOM.canResize()) {
      this.resizeStart(e)
      return
    }
    this.dragStart(e)
  }

  onMouseMove(e) {
    if (this.props.selection) {
      if (DOM.canResize()) {
        this.resize(e)
        return
      }
      this.drag(e)
      return
    }
    if (DOM.isShape(e.target)) {
      this.hoverShape(e)
      return
    }
    this.props.updateSelection('', this.props.selection)
  }

  onMouseLeave() {
    if (this.props.selection) {
      this.props.updateSelection('', null)
    }
  }

  onMouseUp() {
    if (this.props.selection) {
      this.props.updateSelection('', null)
    }
  }

  createShape(e) {
    const pos = DOM.getMousePosition(e)
    this.props.createShape({
      x: DOM.snap(pos.x),
      y: DOM.snap(pos.y),
      width: defaults.shapeWidth,
      height: defaults.shapeHeight,
    })
  }

  hoverShape(e) {
    this.props.updateSelection(DOM.getClassName(e), this.props.selection)
  }

  dragStart(e) {
    this.props.updateSelection(this.props.className, {
      id: e.target.id,
      offset: DOM.getOffset(e),
    })
  }

  drag(e) {
    this.props.updateShape(
      this.props.selection.id,
      DOM.drag(e, this.props.selection.offset),
    )
  }

  resizeStart(e) {
    this.props.updateSelection(this.props.className, {
      id: e.target.id,
    })
  }

  resize(e) {
    this.props.updateShape(
      this.props.selection.id,
      DOM.resize(e, this.props.selection.id),
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state.svg,
    gridSize: defaults.gridSize,
  }
}

export default connect(
  mapStateToProps,
  {
    createShape,
    updateShape,
    updateSelection,
  },
)(SVG)
