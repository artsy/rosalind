import dateFormats from './date-formats'

describe('dateFormats', () => {
  describe('when the input is null', () => {
    it('.long returns null', () => {
      const formatted = dateFormats.long(null)
      expect(formatted).toEqual(null)
    })

    it('.default returns null', () => {
      const formatted = dateFormats.default(null)
      expect(formatted).toEqual(null)
    })
  })

  describe('when the input is a date object', () => {
    it('.long returns a date', () => {
      const date = new Date()
      const formatted = dateFormats.long(date).split(' ')
      expect(formatted.length).toEqual(5)
    })

    it('.default returns a date', () => {
      const date = new Date()
      const formatted = dateFormats.default(date).split('T')
      expect(formatted.length).toEqual(2)
    })
  })

  describe('when the input is a date string', () => {
    it('.long returns a date', () => {
      const date = 'January 01, 2015, 12:00:00 pm'
      const formatted = dateFormats.long(date).split(' ')
      expect(formatted.length).toEqual(5)
    })

    it('.default returns a date', () => {
      const date = 'January 01, 2015, 12:00:00 pm'
      const formatted = dateFormats.default(date).split('T')
      expect(formatted.length).toEqual(2)
    })
  })
})
