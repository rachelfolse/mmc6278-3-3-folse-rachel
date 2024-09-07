require('dotenv').config()
const express = require('express')
const app= express()
// TODO: import the getCityInfo and getJobs functions from util.js
const jobsAPI = require('./util')

app.use(express.json())

// TODO: Statically serve the public folder
app.use(express.static('public'))

// TODO: declare the GET route /api/city/:city
// This endpoint should call getCityInfo and getJobs and return
// the result as JSON.
app
.route('/api/city/:city')
.get(async (req, res) => {
    const city = req.params.city
    try {
        const cityInfo = await jobsAPI.getCityInfo(city)
        const jobs = await jobsAPI.getJobs(city)
        // If no city info or jobs are found,
        // the endpoint should return a 404 status
        if (!cityInfo && !jobs) {
            return res.status(404).json({error: 'No jobs or city info found'})
        } else {
        // The returned JSON object should have two keys:
        // cityInfo (with value of the getCityInfo function)
        // jobs (with value of the getJobs function)
            return res.json({
                cityInfo: cityInfo,
                jobs: jobs
            })
        }
    } catch(err) {
        if ([401, 403, 404, 500].includes(err.status)) {
            return res.status(404).json({error: err.message})
        } 
    }
})



module.exports = app
