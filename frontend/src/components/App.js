import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import AllDishes from "./pages/AllDishes";
import Header from "./Layouts/Header";
import DishDeatil from "./pages/DishDetail";
import TagDishes from "./pages/TagDishes";

class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Header />}>
                        <Route index element={<MainPage />} />
                        <Route path="/dish/:id" element={<DishDeatil />} />
                        <Route path="/tag/:id" element={<TagDishes />} />
                        <Route path="/dishes" element={<AllDishes />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        );
    }
}

export default App
