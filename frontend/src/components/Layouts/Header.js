import React, { Component} from "react";
import { Link, Outlet } from "react-router-dom";
import { BiDish } from "react-icons/bi";
import { IoMdArrowDropdownCircle, IoMdArrowDropupCircle } from "react-icons/io"
import axios from "axios"


class Header extends Component{
    constructor(props) {
        super(props)
        this.state = {
            tagList: [],
            tagsOppened: false,
        }
    }

    menuitems = [
        {name: "Главная", href: "/"},
        {name: "Все блюда", href: "/dishes/"},
    ]

    getTags = () => {
        axios
          .get("/api/tags/")
          .then((res) => this.setState({ tagList: res.data }))
          .catch((err) => console.log(err));
    };

    componentDidMount() {
        this.getTags();
    }

    toggleDropdown() {
        this.setState(prevState => ({
            tagsOppened: !prevState.tagsOppened
        }));
    }

    render() {
        return (
            <>
                <nav className="bg-sky-500/30 shadow-2xl z-10">
                    <div class="flex h-16 items-center justify-between">
                        <div className="flex items-center space-x-4 w-[50%] h-full px-2">
                            <div className="flex items-center">
                                <BiDish size={"40"} />
                            </div>
                            {this.menuitems?.map((menuitem)=>(
                                <Link
                                    to={menuitem?.href}
                                    className="text-inherit hover:bg-blue-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                    {menuitem?.name}
                                </Link>
                            ))}

                            <div className="">
                                <button onClick={() => this.toggleDropdown()} className="flex items-center text-inherit hover:bg-blue-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                    <p className="pr-2">
                                        Блюда
                                    </p>
                                    {this.state.tagsOppened ?
                                    <IoMdArrowDropupCircle size={"24"} /> :
                                    <IoMdArrowDropdownCircle size={"24"} />
                                    }
                                </button>
                                {this.state.tagsOppened ?
                                    <div className="absolute bg-blue-200 w-36 mt-2 rounded-md">
                                        <div className="flex flex-col">
                                            {this.state.tagList?.map((tag)=>(
                                                <Link 
                                                className="p-2 rounded-md hover:flex-1 hover:bg-blue-300 hover:text-white"
                                                to={"/tag/"+tag.id}>
                                                    <p className="text-sm text-inherit font-medium">
                                                        {tag?.title}
                                                    </p>
                                                </Link>
                                            ))}
                                        </div>
                                    </div> : null
                                }   
                            </div>
                        </div>
                        <div className="absolute flex items-center space-x-4 right-0 w-[30%] h-full px-2">
                            <div className="group absolute right-4">
                                <button 
                                type="button" 
                                class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Войти
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>
                <Outlet />
            </>
        );
    }
}

export default Header