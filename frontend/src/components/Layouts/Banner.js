import React, { Component } from "react";

const Banner = ({text, size="text-7xl"}) => {
    return (
        <div className="flex justify-center mt-16 p-8 rounded-full bg-blue-100">
            <h1 className={`font-sans font-bold text-cyan-900 ${size}`}>{text}</h1>
        </div>
    );
}

export default Banner