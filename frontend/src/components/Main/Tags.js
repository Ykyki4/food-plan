import React, { Component } from "react";
import { ImArrowRight2 } from "react-icons/im"
import { Link } from "react-router-dom";
import DishCard from "../Cards/DishCard";
import axios from "axios";

class Tags extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dishesList: [],
            tagList: [],
        }
    }

    getTags = () => {
        axios
          .get("/api/tags/")
          .then((res) => this.setState({ tagList: res.data }))
          .catch((err) => console.log(err));
    };

    getDishes = () => {
        axios
          .get("/api/dishes/")
          .then((res) => this.setState({ dishesList: res.data }))
          .catch((err) => console.log(err));
    };

    componentDidMount() {
        this.getDishes();
        this.getTags();
    }

    render() {
        const tagsDishes = []
        this.state.tagList.map((tag)=>{
            const tagDishes = {'tag': tag}
            tagDishes.dishes = this.state.dishesList.filter((dish) => {
                dish.tagname = tag.title
                return dish.tag === tag.id 
            }).slice(0, 3)
            if (tagDishes.dishes.length != 0) {
                tagsDishes.push(tagDishes)
            }
        })

        return tagsDishes?.map((tagDishes)=>(
            <div className="mx-36">
                <div className="group inline">
                    <Link className="inline-flex items-center" to={"/recommendations"}>
                        <p className="font-sans font-bold text-2xl uppercase">
                            {tagDishes.tag.title}
                        </p>
                        <ImArrowRight2 className="ml-4 duration-150 group-hover:ml-8" size={"40"} />
                    </Link>
                    <hr className="h-[0.2rem] border-none bg-black w-[60%] duration-150 group-hover:w-[70%]" />
                </div>
                <div className="flex mt-4">
                    {tagDishes.dishes?.map((dish)=>(
                        <DishCard dish={dish} />
                    ))}
                </div>
            </div>
        ))
    }
}

export default Tags