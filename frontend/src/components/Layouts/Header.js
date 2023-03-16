import React, { Component } from "react";
import { Link, Outlet } from "react-router-dom";
import { BiDish } from "react-icons/bi";
import { IoMdArrowDropdownCircle, IoMdArrowDropupCircle } from "react-icons/io"
import axios from "axios"
import Register from "../Modals/Register";
import Login from "../Modals/Login";


class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tagList: [],
            tagsOppened: false,
            registerOppened: false,
            loginOppened: false,
            accountOppened: false,
        }
        this.toggleRegister = this.toggleRegister.bind(this);
        this.toggleLogin = this.toggleLogin.bind(this);
        this.menuitems = [
            { name: "Главная", href: "/" },
            { name: "Все блюда", href: "/dishes/" },
        ];
    }

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

    toggleRegister() {
        this.setState(prevState => ({
            registerOppened: !prevState.registerOppened
        }));
    }

    toggleLogin() {
        this.setState(prevState => ({
            loginOppened: !prevState.loginOppened
        }));
    }

    toggleAccount() {
        this.setState(prevState => ({
            accountOppened: !prevState.accountOppened
        }));
    }

    logout() {
        localStorage.removeItem('user_id')
        localStorage.removeItem("user_name")
        localStorage.removeItem("user_phone")
        window.location.replace("/")
    }

    render() {
        return (
            <>
                <Login loginOppened={this.state.loginOppened}
                    handleToggleRegister={this.toggleRegister}
                    handleToggleLogin={this.toggleLogin} />
                <Register registerOppened={this.state.registerOppened}
                    handleToggleRegister={this.toggleRegister}
                    handleToggleLogin={this.toggleLogin} />
                <div className="bg-sky-500/30 shadow-2xl z-10">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center space-x-4 w-[50%] h-full px-2">
                            <div className="flex items-center">
                                <BiDish size={"40"} />
                            </div>
                            {this.menuitems?.map((menuitem, index) => (
                                <Link
                                    key={index}
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
                                            {this.state.tagList?.map((tag, index) => (
                                                <Link
                                                    key={index}
                                                    className="p-2 rounded-md hover:flex-1 hover:bg-blue-300 hover:text-white"
                                                    to={"/tag/" + tag.id}>
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
                        <div className="flex items-center justify-end space-x-4 w-[30%] h-full mx-2">
                            {localStorage.getItem('user_name') ?
                                <div className="mx-4">
                                    <button onClick={() => this.toggleAccount()} className="flex items-center text-inherit hover:bg-blue-300 hover:text-white px-3 py-2 rounded-md">
                                        <p className="font-semibold text-lg mx-1">
                                            {localStorage.getItem('user_name')}
                                        </p>
                                        {this.state.accountOppened ?
                                            <IoMdArrowDropupCircle size={"24"} /> :
                                            <IoMdArrowDropdownCircle size={"24"} />
                                        }
                                    </button>
                                    {this.state.accountOppened ?
                                        <div className="absolute bg-blue-200 w-24 mt-2 rounded-md">
                                            <div className="flex flex-col">
                                                <Link
                                                    className="p-2 rounded-md text-center hover:flex-1 hover:bg-blue-300 hover:text-white"
                                                    to={"/user-dishes/"}>
                                                    <p className="text-sm text-inherit font-medium">
                                                        Мои блюда
                                                    </p>
                                                </Link>
                                                <button
                                                    onClick={() => this.logout()}
                                                    className="p-2 rounded-md hover:flex-1 hover:bg-blue-300 hover:text-white"
                                                    >
                                                    <p className="text-sm text-inherit font-medium">
                                                        Выйти
                                                    </p>
                                                </button>
                                            </div>
                                        </div>
                                    : null}
                                </div>
                                :
                                <button onClick={() => this.toggleRegister()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                                    Зарегистрироваться
                                </button>
                            }
                        </div>
                    </div>
                </div>
                <Outlet />
            </>
        );
    }
}

export default Header