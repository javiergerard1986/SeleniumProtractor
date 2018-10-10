var data = require('./configData.json');
var Jasmine2HtmlReporter = require('./node_modules/protractor-jasmine2-html-reporter');

exports.config = {
	seleniumAddress : data.seleniumAddress,
	framework : data.framework,
	onPrepare : function() {
		browser.get(data.url);
		browser.manage().window().maximize();
		jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
            takeScreenshots: data.takeScreenshots,
            takeScreenshotsOnlyOnFailures: data.takeScreenshotsOnlyOnFailures,
            consolidateAll: data.consolidateAll,
            savePath: data.savePath,
            fileName: data.fileName
          }));
	},
	allScriptsTimeout: 60000,
    getPageTimeout: 30000,
	jasmineNodeOpts: {
		showColors: data.showColors,
		showTiming: data.showTiming,
		defaultTimeoutInterval: data.defaultTimeoutInterval
	},
	specs : [ data.specs ]
};