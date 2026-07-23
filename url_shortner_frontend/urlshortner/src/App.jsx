import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import RedirectPage from './pages/RedirectPage';
import NotFound from './pages/NotFound';
import MyUrls from './pages/MyUrls';
import MyProfile from './pages/MyProfile';
import LoginPage from './pages/LoginPage';
import Register from './pages/Register';
import VerifyOtp from './pages/VerifyOTP';
import ResetPassword from './pages/ResetPassword';
import ConfirmResetPassword from './pages/ConfirmResetPassword';




const App = () => {
  return (
     <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/login" element={<Login />} /> */}
      {/* <Route path="/register" element={<Register />} /> */}
      <Route path="/not-found" element={<NotFound />} />
      <Route path="/my-urls" element={<MyUrls/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/verify" element={<VerifyOtp/>}/>
      <Route path="/my-profile" element={<MyProfile/>}/>
      <Route path="/password/reset/" element={<ResetPassword/>}/>

      <Route path="/password/reset/confirm/:uid/:token/" element={<ConfirmResetPassword/>}/>






      <Route path="/:shortCode" element={<RedirectPage />} />
      
    </Routes>
  )
}

export default App