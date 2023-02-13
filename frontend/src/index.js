import App from "./components/App"
import React from "react";
import { render } from "react-dom";
import ReactDOM from "react-dom/client";

const app = ReactDOM.createRoot(document.getElementById('app'));
app.render(<App />);