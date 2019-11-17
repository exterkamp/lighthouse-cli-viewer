const chalk = require('chalk');

function getScoreCharacter(score) {
  if (score >= 0.9) {
    return `${chalk.green('●')}`
  } else if (score >= 0.5) {
    return `${chalk.yellow('■')}`
  }
  return `${chalk.red('▲')}`
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
    return `${chalk.green(displayValue)}`
  } else if (score >= 0.5) {
    return `${chalk.yellow(displayValue)}`
  }
  return `${chalk.red(displayValue)}`
}

module.exports = {getScoreCharacter, getGauge, colorScore}