const axios = require("axios")
const getGithubJobs = require("../apiCalls/github")

const cleanGithubResponse = (jobsArray) => {
    // cleans each 'job' object sent through from github into a form suitable for the front-end
    return jobsArray.map(job => {
        const cleanedJob = {}
        cleanedJob.id = job.id
        cleanedJob.url = job.url
        cleanedJob.company = job.company
        cleanedJob.location = job.location
        cleanedJob.title = job.title
        cleanedJob.company_logo = job.company_logo
        cleanedJob.created_at = new Date(job.created_at).toUTCString()

        return cleanedJob
    })
}
const getJobs = async (req, res, next) => {
    const location = req.query.location

    try {
        const jobsArray = await getGithubJobs(location)
        if (jobsArray.length === 0) {
            res.status(404).send("no jobs found")
            res.end()
        } else {
            const cleanJobsArray = cleanGithubResponse(jobsArray)
            res.status(200).send(cleanJobsArray)
            res.end()
        }
    } catch (error) {
        res.status(404).send("Couldn't do the get request to  github")
        res.end()
    }
}


module.exports = { getJobs, cleanGithubResponse }