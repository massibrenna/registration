import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App";
import Home from "./components/Home";
import reportWebVitals from "./reportWebVitals";
import Registration from "./components/registration";

ReactDOM.render(
  <React.StrictMode>
        
    <BrowserRouter>
            
      <Routes>
                
        <Route index element={<App />} />
                
        <Route path="login" element={<Registration />} />
                
        <Route path="home" element={<Home />} />
              
      </Routes>
          
    </BrowserRouter>
      
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
