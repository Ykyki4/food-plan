import React, { Component } from "react";

const Banner = ({text}) => {
    return (
        <div className="flex justify-center mt-16 p-8 rounded-full bg-blue-100">
            <h1 className="font-sans font-bold text-7xl">{text}</h1>
        </div>
    );
}

export default Banner