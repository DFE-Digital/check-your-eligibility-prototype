const searchPath = '/FSM/Private_beta/v8-4/school/school-manage/report/search'
const searchView = 'FSM/Private_beta/v8-4/school/school-manage/report/search'

module.exports = router => {
  router.get(searchPath, (req, res, next) => {
    const keyword = String(req.query.keywords || '').trim().toLowerCase()

    if (!keyword) {
      return next()
    }

    res.render(searchView, (error, html) => {
      if (error) {
        return next(error)
      }

      const rows = html.match(/<tr\b[^>]*>[\s\S]*?<\/tr>/gi) || []
      const matchingRow = rows.find(row => {
        const rowText = row
          .replace(/<[^>]*>/g, ' ')
          .replace(/&nbsp;/gi, ' ')
          .replace(/&amp;/gi, '&')
          .replace(/&lt;/gi, '<')
          .replace(/&gt;/gi, '>')
          .replace(/&quot;/gi, '"')
          .replace(/&#39;/gi, "'")
          .replace(/\s+/g, ' ')
          .toLowerCase()

        return rowText.includes(keyword)
      })
      const recordLink = matchingRow?.match(/<th\b[^>]*>[\s\S]*?<a\b[^>]*href=["']([^"']+)["']/i)

      if (recordLink) {
        const destination = new URL(recordLink[1], `http://localhost${searchPath}`)
        return res.redirect(destination.pathname)
      }

      return res.send(html)
    })
  })
}
