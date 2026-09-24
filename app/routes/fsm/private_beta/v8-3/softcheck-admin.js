module.exports = function (router) {
  //LA routes for soft check

  // router.post('/v8-3-la-softcheck', function (req, res) {
  //   var niNumber = req.session.data['ni-number'];
  //   var enteredNiNumber = req.session.data['ni-number-entered'];
  //   if (niNumber === "yes") {
  //     if (enteredNiNumber) {
  //       res.redirect('/FSM/Private_beta/v8-3/LA/la-manage/la-soft-check/checking-loader');
  //     } else {
  //       res.redirect('/FSM/Private_beta/v8-3/LA/la-manage/la-soft-check/error-ni');
  //     }
  //   } else {
  //     res.redirect('/FSM/Private_beta/v8-3/LA/la-manage/la-soft-check/nass-number');
  //   }
  // });

  router.post("/soft-check-ni-answer", function (req, res) {
    var niNumber = req.session.data["ni-number"];
    var enteredNiNumber = req.session.data["ni-number-entered"];
    if (niNumber === "yes") {
      if (enteredNiNumber) {
        res.redirect(
          "/FSM/Private_beta/v8-3/MAT/mat-manage/mat-soft-check/checking-loader"
        );
      } else {
        res.redirect(
          "/FSM/Private_beta/v8-3/MAT/mat-manage/mat-soft-check/error-ni"
        );
      }
    } else {
      res.redirect(
        "/FSM/Private_beta/v8-3/MAT/mat-manage/mat-soft-check/nass-number"
      );
    }
  });

};
