class HomeController {
  index(req, resp) {
    resp.render('home');
  }
}

module.exports = new HomeController();
