import React, { Component } from "react";
import Banner from "../Layouts/Banner";
import WithRouter from "../WithRouter";
import axios from "axios"

class DishDeatil extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dish: {},
        }
    }

    getDish = () => {
        axios
            .get("/api/dishes/" + this.props.params.id)
            .then((res) => this.setState({ dish: res.data }))
            .catch((err) => console.log(err));
    }

    componentDidMount() {
        this.getDish();
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
                            </div>
                            <div className="w-1/3 flex flex-col justify-center">
                                <p className="text-md font-semibold">Ингридиенты:</p>
                                <ul className="list-disc list-inside">
                                    {this.state.dish.dish_products?.map((dish_product) => (
                                        <li>{dish_product.title} - {dish_product.amount}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="mt-8">
                            <p className="text-center text-3xl font-bold">Пошаговый рецепт</p>
                            <hr className="mx-auto w-2/3 h-[0.2rem] bg-black/50 rounded-md" />
                            <ul className="mx-12 list-disc list-inside">
                                {this.state.dish.steps?.map((step) =>
                                    <li className="my-4 text-md font-semibold">
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