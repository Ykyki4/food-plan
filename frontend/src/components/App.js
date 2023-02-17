import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import AllDishes from "./AllDishes";
import Layout from "./Layout";

class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<MainPage />} />
                        <Route path="dishes" element={<AllDishes />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        );
    }
}

export default App
