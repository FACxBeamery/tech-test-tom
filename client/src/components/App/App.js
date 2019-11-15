import React from "react";
import './App.css';
import WelcomePage from "../welcomePage/WelcomePage"
import { AppProvider } from "./AppContext"



function App() {

    return (
        <AppProvider >
            <WelcomePage />
        </AppProvider>
    )
}




export default App;
