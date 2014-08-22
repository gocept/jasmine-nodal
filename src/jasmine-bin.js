#! /usr/bin/env node

var
	path = require('path'),
	util = require('util'),
	modules = [];

var
	mj = require("./jasmine"),
	jasmine = mj.jasmine;

mj.extend(global, mj.jasmineInterface);
global.jasmine = jasmine;

var
	showColors = true,
	jUnit = false,
	args = process.argv.slice(2);

args.forEach(function(arg)
{
	switch (arg) {
		case '--color':
			showColors = true;
			break;
		case '--noColor':
			showColors = false;
			break;
		case '--junit':
			jUnit = true;
			break;
		default:
			modules.push(arg);
	}
});

modules.forEach(function (module)
{
	module = path.resolve(module);
	require(module);
});

var
	jasmineEnv = jasmine.getEnv(),
	consoleReporter = new jasmine.ConsoleReporter(
	{
		showColors: showColors,
		print: util.print,
		timer: new jasmine.Timer()
	}),
    junitReporter = new jasmineReporters.JUnitXmlReporter({
        savePath: '.',
        consolidateAll: false
    });

jasmineEnv.addReporter(consoleReporter);
if (jUnit) {
    jasmineEnv.addReporter(junitReporter);
}
jasmineEnv.execute();
