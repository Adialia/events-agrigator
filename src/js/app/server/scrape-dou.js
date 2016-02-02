//http://dou.ua/calendar/
var request = require('request'),
    debug = require('debug')('bot:scrape-dou'),
    cheerio = require('cheerio');

//var html = 'http://dou.ua/calendar';
//503 ERROR!!!

function DouScraper(){
    debug("DouScraper constructor");
    this.html = 'http://dou.ua/calendar';
}

DouScraper.prototype.getEventUrls = function(){
    debug("getEventUrls");
    //debug("this.html",this.html);
    var html = this.html;
    var promise = new Promise(function(resolve,reject){
    scrapeMainPage(html)
        .then(scrapeSecondaryPages)
        .then(function(allUrls){
            debug("allUrls, resolved getEventUrls",allUrls.length);
            resolve(allUrls);
        })
        .catch(function(err){
            reject(err);});
    });
    return promise; 
};

DouScraper.prototype.scrapeEventPage = function(fullUrl) {
    debug("DouScraper scrapeEventPage begin");
    var promise = new Promise(function(resolve, reject) {
    request(fullUrl,function(err,resp,body){
        if (!err && resp.statusCode == 200){
            debug("scrapeEventPage request is successfull");
            var $ = cheerio.load(body,{
                decodeEntities: false
            });
            debug("createModel begin");

            var eventTitle, eventLocation, eventDescription, eventTime = [], 
                eventLink, eventImage, eventPrice;
            var eventPage = $('div.cell.g-right-shadowed.mobtab-maincol');
            //console.log(eventPage);
            eventLink = fullUrl;
            eventTitle = $('div.page-head',eventPage).text().trim();
            //console.log(eventTitle);
            eventLocation = $("div.event-info > div:nth-child(4) > div.dd",eventPage).text().trim();
            eventImage = $('div.event-info > img').attr('src');
            eventDescription = $("article",eventPage).text().trim();
            var eventDate = $("div.event-info > div:nth-child(2) > div.dd",eventPage).text().trim();
            eventTime = $("div.event-info > div:nth-child(3) > div.dd",eventPage).text().trim();
            eventPrice = $("div.event-info > div:nth-child(5) > div.dd",eventPage).text().trim();
            //promise
            var model = {
                eventTitle: eventTitle,
                eventLocation: eventLocation,
                eventLink: eventLink,
                eventDescription: eventDescription,
                eventTime: eventDate+', '+eventTime,
                eventPrice: eventPrice,
                eventImage: eventImage
            }
            //console.log("createModel",model);
            debug("createModel resolve");
            resolve(model);
        }
        else{
            debug("ERROR in scrapeEventPage", "response code:", resp.statusCode);
            reject(err);
        }
    });
    });
    debug("return promise");
    return promise;
};

function scrapeMainPage(html){
    debug("scrapeMainPage",html);
    var promise = new Promise(function(resolve, reject) {
        request(html, function(error, resp, body){

            if (!error && resp.statusCode == 200){
                debug("Request passed");
                var $ = cheerio.load(body);
                var pageQuantity = $('div.b-paging > span:last-of-type').prev().text();
                var urls = findDouUrls($);
                debug("resolve of scrapeMainPage:", pageQuantity, urls.length);
                var result = {
                    pageQuantity: pageQuantity,
                    urls: urls,
                    html: html
                };
                resolve(result);

            }
            else{
                debug("error in scrapeMainPage");
                reject(error);
            };
        });
    });
    return promise;
};

function scrapeSecondaryPages(result){
    var promise = new Promise(function(resolve,reject){
    var pageQuantity = result.pageQuantity, 
        html = result.html,
        urls = result.urls;
    debug("first batch: ", urls.length,pageQuantity);
    var urlsArray = [];
    //6 should be changed to pageQuantity
    //now it throughs 503 error
    for (var i = 2; i <= 6; i++){
        var pageUrl = html+'/page-'+i; 
        //debug("pageUrl:",pageUrl);
        urlsArray.push(pageUrl);
    }
    debug(urlsArray);   
    var arrayOfPromises =  urlsArray.map(scrapeSingleSecondaryPage);
    Promise.all(arrayOfPromises)
        .then(function(arrayOfResults){
            var newUrls = [].concat.apply([], arrayOfResults);
            urls = urls.concat(newUrls);
            debug("FINAL!!!!!!!!",urls.length);
            resolve(urls);        
        }).catch(function(err,pageUrl){
            // log that I have an error, return the entire array;
             console.log('A promise failed to resolve', err, "at", pageUrl);
             reject(err);
            //return arrayOfPromises;
        });   
    });
    return promise;
};

function scrapeSingleSecondaryPage(pageUrl){
    debug("scrapeSecondaryDouPage");
    //console.log("pageUrl",pageUrl);
    var promise = new Promise(function(resolve,reject){
    request(pageUrl, function(err, resp, body){
        if (!err && resp.statusCode == 200){
            var $ = cheerio.load(body);
            var urls = findDouUrls($);
            debug(pageUrl,"is loaded, urls:", urls.length);
            resolve(urls);
        }
        else{ 
            console.log("scrapeSingleSecondaryPage ERROR at ",pageUrl, err,resp.statusCode);
            if (err){
                reject(err);
            }
            
        };
    });
    });
    return promise;
};

function findDouUrls($){
    var urls = [];
    $('div.event > div.title > a').each(function(eventTag){
        var url = $(this).attr('href');
        //debug("url in findDouUrls",url);
        urls.push(url);
    });
    return urls;
}

module.exports = DouScraper;


