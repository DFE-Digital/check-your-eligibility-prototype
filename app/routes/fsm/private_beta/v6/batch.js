module.exports = function(router) { // Function to receive the router object

    router.get('/ticket-panel-errors', function (req, res) {
        res.render('ticket-panel-errors');
      });

}