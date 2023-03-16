import React, { Component } from "react";
import ReactPaginate from 'react-paginate';
import DishCard from "./../Cards/DishCard";
import Banner from "./Banner";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md"

class DishesGrid extends Component {
    constructor(props) {
        super(props)
        this.state = {
            itemsOffset: 0,
            page: 1,
        }
    }

    handlePageChange = (event) => {
        this.setState({itemsOffset: (event.selected * this.props.itemsPerPage) % this.props.dishesList.length});
        this.setState({page: event.selected})
    };

    render() {
        const currentItems = this.props.dishesList.slice(this.state.itemsOffset, 
            this.state.itemsOffset + this.props.itemsPerPage);
        const pageCount = Math.ceil(this.props.dishesList.length / this.props.itemsPerPage);
        return (
            <div className="mx-24">
                <Banner text={this.props.bannerText} />

                <div className="mt-12 py-12 h-full bg-blue-100 rounded-[5rem]">
                    <div className="mx-36">
                        <div className="flex justify-center mb-12">
                            <ReactPaginate
                                breakLabel={<p className="relative block py-1.5 px-3 mx-1 border-0 bg-sky-300 outline-none transition-all duration-300 rounded-full text-gray-800 hover:text-gray-800 hover:bg-sky-400 focus:shadow-none">...</p>}
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
                        <div className="flex justify-center">
                            <div className="grid grid-cols-3 gap-4">
                                {currentItems?.map((dish, index)=>(
                                    <DishCard key={index} dish={dish} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DishesGrid