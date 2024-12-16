import React from "react"
import { Route, Routes } from "react-router-dom"
import { ForgotPasswordScreen, HomeScreen, LoginScreen, RecoveryPasswordScreen } from "./Screens"
const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<HomeScreen/>}/>
                <Route path="/login" element={<LoginScreen/>}/>
                <Route path="/forgot-password" element={<ForgotPasswordScreen/>}/>
                <Route path="/recovery-password/:reset_token" element={<RecoveryPasswordScreen/>}/>
            </Routes>
        </div>
    )
}

export default App
