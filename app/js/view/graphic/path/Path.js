import Segment from './Segment'
import Point from 'vecmath'

export default class Path extends window.createjs.Container {

  constructor () {
    super()

    Path.PATH_INIT = 'init'
    Path.PATH_KEEP = 'keep'
    Path.MIN_DISTANCE = 4
    Path.MAX_DISTANCE = 150

    this.segments = []
  }

  addAt (x, y, type = Path.PATH_KEEP, spikiness = 3) {

    let index = this.segments.length
    let ppoint

    if (type === Path.PATH_INIT || index === 0) {
      ppoint = new Point.Vector2(x, y)
      this.segments.push({epoint: ppoint})
    } else {
      ppoint = new Point.Vector2(this.segments[index - 1].epoint.x, this.segments[index - 1].epoint.y)
    }

    let p1 = new Point.Vector2(x, y)

    this.addSegment(p1, spikiness)
  }

  addSegment (point, spikiness) {
    let s = new Segment(this, point, {h: 3, s: 76, l: 59}, {h: 0, s: 0, l: 82}, spikiness)
    this.segments.push(s)
  }

  update () {
    let i = this.segments.length
    if (i >= 0) {
      while (i--) {
        if (this.segments[i].update) {
          this.segments[i].update()
        }
      }
    }
  }

}
