import React from "react"
import styles from "./JobCard.module.css"
const JobCard = ({ jobObject }) => {

    return (
        <div className={styles["job-card"]} >
            < h1 > {jobObject.title}</h1 >
            <h2>{jobObject.location}</h2>
            <p>{jobObject.createdAt}</p>
            <a href={jobObject.url}>See more</a>
        </div >
    )

}

export default JobCard