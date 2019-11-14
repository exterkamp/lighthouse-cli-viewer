const ui = require('cliui')()
const log = require('lighthouse-logger')
const specialCharacters = require('./specialCharacters');

function logSummary(lhr) {
  console.log(lhr.finalUrl)
  for (const key in lhr.categories) {
    const category = lhr.categories[key]
    let scoreFunc = log.redify
    if (category.score >= 0.9) {
      scoreFunc = log.greenify
    } else if (category.score >= 0.5) {
      scoreFunc = function (/** @type {string} */str) {
        return `${log.yellow}${str}${log.reset}`
      }
    }
    
    // Print out the generic header.
    printCategoryHeader(category, scoreFunc)

    // Get printer
    const printer = getPrinter(category.id)
    if (printer) printer(lhr, ui)
  }
  console.log(ui.toString())
  ui.resetOutput()
}

function printCategoryHeader(category, scoreFunc) {
  ui.div(
    {
      text: `${specialCharacters.colorScore(category.score, specialCharacters.getGauge(category.score))}`,
      width: 5,
      align: 'right',
      padding: [0, 1, 0, 0]
    },
    {
      text: `${category.title}:`,
      width: 25,
    },
    {
      text: scoreFunc(`${category.score}`),
    }
  )
}

function getPrinter(categoryId) {
  if (!['performance', 'pwa'].includes(categoryId)) return undefined
  return require(`./printers/${categoryId}`);
}

module.exports = {logSummary}
