import React from "react"
import styles from "./JobCard.module.css"
const JobCard = ({ jobObject }) => {

    return (
        <div className={styles["job-card"]} >
            <p className={styles["job-title"]} > {jobObject.title}</p>
            <p className={styles["job-company"]}>{jobObject.company} </p>
            {jobObject.company_logo && <img src={jobObject.company_logo} alt="company logo" />}
            <p className={styles["job-location"]}>{jobObject.location}</p>
            <a href={jobObject.url}>See more</a>
            <p className={styles["job-date"]}>Job posted at {jobObject.created_at}</p>
        </div >
    )

}

export default JobCard