import React, { Component, useState } from "react";
import DishesGrid from "./Layouts/DishesGrid";
import { useParams } from "react-router-dom";
import WithRouter from "./WithRouter";
import axios from "axios"

class TagDishes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tag: [],
        }
    }

    getTag = () => {
        axios
          .get("/api/tags/"+this.props.params.id)
          .then((res) => {
            if(this.state.tag.id != this.props.params.id){
                this.setState({ tag: res.data })
            }
          })
          .catch((err) => console.log(err));
    };

    componentDidMount() {
        this.getTag();
    };

    componentDidUpdate() {
        this.getTag();
    };

    render() {
        return (
            this.state.tag.dishes ?
            <DishesGrid dishesList={this.state.tag.dishes} itemsPerPage={12} bannerText={"Все блюда "+this.state.tag.title.toLowerCase()} />
            : null
        )
    }
}

export default WithRouter(TagDishes)