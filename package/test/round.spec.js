'use strict'

const round = require('../src/round')

test('Round 10.5981 to two decimals', () => {
  expect(round(10.5881, 2)).toBe(10.59)
})

test('Round 7.12345956 to nearest whole number', () => {
  expect(round(7.12345956, 0)).toBe(7)
})
