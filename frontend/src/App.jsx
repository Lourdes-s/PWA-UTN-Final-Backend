import React from "react"
import { Route, Routes } from "react-router-dom"
import { ChatsScreen, ForgotPasswordScreen, HomeScreen, LoginScreen, RecoveryPasswordScreen, RegisterScreen } from "./Screens"
const App = () => {
    return (
        <div className='phone'>
            <Routes>
                <Route path="/" element={<HomeScreen/>}/>
                <Route path="/login" element={<LoginScreen/>}/>
                <Route path="/forgot-password" element={<ForgotPasswordScreen/>}/>
                <Route path="/recovery-password/:reset_token" element={<RecoveryPasswordScreen/>}/>
                <Route path="/register" element={<RegisterScreen/>}/>
                <Route path="/chats" element={<ChatsScreen/>}></Route>
            </Routes>
        </div>
    )
}

export default App
