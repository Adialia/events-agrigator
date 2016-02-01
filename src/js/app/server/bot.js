// run scraping process

var Model = require('./model');
var Scraper = require('./scraper.js');
var request = require('request'),
	debug = require('debug')('bot'),
    cheerio = require('cheerio');


/*var parterScraper = Scraper('http://parter.ua');
parterScraper.getEventUrls('http://parter.ua').then(function(parterEventsUrls) {
	debug("parterEventsUrls");
	parterEventsUrls.forEach(processEventPage);
});*/


var douScraper = Scraper("http://dou.ua/calendar");
douScraper.getEventUrls();



function processEventPage(fullUrl, index, array){
	debug("processEventPage");
	//var fullUrl = html + url;
	debug("start of model creation", fullUrl);
	var scraper = Scraper(fullUrl);
	scraper.scrapeEventPage(fullUrl).then(addEventToDatabase, 
		function(error) {debug("processEventPage error ", error, fullUrl);
});
};

function addEventToDatabase(eventData){
	   	var parterEvent = new Model(eventData);
	   	debug("addEventToDatabase", parterEvent.eventTitle);
	   	parterEvent.save(function(err) {
	       if (err) {debug('Database err saving: ' + url);}
	   	});
 };




/*
var html3 = "http://dou.ua/calendar/9637/";
var scraper2 = Scraper(html2);
scraper2.scrapeEventPage(html3).then(function(model){
	console.log("promised title", model);
}, function(error) {console.log("ERROR DOU SCRAPE", error, html3);})*/
