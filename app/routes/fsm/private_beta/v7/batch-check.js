const express = require('express');
const router = express.Router();

/// Batch-check-connect ///
router.post('/v7-batch-check', function (req, res) {
    // Retrieve user selection from session data
    const batchCheckStatus = req.session.data['batch-check'];
    if (batchCheckStatus === "connect") {
        res.redirect('/FSM/Private_beta/V7/school-i1/school-manage/batch-checkingschool-mis/select-mis.html');
    } else if (batchCheckStatus === "manual") {
        res.redirect('/FSM/Private_beta/V7/school-i1/school-manage/batch-checking/manual.html');
    } else {
        res.redirect('/FSM/Private_beta/V7/school-i1/school-manage/batch-checking/manual-error.html');
    }
});

// Make sure the router is exported
module.exports = router;

