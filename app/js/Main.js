import Logger from './util/Logger'
import App from './App'

class Main {

  constructor () {

    Logger.say('spike-path')
    Logger.warn('Version: 1.0.0')

    window.Main = this

    this.app = new App()
    this.app.path.initialize() // dummy call

    // Resize listener
    window.onresize = () => {
      this.onResize()
    }
  }

  onResize (e) {
    this.app.resize()
  }

}
window.Main
window.WebFont.load({
  custom: {
    families: ['Roboto']
  },
  active: () => {
    window.Main = new Main()
  }
})
