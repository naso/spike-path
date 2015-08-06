export default class Utils {

  static randomIntFromInterval (min, max, decimalPlaces) {
    var number = Math.random() * (max - min) + min
    if (decimalPlaces === null || decimalPlaces === undefined) {
      return number
    } else {
      return Number(number.toFixed(decimalPlaces))
    }
  }
  
}

window.Utils = Utils
