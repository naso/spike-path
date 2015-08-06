import Point from 'vecmath'
import Utils from '../../../util/Utils'

export default class Segment extends window.createjs.Container {

  constructor (path, point, color, colorOut, spikiness = 2) {

    super()

    Segment.ALIVE_TIME = 1

    this.bpoint = null // begin point
    this.mpoint = null // middle point
    this.upoint = null // middle up point
    this.dpoint = null // middle down point
    this.epoint = point // end point

    this.shape = null
    this.segment = null
    this.highlightOut = null
    this.mvector = null
    this.time = null
    this.data = null

    this.path = path
    this.alive = true
    this.start = Date.now()
    this.color = this.getColorShade(color)
    this.colorOut = this.getHSL(colorOut)
    this.spikiness = spikiness
    this.index = this.path.segments.length

    this.initialize()
  }

  initialize () {
    this.calc()
    this.shape = this.getShape(this.color)
    this.path.addChild(this.shape)
  }

  calc () {

    // previous / begin point
    let ppoint = new Point.Vector2(window.Main.app.path.segments[this.index - 1].epoint.x, window.Main.app.path.segments[this.index - 1].epoint.y)
    this.bpoint = ppoint

    // middle point
    this.mpoint = new Point.Vector2((ppoint.x + this.epoint.x) / 2, (ppoint.y + this.epoint.y) / 2)

    // middle vector
    let length = (ppoint.distance(this.epoint) / 2) * Utils.randomIntFromInterval(1, this.spikiness)

    let dx = ppoint.x - this.epoint.x * Utils.randomIntFromInterval(1, this.spikiness)
    let dy = ppoint.y - this.epoint.y * Utils.randomIntFromInterval(1, this.spikiness)

    let angle = Math.atan2(dy, dx) + (Math.PI / 2)

    let p0 = new Point.Vector2(-length * Math.cos(angle), -length * Math.sin(angle))
    let p1 = new Point.Vector2(length * Math.cos(angle), length * Math.sin(angle))

    // middle up point
    this.upoint = new Point.Vector2(this.mpoint.x - p0.x, this.mpoint.y - p0.y)

    // middle down point
    this.dpoint = new Point.Vector2(this.mpoint.x - p1.x, this.mpoint.y - p1.y)
  }

  getShape (color) {

    // previous point
    let pshape = this.path.segments[this.index - 1]

    let shape = new window.createjs.Shape()
    shape.x = this.mpoint.x
    shape.y = this.mpoint.y
    shape.graphics.beginFill(color)
    shape.graphics.setStrokeStyle(1)
    shape.graphics.beginStroke(color)

    // rect shape
    if (pshape instanceof Segment) {
      shape.graphics.moveTo(Math.round(this.mpoint.x - this.dpoint.x), Math.round(this.mpoint.y - this.dpoint.y))
      shape.graphics.lineTo(Math.round(pshape.upoint.x - this.mpoint.x), Math.round(pshape.upoint.y - this.mpoint.y))
      shape.graphics.lineTo(Math.round(pshape.dpoint.x - this.mpoint.x), Math.round(pshape.dpoint.y - this.mpoint.y))
      shape.graphics.lineTo(Math.round(this.mpoint.x - this.upoint.x), Math.round(this.mpoint.y - this.upoint.y))
      shape.graphics.lineTo(Math.round(this.mpoint.x - this.dpoint.x), Math.round(this.mpoint.y - this.dpoint.y))
      shape.graphics.endFill()
    } else {
      shape.graphics.moveTo(0, 0)
      shape.graphics.lineTo(this.mpoint.x - this.dpoint.x, this.mpoint.y - this.dpoint.y)
      shape.graphics.lineTo(pshape.epoint.x - this.mpoint.x, pshape.epoint.y - this.mpoint.y)
      shape.graphics.lineTo(this.mpoint.x - this.upoint.x, this.mpoint.y - this.upoint.y)
      shape.graphics.endFill()
    }

    return shape
  }

  update () {

    if (this.alive && Segment.ALIVE_TIME > 0) {
      let elapsed = (Date.now() - this.start) / 1000
      if (elapsed > Segment.ALIVE_TIME) {
        this.destroy()
      }
    }

  }

  destroy () {

    this.alive = false

    // colour animation out
    window.TweenMax.to(this.upoint, 0.75, {x: this.mpoint.x, y: this.mpoint.y, ease: window.Expo.easeInOut})
    window.TweenMax.to(this.dpoint, 0.75, {x: this.mpoint.x, y: this.mpoint.y, ease: window.Expo.easeInOut, onUpdate: () => {
      let pshape = window.Main.app.path.segments[this.index - 1]
      if (pshape instanceof Segment) {
        this.shape.graphics.clear()
        this.shape.graphics.beginFill(this.colorOut)
        // this.shape.graphics.setStrokeStyle(1)
        // this.shape.graphics.beginStroke('#FFFFFF', 0.4)
        this.shape.graphics.moveTo(Math.round(this.mpoint.x - this.dpoint.x), Math.round(this.mpoint.y - this.dpoint.y))
        this.shape.graphics.lineTo(Math.round(pshape.upoint.x - this.mpoint.x), Math.round(pshape.upoint.y - this.mpoint.y))
        this.shape.graphics.lineTo(Math.round(pshape.dpoint.x - this.mpoint.x), Math.round(pshape.dpoint.y - this.mpoint.y))
        this.shape.graphics.lineTo(Math.round(this.mpoint.x - this.upoint.x), Math.round(this.mpoint.y - this.upoint.y))
        this.shape.graphics.lineTo(Math.round(this.mpoint.x - this.dpoint.x), Math.round(this.mpoint.y - this.dpoint.y))
        this.shape.graphics.endFill()
      }
    }, onComplete: () => {
      window.Main.app.path.removeChild(this.shape)
    }})

    // window.TweenMax.to(this.shape, 0.75, {alpha: 0, delay: 0.25, ease: window.Expo.easeNone, onComplete: () => {
    //
    // }})
  }

  getColorShade (color) {
    return window.createjs.Graphics.getHSL(color.h, color.s, Utils.randomIntFromInterval(color.l - 20, color.l))
  }

  getHSL (color) {
    return window.createjs.Graphics.getHSL(color.h, color.s, color.l)
  }
}
