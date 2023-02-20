import React, { Component } from "react";
import DishesBlock from "../Layouts/DishesBlock";
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
            <DishesBlock title="Популярные блюда" to="/popular" dishesList={this.state.dishesList} />
        )
    }
}

export default Popular