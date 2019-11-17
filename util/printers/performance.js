const specialCharacters = require('../specialCharacters')

function printCategory(lhr, ui) {
  perfRow(lhr, ui, 'first-contentful-paint', 'first-meaningful-paint')
  perfRow(lhr, ui, 'speed-index', 'first-cpu-idle')
  perfRow(lhr, ui, 'interactive', 'max-potential-fid')
}

function perfRow(lhr, ui, metric1, metric2) {
  ui.div(
    {
      text: '',
      width: 10
    },
    {
      text: `${specialCharacters.getScoreCharacter(lhr.audits[metric1].score)}`,
      padding: [0,1,0,0],
      width: 2
    },
    {
      text: `${lhr.audits[metric1].title}:`,
      width: 25,
    },
    {
      text: specialCharacters.colorScore(`${lhr.audits[metric1].score}`, `${lhr.audits[metric1].displayValue}`),
      width: 9,
      padding: [0,0,0,1]
    },
    {
      text: '',
      width: 2
    },
    {
      text: `${specialCharacters.getScoreCharacter(lhr.audits[metric2].score)}`,
      padding: [0,1,0,0],
      width: 2
    },
    {
      text: `${lhr.audits[metric2].title}:`,
      width: 32,
    },
    {
      text: specialCharacters.colorScore(`${lhr.audits[metric2].score}`, `${lhr.audits[metric2].displayValue}`),
      width: 9,
      padding: [0,0,0,1]
    }
  )
}

module.exports = printCategory;