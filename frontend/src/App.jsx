import React from "react"
import { Route, Routes } from "react-router-dom"
import { HomeScreen, LoginScreen } from "./Screens"

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<HomeScreen/>}/>
                <Route path="/login" element={<LoginScreen/>}/>
            </Routes>
        </div>
    )
}

export default App
