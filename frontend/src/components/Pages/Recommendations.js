import React, { Component } from "react";
import axios from "axios";
import DishesGrid from "../Layouts/DishesGrid";

class Recommendations extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dishesList: [],
        }
    }

    getDishes = () => {
        axios
          .get("/api/dishes/")
          .then((res) => this.setState({ dishesList: res.data.filter((dish)=> dish.recommended === true) }))
          .catch((err) => console.log(err));
    };

    componentDidMount() {
        this.getDishes();
    }

    render() {
        return (
            <DishesGrid dishesList={this.state.dishesList} itemsPerPage={12} bannerText="Рекомендованные блюда" />
        )
    }
}

export default Recommendations