module.exports = function routes (app) {
  app.use('/', require('./index'));
  app.use('/api', require('./api'));
  app.use('/generator', require('./generator'));
  app.use('/events', require('./events'));
  app.use('/events/find', require('./events'));
};
