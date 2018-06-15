'use strict'

const round = (value, decimals) => Number(Math.round(value + 'e' + decimals) + 'e-' + decimals)

module.exports = round
