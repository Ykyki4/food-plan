import React, { Component } from "react";
import axios from "axios";
import DishesGrid from "../Layouts/DishesGrid";

class UserDishes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userDishesList: [],
        }
    }

    getUserDishes = () => {
        axios
            .get("/api/user/" + localStorage.getItem("user_id"))
            .then((res) => this.setState({ userDishesList: res.data.user_liked_dishes.map(
                (user_liked_dish) => user_liked_dish = user_liked_dish.dish) }))
            .catch((err) => console.log(err));
    }

    componentDidMount() {
        this.getUserDishes();
    }

    render() {
        return (
            <DishesGrid dishesList={this.state.userDishesList} itemsPerPage={12} bannerText="Мои блюда" />
        )
    }
}

export default UserDishes