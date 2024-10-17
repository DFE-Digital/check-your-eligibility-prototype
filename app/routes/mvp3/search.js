const _ = require('lodash')
const Pagination = require('../helpers/pagination')

module.exports = router => {

    router.get('/search_1', (req, res) => {
        let selectedStatusFilters = _get(req.session.data.flters, 'statuses')

        //status filter//
        if(_.get(selectedStatusFilters, 'length')){
            applications = applications.filter(application => {
                let matchesStatus = true


                //entitled, evidence needed, sent for review//

                matchesStatus = selectedStatusFilters.includes(application.status)


            })
        }


 return matchesStatus
    })


}