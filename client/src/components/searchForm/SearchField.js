import React, { useContext } from "react"
import { AppContext } from "../../AppContext"
import getJobs from "../../utils/getJobs"
import styles from "./SearchField.module.css"
const cities = require("cities.json").filter(elem => elem.country === 'GB')

const getSuggestions = value => {
    if (!value) { return "" }
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : cities.filter(city =>
        city.name.toLowerCase().slice(0, inputLength) === inputValue
    );
};

const SearchField = () => {
    const { state, dispatch } = useContext(AppContext)

    const handleSubmission = async (event) => {
        event.preventDefault()
        const newJobs = await getJobs(state.formValue)
        dispatch({ type: "updateCities", payload: newJobs })
        dispatch({ type: "updateSuggestions", payload: [] })
    }

    const onSuggestionClick = async (event, location) => {
        event.preventDefault()
        dispatch({ type: "updateFormValue", payload: event.target.value })
        const newJobs = await getJobs(location)
        dispatch({ type: "updateCities", payload: newJobs })
        clearSuggestions()
    }

    const clearSuggestions = () => {
        dispatch({ type: "updateSuggestions", payload: [] })
    }
    const handleFormValue = (event) => {
        dispatch({ type: "updateFormValue", payload: event.target.value })
        updateSuggestions()
        if (event.target.value === "") {
            clearSuggestions()
        }
    }

    const updateSuggestions = () => {
        dispatch({ type: "updateSuggestions", payload: getSuggestions(state.formValue) })
    }
    React.useEffect(() => {
        updateSuggestions()
    }, [state.formValue])
    const suggestionsToRender = (state.citySuggestions.length === 0) ? [] : state.citySuggestions.map((city) => {
        return (<button onClick={(event) =>
            onSuggestionClick(event, `${city.name}, ${city.country}`)
        }
            value={city.name}
            key={state.citySuggestions.indexOf(city)
            }>
            <p>{city.name}, {city.country}</p>
        </button >)
    })
    return (
        <div className={styles["search-form"]}>
            <form onSubmit={handleSubmission}>
                <label htmlFor="search-form">Enter city here</label>
                <input type="text"
                    id="search-form"
                    placeholder="Enter city here..."
                    value={state.formValue}
                    data-testid="text-form"
                    onChange={(event) => {
                        handleFormValue(event)
                        updateSuggestions()

                    }}
                    required />
                <div className={styles["autocomplete-items"]}>
                    {[suggestionsToRender]}
                </div>
            </form>
        </div>
    )
}

export default SearchField


