import React, { useReducer, createContext } from "react"


const initialState = {
    formValue: "",
    citySuggestions: [],
    jobs: [],
    page: 0
}

const AppContext = createContext(initialState)

const reducer = (state, action) => {
    switch (action.type) {
        case "updateSuggestions":
            return { ...state, citySuggestions: action.payload }
        case "updateFormValue":
            return { ...state, formValue: action.payload }
        case "updateCities":
            return { ...state, jobs: action.payload }
        default:
            return state
    }
}

const AppProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {props.children}
        </AppContext.Provider>
    )
}

export { AppContext, AppProvider }