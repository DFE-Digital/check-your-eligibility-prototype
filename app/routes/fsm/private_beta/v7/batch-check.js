const express = require('express');
const router = express.Router();

router.post('/v7-batch-check', function (req, res) {
    console.log('Route hit');
    const batchCheckStatus = req.session.data['batch-check'];
    console.log('Batch Check Status:', batchCheckStatus);
    if (batchCheckStatus === "connect") {
        res.redirect('/FSM/Private_beta/v7/school/school-manage/batch-checking/school-mis/select-mis.html');
    } else if (batchCheckStatus === "manual") {
        res.redirect('/FSM/Private_beta/v7/school/school-manage/batch-checking/manual.html');
    } else {
        res.redirect('/FSM/Private_beta/v7/school/school-manage/batch-checking/manual-error.html');
    }
});

module.exports = router;

