import React, { Component } from "react";
import { ImArrowRight2 } from "react-icons/im"
import { Link } from "react-router-dom";
import DishCard from "../Cards/DishCard";

const DishesBlock = ({title, dishesList, href=null}) => {
    return (
<           div className="mx-36">
                <div className="group inline text-gray-500/50">
                    {href ?
                    <Link className="inline-flex items-center" to={href}>
                        <p className="font-sans font-bold text-2xl uppercase">
                            {title}
                        </p>
                        <ImArrowRight2 className="ml-4 duration-150 group-hover:ml-8" size={"40"} />
                    </Link> : <p className="font-sans font-bold text-2xl uppercase">{title}</p>
                    }
                    <hr className="h-[0.2rem] border-none w-[60%] bg-gray-300 duration-150 group-hover:w-[70%]" />
                </div>
                <div className="flex mt-4">
                    {dishesList?.map((dish)=>(
                        <DishCard dish={dish} />
                    ))}
                </div>
            </div>
    );
}

export default DishesBlock