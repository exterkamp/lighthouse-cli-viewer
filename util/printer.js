const ui = require('cliui')()
const chalk = require('chalk');
const specialCharacters = require('./specialCharacters');

// Set manually to make sure chalk colors in gh-actions.
chalk.level = 3;

function logSummary(lhr) {
  console.log(lhr.finalUrl)
  for (const key in lhr.categories) {
    const category = lhr.categories[key]
    let scoreFunc = chalk.red
    if (category.score >= 0.9) {
      scoreFunc = chalk.green
    } else if (category.score >= 0.5) {
      scoreFunc = chalk.yellow
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
