import React, { Component } from "react";

const Banner = ({text, size="text-7xl"}) => {
    return (
        <div className="mt-16 p-8 rounded-full bg-blue-100">
            <p className={`text-center font-sans font-bold text-cyan-900 ${size}`}>{text}</p>
        </div>
    );
}

export default Banner