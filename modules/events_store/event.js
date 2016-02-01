module.exports = function(info) {

    var values = {
        id: null,
        title: null,
        description: null,
        image: null,
        location: null,
        startDate: null,
        startTime: null,
        startDateTime: null,
        endDate: null,
        endTime: null,
        endDateTime: null,
        price: null,
        priceHigh: null,
        priceLow: null,
        priceCurr: null,
        type: null,
        eventUrl: null,
        orderUrl: null
    }

    for(var prop in values) {
        if(values[prop] !== 'undefined') {
            values[prop] = info[prop];
        }
    }

    var functions = {
        getInformation: function () {
            return values;
        },
        setDateTime: function (date, time) {
            //to-Do
            values.startDate = null;
            values.startTime = null;
        }
    }

    return functions;
}
