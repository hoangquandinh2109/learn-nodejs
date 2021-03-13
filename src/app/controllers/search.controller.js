class SearchController {
  index(req, resp) {
    resp.render('search');
  }
}

module.exports = new SearchController();
