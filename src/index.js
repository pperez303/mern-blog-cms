import React from 'react';
//import ReactDOM from 'react-dom';
import ReactDOM from "react-dom"
import './index.css';
import App from './App';
import { ContextProvider } from "./context/Context";

// using github workflow ci/cd - automated

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

