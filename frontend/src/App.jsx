import React from "react"
import { Route, Routes } from "react-router-dom"
import { HomeScreen } from "./Screens"

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<HomeScreen/>}/>
            </Routes>
        </div>
    )
}

export default App
