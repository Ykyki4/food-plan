import React, { Component } from "react";
import ReactPaginate from 'react-paginate';
import DishCard from "./Cards/DishCard";
import axios from "axios";
import Banner from "./Layouts/Banner";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md"

class AllDishes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dishesList: [],
            itemsOffset: 0,
            itemsPerPage: 30,
            page: 1,
        }
    }

    getDishes = () => {
        axios
          .get("/api/dishes/")
          .then((res) => this.setState({ dishesList: res.data }))
          .catch((err) => console.log(err));
    };

    handlePageChange = (event) => {
        console.log((event.selected * this.state.itemsPerPage) % this.state.dishesList.length)
        this.setState({itemsOffset: (event.selected * this.state.itemsPerPage) % this.state.dishesList.length});
        this.setState({page: event.selected})
    };

    componentDidMount() {
        this.getDishes();
    }

    render() {
        const currentItems = this.state.dishesList.slice(this.state.itemsOffset, 
            this.state.itemsOffset + this.state.itemsPerPage);
        const pageCount = Math.ceil(this.state.dishesList.length / this.state.itemsPerPage);
        return (
            <div className="mx-24">
                <Banner text="Все блюда" />

                <div className="mt-12 py-12 h-full bg-blue-100 rounded-[5rem]">
                    <div className="mx-36">
                        <div className="flex justify-center mb-12">
                            <ReactPaginate
                                breakLabel="..."
                                nextLabel={<MdNavigateNext />}
                                onPageChange={this.handlePageChange}
                                pageRangeDisplayed={5}
                                pageCount={pageCount}
                                previousLabel={<MdNavigateBefore />}
                                renderOnZeroPageCount={null}
                                containerClassName="flex items-center"
                                pageLinkClassName="relative block py-1.5 px-3 mx-1 border-0 bg-sky-300 outline-none transition-all duration-300 rounded-full text-gray-800 hover:text-gray-800 hover:bg-sky-400 focus:shadow-none"
                                activeLinkClassName="mx-0 bg-blue-400 text-white hover:text-white hover:bg-sky-500 shadow-md focus:shadow-md"
                                />
                        </div>   
                        <div className="grid grid-cols-3 gap-4">
                            {currentItems?.map((dish)=>(
                                <DishCard dish={dish} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AllDishes