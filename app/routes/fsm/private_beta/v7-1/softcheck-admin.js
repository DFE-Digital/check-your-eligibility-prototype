module.exports = function (router) {
  //LA routes for soft check

  // router.post('/v7-1-la-softcheck', function (req, res) {
  //   var niNumber = req.session.data['ni-number'];
  //   var enteredNiNumber = req.session.data['ni-number-entered'];
  //   if (niNumber === "yes") {
  //     if (enteredNiNumber) {
  //       res.redirect('/FSM/Private_beta/v7-1/LA/la-manage/la-soft-check/checking-loader');
  //     } else {
  //       res.redirect('/FSM/Private_beta/v7-1/LA/la-manage/la-soft-check/error-ni');
  //     }
  //   } else {
  //     res.redirect('/FSM/Private_beta/v7-1/LA/la-manage/la-soft-check/nass-number');
  //   }
  // });

  //mvp3//
  router.post("/mvp3-soft-check-ni-answer", function (req, res) {
    // variable
    var niNumber = req.session.data["ni-number"];
    var enteredNiNumber = req.session.data["ni-number-entered"];
    //check variable
    if (niNumber === "yes") {
      if (enteredNiNumber) {
        res.redirect(
          "/FSM/Private_beta/v7-1/LA/la-manage/la-soft-check/checking-loader"
        );
      } else {
        res.redirect(
          "/FSM/Private_beta/v7-1/LA/la-manage/la-soft-check/error-ni"
        );
      }
    } else {
      res.redirect(
        "/FSM/Private_beta/v7-1/LA/la-manage/la-soft-check/nass-number"
      );
    }
  });
  // Route for soft check NI answer
  // router.post('/FSM/Private_beta/v7-1-soft-check-ni-answer', function (req, res) {
  //   var niNumber = req.session.data['ni-number'];
  //   var enteredNiNumber = req.session.data['ni-number-entered'];

  //   if (niNumber === "yes") {
  //     if (enteredNiNumber) {
  //       res.redirect('/FSM/Private_beta/v7-1/family/parent-soft-check/checking-loader');
  //     } else {
  //       res.redirect('/FSM/Private_beta/v7-1/family/parent-soft-check/error-ni');
  //     }
  //   } else {
  //     res.redirect('/FSM/Private_beta/v7-1/family/parent-soft-check/nass-number');
  //   }
  // });
};
