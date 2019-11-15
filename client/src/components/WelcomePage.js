import React from "react"
import JobList from "./JobList"
import SearchField from "./searchForm/SearchField"
import styles from "./WelcomePage.module.css"
const WelcomePage = () => {
    return (
        <div className={styles["intro-page"]}>
            <h1>
                Welcome to Jobly!
            </h1>
            <h2>
                Enter your city below to find jobs in your local area.
            </h2>

            <SearchField />
            <JobList />

        </div>
    )
}

export default WelcomePage