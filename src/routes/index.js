import homeRouter from './home.route';
import searchRouter from './search.route';

function route(app) {
  app.get('/', homeRouter);

  app.get('/search', searchRouter);

  app.post('/search', (req, res) => {
    res.render('search');
  });
}
module.exports = route;
