import Path from './view/graphic/path/Path'

/**
 * App class
 */

export default class App {

  /**
   * App constructror
   */

  constructor () {

    this.el = document.getElementById('app')
    this.stage = null
    this.path = null
    this.container = null
    this.shapes = null
    this.mouseEnabled = false

    this.addEvents()
    this.addScene()
    this.addContainer()

    this.update()
  }

  /**
   * Events handler
   */

  addEvents () {

    if (this.isTouchDevice()) {

      this.el.addEventListener('touchmove', (e) => { this.onTouchMove(e) })
      this.el.addEventListener('touchend', (e) => { this.onTouchEnd(e) })

    } else {

      window.addEventListener('mouseout', (e) => { this.onMouseOut(e) })
      window.addEventListener('blur', (e) => { this.disableMouse() })
      window.addEventListener('focus', (e) => { this.disableMouse() })
      window.addEventListener('mousemove', (e) => { this.onMouseMove(e) })

    }

  }

  /**
   * Scene handler
   */

  addScene () {
    let canvas = document.createElement('canvas')
    canvas.id = 'canvas'
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    this.el.appendChild(canvas)

    this.stage = new window.createjs.Stage('canvas')
  }

  addContainer () {
    this.container = new window.createjs.Container()
    this.stage.addChild(this.container)

    this.path = new Path()
    this.container.addChild(this.path)
  }

  /**
   * Mouse controller
   */

   enableMouse () {
     this.mouseEnabled = true
   }

   disableMouse () {
     this.mouseEnabled = false
   }

   onMouseMove (e) {
     if (this.path) {
       this.type = !this.mouseEnabled ? Path.PATH_INIT : Path.PATH_KEEP
       this.path.addAt(e.pageX, e.pageY, this.type)
       this.enableMouse()
     }
   }

   onMouseOut (e) {

     let right = window.innerWidth - e.pageX
     let left = e.pageX
     let top = e.pageY
     let bottom = window.innerHeight - e.pageY

     let d = Math.min(right, left, top, bottom)
     switch (d) {
       case right:
         this.path.addAt(window.innerWidth + 100, e.pageY, Path.PATH_KEEP, false)
         break
       case left:
         this.path.addAt(-100, e.pageY, Path.PATH_KEEP, false)
         break
       case top:
         this.path.addAt(e.pageX, -100, Path.PATH_KEEP, false)
         break
       case bottom:
         this.path.addAt(e.pageX, window.innerHeight + 100, Path.PATH_KEEP, false)
         break
     }

     this.disableMouse()
   }

   onTouchMove (e) {
     e.preventDefault()
     this.type = !this.mouseEnabled ? Path.PATH_INIT : Path.PATH_KEEP
     this.path.addAt(e.changedTouches[0].pageX, e.changedTouches[0].pageY, this.type)
     this.enableMouse()
   }

   onTouchEnd (e) {
     this.disableMouse()
   }

   isTouchDevice () {
     return (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0))
   }

  /**
   * Update
   */

  update () {

    // loop
    window.requestAnimationFrame(() => {
      this.update()
    })

    // path
    if (this.path) { this.path.update() }

    // render
    this.stage.update()
  }

  /**
   * Resize
   */

   resize () {
     this.stage.canvas.width = window.innerWidth
     this.stage.canvas.height = window.innerHeight
   }
}
