const log = require('lighthouse-logger')

function getScoreCharacter(score) {
  if (score >= 0.9) {
    return `${log.greenify('●')}`
  } else if (score >= 0.5) {
    return `${log.yellow}■${log.reset}`
  }
  return `${log.redify('▲')}`
}

function getGauge(score) {
  // ◔ ◗ ◕ ●
  if (score === 1) {
    return '●'
  } else if (score >= 0.75) {
    return '◕'
  } else if (score >= 0.5) {
    return '◗'
  }
  return '◔'
}

function colorScore(score, displayValue) {
  if (score >= 0.9) {
    return `${log.greenify(displayValue)}`
  } else if (score >= 0.5) {
    return `${log.yellow}${displayValue}${log.reset}`
  }
  return `${log.redify(displayValue)}`
}

module.exports = {getScoreCharacter, getGauge, colorScore}