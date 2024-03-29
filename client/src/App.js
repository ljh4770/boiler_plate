import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
// import Auth from './hoc/auth'

function App() {
  return (
    <Router>
      <div>
        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */
        /*
        changes of react-router-dom Version 6: Switch -> Routes / component -> element
        */
        }
        <Routes>
          <Route eaxct path="/" element={<LandingPage />} />
          <Route eaxct path="/login" element={<LoginPage />} />
          <Route eaxct path="/register" element={<RegisterPage />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
