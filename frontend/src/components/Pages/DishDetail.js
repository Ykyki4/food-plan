import React, { Component } from "react";
import Banner from "../Layouts/Banner";
import WithRouter from "../WithRouter";
import axios from "axios"
import { AiFillEye, AiFillHeart, AiOutlineHeart } from "react-icons/ai";

class DishDeatil extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dish: {},
            userDishes: [],
        }
    }

    getDish = () => {
        axios
            .get("/api/dishes/" + this.props.params.id)
            .then((res) => this.setState({ dish: res.data }))
            .catch((err) => console.log(err));
    }

    getUserDishes = () => {
        axios
            .get("/api/user/" + localStorage.getItem("user_id"))
            .then((res) => this.setState({ userDishes: res.data.user_liked_dishes }))
            .catch((err) => console.log(err));
    }

    dishInUserDishes = () => {
        return this.state.userDishes.filter(userDish => userDish.dish.id == this.props.params.id).length > 0
    }

    updateDishViews = () => {
        axios
            .get("/api/update-dish-views/" + this.props.params.id)
            .catch((err) => console.log(err));
    }

    addDishToUser = () => {
        const body = {
            "user_id": localStorage.getItem('user_id'),
            "dish_id": this.props.params.id
        }

        axios.post('/api/add-user-dish/', body, {
                headers: {
                'Content-Type': 'multipart/form-data'
                    }
                }
            ).then((res) => this.getUserDishes())
            .catch((err) => console.log(err))
    }

    componentDidMount() {
        this.getDish();
        this.getUserDishes();
        this.updateDishViews();
    }

    render() {
        return (
            <div className="mx-24">
                <Banner text={this.state.dish.title} size="text-4xl" />

                <div className="mt-24">
                    <div className="py-12 relative h-full bg-blue-100 rounded-[5rem]">
                        <div className="flex justify-around">
                            <div className="ml-8 w-1/3">
                                <p className="text-2xl font-bold">{this.state.dish.title}</p>
                                {this.state.dish.description ?
                                    <div>
                                        <hr className="w-1/2 h-[0.2rem] bg-black/50 rounded-md" />
                                        <p className="text-md font-semibold leading-tight">{this.state.dish.description}</p>
                                    </div> : null
                                }
                            </div>
                            <div className="">
                                <img src={this.state.dish.picture} alt="dish picture" className="w-[250px] h-[200px] rounded-xl" />
                                <div className="flex justify-between text-gray-800 text-sm font-bold">
                                    <div className="flex items-center">
                                        <p>{this.state.dish.views}</p>
                                        <AiFillEye />
                                    </div>
                                    { this.dishInUserDishes() ?
                                    <button className="flex items-center justify-center">
                                        <AiOutlineHeart className="absolute" size={24} />
                                        <AiFillHeart size={20} className="absolute text-red-500 duration-150 hover:text-transparent" />
                                    </button>
                                    :
                                    <button onClick={() => this.addDishToUser()} className="flex items-center justify-center">
                                        <AiOutlineHeart className="absolute" size={24} />
                                        <AiFillHeart size={20} className="absolute text-transparent duration-150 hover:text-red-500" />
                                    </button>
                                    }
                                </div>
                            </div>
                            <div className="w-1/3 flex flex-col">
                                <p className="text-md font-semibold">Ингридиенты:</p>
                                <ul className="list-disc list-inside">
                                    {this.state.dish.dish_products?.map((dish_product, index) => (
                                        <li key={index}>{dish_product.title} - {dish_product.amount}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="mt-8">
                            <p className="text-center text-3xl font-bold">Пошаговый рецепт</p>
                            <hr className="mx-auto w-2/3 h-[0.2rem] bg-black/50 rounded-md" />
                            <ul className="mx-12 list-disc list-inside">
                                {this.state.dish.steps?.map((step, index) =>
                                    <li key={index} className="my-4 text-md font-semibold">
                                        {step.description}
                                        {step.picture ?
                                            <div className="flex justify-center">
                                                <img src={step.picture} alt="step picture" className="rounded-lg w-[400px]" />
                                            </div> : null
                                        }
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default WithRouter(DishDeatil)