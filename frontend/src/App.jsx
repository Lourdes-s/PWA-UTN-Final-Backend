import React from "react"
import { Route, Routes } from "react-router-dom"
import { ContactScreen, ForgotPasswordScreen, HomeScreen, LoginScreen, RecoveryPasswordScreen, RegisterScreen } from "./Screens"
const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<HomeScreen/>}/>
                <Route path="/login" element={<LoginScreen/>}/>
                <Route path="/forgot-password" element={<ForgotPasswordScreen/>}/>
                <Route path="/recovery-password/:reset_token" element={<RecoveryPasswordScreen/>}/>
                <Route path="/register" element={<RegisterScreen/>}/>
                <Route path="/contacts" element={<ContactScreen/>}></Route>
            </Routes>
        </div>
    )
}

export default App
