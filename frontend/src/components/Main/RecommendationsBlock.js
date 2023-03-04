import React, { Component } from "react";
import DishesBlock from "../Layouts/DishesBlock";
import axios from "axios";

class RecommendationsBlock extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dishesList: [],
        }
    }

    getDishes = () => {
        axios
          .get("/api/dishes/")
          .then((res) => this.setState({ dishesList: res.data.filter((dish)=> dish.recommended === true).slice(0, 3) }))
          .catch((err) => console.log(err));
    };

    componentDidMount() {
        this.getDishes();
    }

    render() {
        return (
            <DishesBlock title="Рекомендации" href="/recommendations" dishesList={this.state.dishesList} /> 
        )
    }
}

export default RecommendationsBlock
