const edgePadding = 5

class DOM {
  get svg() {
    return document.getElementById('svg')
  }

  get gridSize() {
    return document.getElementById('grid-pattern').width.baseVal.value
  }

  isShape(el) {
    return el.classList.contains('shape')
  }

  canResize() {
    return svg.classList.contains('resize')
  }

  snap(val) {
    return Math.round(val / this.gridSize) * this.gridSize
  }

  min(val) {
    return Math.max(val, this.gridSize)
  }

  getMousePosition(e) {
    const ctm = this.svg.getScreenCTM()
    return {
      x: (e.clientX - ctm.e) / ctm.a,
      y: (e.clientY - ctm.f) / ctm.d,
    }
  }

  getOffset(e) {
    const pos = this.getMousePosition(e)
    return {
      x: pos.x - e.target.x.baseVal.value,
      y: pos.y - e.target.y.baseVal.value,
    }
  }

  drag(e, offset) {
    const pos = this.getMousePosition(e)
    return {
      x: this.snap(pos.x - offset.x),
      y: this.snap(pos.y - offset.y),
    }
  }

  resize(e, id) {
    const r = {}
    const el = this.getAttributes(id)
    if (this.svg.classList.contains('north')) {
      r.y = Math.min(this.snap(e.clientY), el.height + el.y - this.gridSize)
      r.height = this.min(el.height + el.y - this.snap(e.clientY))
    }
    if (this.svg.classList.contains('south')) {
      r.height = this.min(this.snap(e.clientY - el.y))
    }
    if (this.svg.classList.contains('west')) {
      r.x = Math.min(this.snap(e.clientX), el.width + el.x - this.gridSize)
      r.width = this.min(el.width + el.x - this.snap(e.clientX))
    }
    if (this.svg.classList.contains('east')) {
      r.width = this.min(this.snap(e.clientX - el.x))
    }
    return r
  }

  getAttributes(id) {
    const el = document.getElementById(id)
    return {
      x: el.x.baseVal.value,
      y: el.y.baseVal.value,
      width: el.width.baseVal.value,
      height: el.height.baseVal.value,
    }
  }

  getClassName(e) {
    const edges = []
    const d = this.getDistance(e)
    if (d.north <= 0 + edgePadding) edges.push('north')
    if (d.south <= 1 + edgePadding) edges.push('south')
    if (d.west <= 0 + edgePadding) edges.push('west')
    if (d.east <= 1 + edgePadding) edges.push('east')
    if (edges.length > 0) {
      return `resize ${edges.join(' ')}`
    }
    return 'drag'
  }

  getDistance(e) {
    const el = this.getAttributes(e.target.id)
    const d = {
      north: e.clientY - el.y,
      west: e.clientX - el.x,
    }
    d.south = el.height - d.north
    d.east = el.width - d.west
    return d
  }
}

export default new DOM()
