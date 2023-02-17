import React, { Component } from "react";
import { ImArrowRight2 } from "react-icons/im"
import { Link } from "react-router-dom";
import DishCard from "../Cards/DishCard";
import axios from "axios";

class Popular extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dishesList: [],
        }
    }

    getDishes = () => {
        axios
          .get("/api/dishes/")
          .then((res) => this.setState({ dishesList: res.data.slice(0, 3) }))
          .catch((err) => console.log(err));
    };

    componentDidMount() {
        this.getDishes();
    }

    render() {
        return(
            <div className="mx-36">
                <div className="group inline">
                    <Link className="inline-flex items-center" to={"/recommendations"}>
                        <p className="font-sans font-bold text-2xl uppercase">
                            Популярные блюда
                        </p>
                        <ImArrowRight2 className="ml-4 duration-150 group-hover:ml-8" size={"40"} />
                    </Link>
                    <hr className="h-[0.2rem] border-none bg-black w-[60%] duration-150 group-hover:w-[70%]" />
                </div>
                <div className="flex mt-4">
                    {this.state.dishesList?.map((dish)=>(
                        <DishCard dish={dish} />
                    ))}
                </div>
            </div>
        )
    }
}

export default Popular