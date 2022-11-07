export default function numbersToTime(time) {
  if (time) {
    if (time.toString().length < 3) {
      const minutes = ':00'
      return time.toString() + minutes
    } else {
      return time.toString().replace('.5', ':30')
    }
  }
}