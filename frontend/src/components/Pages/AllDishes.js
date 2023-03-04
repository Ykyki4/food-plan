import React, { Component } from "react";
import axios from "axios";
import DishesGrid from "../Layouts/DishesGrid";

class AllDishes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dishesList: [],
        }
    }

    getDishes = () => {
        axios
          .get("/api/dishes/")
          .then((res) => this.setState({ dishesList: res.data }))
          .catch((err) => console.log(err));
    };

    componentDidMount() {
        this.getDishes();
    }

    render() {
        console.log(this.state.dishesList)
        return (
            <DishesGrid dishesList={this.state.dishesList} itemsPerPage={12} bannerText="Все блюда" />
        )
    }
}

export default AllDishes