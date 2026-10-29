module.exports = function (router) {
  const claimChildPath = '/FSM/Private_beta/v8-4/school/school-manage/transfer/claim-child'

  router.post(`${claimChildPath}/verify-multiple`, function (req, res) {
    const body = req.body || {}
    const day = String(body['passport-issued-day'] || '').trim().padStart(2, '0')
    const month = String(body['passport-issued-month'] || '').trim().padStart(2, '0')
    const year = String(body['passport-issued-year'] || '').trim()

    let outcome = 'child-found-not-linked.html'
    if (day === '01' && month === '06' && year === '2020') {
      outcome = 'child-found-linked.html'
    } else if (day === '06' && month === '12' && year === '2020') {
      outcome = 'child-found-dupes.html'
    }

    return res.redirect(`${claimChildPath}/${outcome}`)
  })

  router.post('/FSM/Private_beta/v8-4/verify/:childId', function (req, res) {
    const decision = req.body && req.body.decision
    const outcomes = ['approve-transfer', 'reject-transfer']

    if (!outcomes.includes(decision)) {
      return res.status(400).send('Select whether to approve or reject the transfer request.')
    }

    const childId = encodeURIComponent(req.params.childId)
    return res.redirect(
      `/FSM/Private_beta/v8-4/school/school-manage/transfer/incoming-request/${decision}-${childId}`
    )
  })

  router.post(`${claimChildPath}/verified`, function (req, res) {
    const identifier = String((req.body && (req.body.parentIdentifier || req.body.parentNino)) || '')
      .trim()
      .toUpperCase()

    let outcome
    if (!identifier) {
      outcome = 'child-found-your-school.html'
    } else if (identifier === 'AB123456A' || identifier === '98340002A') {
      outcome = 'child-found-linked.html'
    } else if (identifier === '98331122M') {
      outcome = 'child-found-multiple.html'
    } else if (identifier === '98345678A') {
      outcome = 'child-found-linked-archived.html'
    } else if (identifier === 'NL123456A') {
      outcome = 'child-found-not-linked.html'
    } else {
      outcome = 'child-not-found.html'
    }

    return res.redirect(`${claimChildPath}/${outcome}`)
  })
}
