#!/usr/bin/env node
const yargs = require('yargs');
const path = require('path');
const fs = require('fs');
const printer = require('./util/printer');

async function run() {
  /** @type {any} */
  const argv = yargs.argv

  if (argv.lhr) {
    const reports = Array.isArray(argv.lhr) ? argv.lhr : [argv.lhr]
    
    reports.forEach(report => {
      if (!report.match(/.*\.json/)) return
      const lhrData = fs.readFileSync(path.join(__dirname, `${report}`));
      const lhr = JSON.parse(lhrData, 'utf-8');
      printer.logSummary(lhr)
    });
  }
}

run().catch(err => {
  process.stderr.write(err.stack);
  if (err.stdout) process.stderr.write(err.stdout);
  if (err.stderr) process.stderr.write(err.stderr);
  process.exit(1);
});