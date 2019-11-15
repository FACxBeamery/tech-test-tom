const axios = require("axios")

const getGithubJobs = async (location) => {
    try {
        const res = await axios.get(`https://jobs.github.com/positions.json?location=${location}`)

        return res.data
    } catch (error) {
        console.error(error)
    }
}
module.exports = getGithubJobs