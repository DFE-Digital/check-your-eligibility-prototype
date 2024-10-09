function Pagination(data, pageNumber = 1, pageSize = 25) {
    this.data = data
    this.pageNumber = parseInt(pageNumber)
    this.pageSize = parseInt(pageSize)
    this.totalCount = this.data.length
    this.pageCount = Math.ceil(this.totalCount / this.pageSize)

    // Make sure the previous page exists
    if(this.pageNumber > 1) {
      this.previousPage = this.getPageItem(this.pageNumber - 1)
    }

    // Make sure the next page exists
    if(this.pageNumber < this.pageCount) {
      this.nextPage = this.getPageItem(this.pageNumber + 1)
    }

    this.firstResultNumber = this.getFirstResultNumber()
    this.lastResultNumber = this.getLastResultNumber()
    this.pageItems = this.getPageItems()
  }

  Pagination.prototype.getFirstResultNumber = function() {
    let firstResultNumber
    firstResultNumber = ((this.pageNumber * this.pageSize) - this.pageSize) + 1
    return firstResultNumber
  }

  Pagination.prototype.getLastResultNumber = function() {
    let lastResultNumber

    // Take first result number e.g. 1 or 51
    // Then add the page size e.g. 50
    // Then takeaway 1
    lastResultNumber = (this.firstResultNumber + this.pageSize) - 1

    // Adjust if it’s the last page in case the last result number is more than the totalCount
    if(lastResultNumber > this.totalCount) {
      lastResultNumber = this.totalCount
    }

    return lastResultNumber
  }

  Pagination.prototype.getData = function() {
    let pageNumber = this.pageNumber - 1 // because pages logically start with 1, but technically with 0
    return this.data.slice(pageNumber * this.pageSize, (pageNumber + 1) * this.pageSize)
  }

  Pagination.prototype.getPageItem = function(itemNumber) {
    return {
      number: itemNumber,
      href: '?page=' + itemNumber + '&limit=' + this.pageSize,
      current: true ? parseInt(this.pageNumber) === itemNumber : false
    }
  }

  Pagination.prototype.getPageItems = function() {
    let pageItems = []

    // Add every page in
    for (let i = 1; i <= this.pageCount; i++) {
      pageItems.push(this.getPageItem(i))
    }

    const threshold = 4
    const itemsToPad = 1
    const currentPageNumber = this.pageNumber
    const totalNumberOfPages = this.pageCount
    const ellipsis = { ellipsis: true }
    if (pageItems.length > 7) {

      let startPosition
      let removeCount

      // Current page within first 4 pages
      if(currentPageNumber <= threshold) {
        // Input => 1 2 3 [4] 5 6 7 8 9 10
        // Output => 1 2 3 [4] 5 ... 10

        startPosition = threshold + itemsToPad // would be 5 (from 6 onwards as zero based) in the above example

        // Comments based on above example
        removeCount = totalNumberOfPages // => 10
        removeCount = removeCount - itemsToPad // => 9 (account for last item)
        removeCount = removeCount - startPosition // => 4 (account for the start position)
        pageItems.splice(startPosition, removeCount, ellipsis)

      // Current page within final 4 pages
      } else if(currentPageNumber > (this.pageCount - threshold)) {
        // Input => 1 2 3 4 5 6 7 8 [9] 10
        // Output => 1 ... 5 6 7 [9] 10

        startPosition = 1 // from 2 onwards as zero based)

        // Comments based on above example
        removeCount = totalNumberOfPages // => 10
        removeCount = removeCount - threshold // => 6 (account for threshold at the end e.g. 7, 8, 9, 10)
        removeCount = removeCount - itemsToPad // => 5 (account for the padded number at the end e.g. [6] 7, 8, 9, 10)
        removeCount = removeCount - itemsToPad // => 4 (account for the first page "1")
        pageItems.splice(startPosition, removeCount, ellipsis)

      // Current page is not within the first 4 or final 4 pages
      } else {
        // Input => 1 2 3 4 5 [6] 7 8 9 10
        // Output => 1 ... 5 [6] 7 ... 10

        // Replace end portion
        startPosition = currentPageNumber + itemsToPad // to account for the padding
        removeCount = totalNumberOfPages - startPosition // to account for the items at the beginning being retained
        removeCount = removeCount - itemsToPad // to account for the last item being retained
        pageItems.splice(startPosition, removeCount, ellipsis)

        // Replace start portion
        startPosition = 1 // to retain the first page
        removeCount = currentPageNumber - itemsToPad // account for items to pad // 5
        removeCount = removeCount - itemsToPad // account for first page "1"
        removeCount = removeCount - 1 // account for current page being retained
        pageItems.splice(startPosition, removeCount, ellipsis)
      }
    }
    return pageItems
  }

  module.exports = Pagination