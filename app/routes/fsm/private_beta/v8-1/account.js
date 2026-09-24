module.exports = function(router) {

    router.post('/FSM/Private_beta/v8-1/family/account/onegov-signin', (req, res) => {
        req.session.data.user = {};
        res.redirect('/account/enter-password');
    });

    router.get('/FSM/Private_beta/v8-1/family/account/signout', (req, res) => {
        req.session.data.user = null;
        res.redirect('/FSM/Private_beta/v8-1/family/account/signin-or-create');
    });

}