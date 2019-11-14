const axios = require("axios")

const getGithubJobs = async (location) => {
    const res = await axios.get(`https://jobs.github.com/positions.json?location=${location}`)

    return res.data
}
module.exports = getGithubJobs