const chalk = require('chalk')

// Set manually to make sure chalk colors in gh-actions.
chalk.level = 3;

function pwaRow(ui, icon, lhr, groupId) {
  const audits = lhr.categories['pwa'].auditRefs.filter(audit => audit.group === groupId).map(audit => audit.id)
  let pass = true
  audits.forEach(auditId => {
    if (lhr.audits[auditId].score < 1) {
      pass = false
    }
  })
  let colorFunc = chalk.red
  if (pass) {
    colorFunc = chalk.green
  }
  ui.div(
    {
      text: '',
      width: 10
    },
    {
      text: `${colorFunc(icon)}`,
      width: 2,
      padding: [0,1,0,0]
    },
    {
      text: `${colorFunc(lhr.categoryGroups[groupId].title)}`,
      width: 25
    },
  )
}

function printCategory(lhr, ui) {
  // ⧁ pwa-fast-reliable 
  // ⊕ pwa-installable
  // ✪ pwa-optimized

  pwaRow(ui, '⧁'/** ⎉ ⟴ ⧁ ⊘ */, lhr, 'pwa-fast-reliable')
  pwaRow(ui, '⊕', lhr, 'pwa-installable')
  pwaRow(ui, '✪', lhr, 'pwa-optimized')
}

module.exports = printCategory;