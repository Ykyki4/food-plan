import React, { Component } from "react";
import Banner from "./Layouts/Banner"
import Popular from "./Main/Popular";
import Recommendations from "./Main/Recommendations";
import Tags from "./Main/Tags"

function MainPage() {
    return (
        <div className="mx-24">
            <Banner text="Блюда на ваш вкус!" />

            <div className="grid grid-cols-1 gap-12 justify-around mt-12 py-12 h-full bg-blue-100 rounded-[5rem]">
                <Recommendations />
                <Popular />
                <Tags />
            </div>
        </div>
    );
}

export default MainPage