import React, { Component } from "react";
import DishesBlock from "../Layouts/DishesBlock";
import axios from "axios";

class TagsBlocks extends Component {
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

    componentDidMount() {
        this.getTags();
    }

    render() {
        return this.state.tagList?.map((tag, index)=>(
            tag.dishes.length > 1 ?
                <DishesBlock key={index} title={tag.title} dishesList={tag.dishes.slice(0, 3)} href={"/tag/"+tag.id} /> : null
        ))
    }
}

export default TagsBlocks