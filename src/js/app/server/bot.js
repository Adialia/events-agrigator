// run scraping process

var Model = require('./model'),
	Scraper = require('./scraper.js'),
	request = require('request'),
	debug = require('debug')('bot'),
    cheerio = require('cheerio');

module.exports = function(){
	var sourses = ['http://parter.ua',"http://dou.ua/calendar"];
	sourses.forEach(runScraper);
}();

function runScraper(site){
	Scraper(site).getEventUrls().then(function(parterEventsUrls) {
		parterEventsUrls.forEach(processEventPage);
	})
	.catch(function(err){
		console.error(err);
	});	
}

function processEventPage(fullUrl, index, array){
	debug("processEventPage");
	debug("start of model creation", fullUrl);
	var scraper = Scraper(fullUrl);
	scraper.scrapeEventPage(fullUrl)
		.then(addEventToDatabase)
		.catch( function(error) {
			debug("processEventPage error ", error, fullUrl);
		});
};

function addEventToDatabase(eventData){
	   	var parterEvent = new Model(eventData);
	   	debug("addEventToDatabase", parterEvent.eventTitle);
	   	parterEvent.save(function(err) {
	       if (err) {debug('Database err saving: ' + url);}
	   	});
 };


