const reporter = require('cucumber-html-reporter');
const dotenv = require('dotenv').config();

const browser = process.env.BROWSER;


const options = {
    theme: 'bootstrap',
    jsonFile: 'reports/cucumber_report.json',
    output: 'reports/cucumber_report.html',
    reportSuiteAsScenarios: true,
    launchReport: true,
    metadata: {
        "App Version": "1.0.0",
        "Test Environment": browser,
        "Browser": "Chromium",
        "Platform": "MacOS",
        "Parallel": "Scenarios",
        "Executed": "Local"
    }
};

reporter.generate(options);