import React, { Component } from "react";
import DishesBlock from "../Layouts/DishesBlock";
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
                return dish.tag === tag.id 
            }).slice(0, 3)
            if (tagDishes.dishes.length != 0) {
                tagsDishes.push(tagDishes)
            }
        })

        return tagsDishes?.map((tagDishes)=>(
            <DishesBlock title={tagDishes.tag.title} dishesList={tagDishes.dishes} href={tagDishes.tag.id} />
        ))
    }
}

export default Tags