export default class Logger {

  static d = 'background: #181818; color: #FFFFFF; padding: 3px'
  static c = 'background: none; color: none; margin-right: 1px'
  static r = 'background: #FF473E; color: #FFFFFF; padding: 3px'

  static say (str) {
    console.log('%c*%c%cLog', this.d, this.c, this.d, str)
  }

  static warn (str) {
    console.log('%c*%c%cWarn', this.r, this.c, this.r, str)
  }

}
