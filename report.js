var reporter = require("cucumber-html-reporter");

var options = {
  theme: "bootstrap",
  jsonFile: "cucumber_report.json",
  output: "cucumber_report.html",
  screenshotsDirectory: "screenshots",
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: false,
  storeScreenshots: false,
  metadata: {
    "App Version": "1.0",
    "Test Environment": "Development",
    Browser: "Chrome  78.0.3904.97",
    Platform: "Linux Mint 18",
    Parallel: "Scenarios"
  }
};

reporter.generate(options);
