import moment from 'moment'

const dateFormats = {
  long: date => {
    const formatted = isNull(date) ? null : longFormat(date)
    return formatted
  },

  default: date => {
    const formatted = isNull(date) ? null : defaultFormat(date)
    return formatted
  },
}

function longFormat(input) {
  const date = isDate(input) ? input : new Date(input)
  return moment(date).format('MMMM Do YYYY, h:mm:ss a')
}

function defaultFormat(input) {
  const date = isDate(input) ? input : new Date(input)
  return moment(date).format()
}

function isNull(date) {
  return date === null
}

function isDate(input) {
  return Object.prototype.toString.call(input) === '[object Date]'
}

export default dateFormats
