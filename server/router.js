'use strict'
const express = require("express")
const getJobs = require("./handlers/getJobs").getJobs

const router = express()
/// router.use(express.static("public")) // don't think we need this - research
router.get('/', (err, res) => {
    res.status(200);
    res.json({ working: true })
    res.end()
})
router.get("/jobs", getJobs)

module.exports = router
