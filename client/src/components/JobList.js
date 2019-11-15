import React, { useContext } from "react"
import { AppContext } from "../AppContext"
import JobCard from "./JobCard"
import styles from "./JobList.module.css"
const JobList = () => {
    const { state } = useContext(AppContext)
    if (!Array.isArray(state.jobs)) { // no jobs found
        return <p>We couldn't find any jobs for that city :(</p>
    } else {
        const jobsToRender = state.jobs.map((job) => {
            return <JobCard jobObject={job} key={job.id} />
        })

        return (
            <div className={styles["job-list"]}>
                {[jobsToRender]}
            </div>
        )
    }
}

export default JobList