const checkResponse = (response) => {
    if (response.status !== 200) {
        return response.status;
    }
    return response.json();
};

const getJobs = async (location) => {
    const response = await fetch(
        `http://localhost:3001/jobs?location=${location}`
    )

    const checkedResponse = await checkResponse(response)
    return checkedResponse
};

export default getJobs;