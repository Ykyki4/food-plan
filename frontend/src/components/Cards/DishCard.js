import React from "react";
import { Link } from "react-router-dom";
import { ImArrowRight2 } from "react-icons/im";
import { AiFillEye } from "react-icons/ai";

const DishCard = ({dish}) => {
    return (
        <div style={{
            backgroundImage: `url(${dish.picture})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',}} className='group w-56 h-44 mr-4 hover:shadow-2xl shadow-indigo-500/40 text-white text-sm font-bold'>
            <div className="h-full flex items-end justify-between duration-150 group-hover:bg-black/50">
                <Link 
                className="group/link duration-150 opacity-0 group-hover:opacity-100 mx-1">
                    {dish.title}
                    <ImArrowRight2 className="inline duration-150 group-hover/link:ml-4" size={"20"} />
                </Link>
                <div className="flex relative bottom-0 right-0 opacity-0 group-hover:opacity-100 items-center">
                    <p>{dish.views}</p>
                    <AiFillEye />
                </div>
            </div>
        </div>
    )
}

export default DishCard