var ParterScraper = require('./scrape-parter.js');
var DouScraper = require('./scrape-dou.js'),
	debug = require('debug')('bot:scraper');


function makeScaraper(html){
	debug("makeScraper");
	if (html.indexOf('http://parter.ua') != -1){
		return new ParterScraper();
	}
	if (html.indexOf('http://dou.ua/calendar') != -1) {
		return new DouScraper();
	}
}

module.exports = function(html){
	debug("scraper export");
	return makeScaraper(html);
}