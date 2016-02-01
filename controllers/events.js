exports.allEvents = function() {
  var events =  require('../modules/eventsGenerator');
  return events.generateEvents();
};
