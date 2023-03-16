import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";

const Login = ({ loginOppened, handleToggleRegister, handleToggleLogin }) => {
    const hidden = loginOppened ? "" : "opacity-0 invisible"

    const [ phone, setPhone ] = useState("")
    const [ password, setPassword ] = useState("")

    const formFields = [
        { name: "phone", type: "text", label: "Номер телефона: ", placeholder: "+0 900 000 00 00", set: setPhone },
        { name: "password", type: "password", label: "Пароль: ", set: setPassword }
    ]

    const handleLogin = (event) => {
        event.preventDefault()
        const body = {
            "phone": phone,
            "password": password,
        }

        axios.post('/api/login/', body, {
                headers: {
                'Content-Type': 'multipart/form-data'
                    }
                }
            ).then((res) => {
                localStorage.setItem('user_id', res.data.id)
                localStorage.setItem('user_name', res.data.name)
                localStorage.setItem('user_phone', res.data.phone)
                window.location.replace('/')
            })
            .catch((err) => console.log(err))
    }

    return (
        <div className={"flex justify-center z-10 duration-500 items-center h-screen w-screen fixed bg-black/60 " + hidden}>
            <div className="px-6 py-4 relative w-1/4 rounded-[3em] bg-blue-200">
                <div className="absolute right-4 top-5">
                    <button onClick={handleToggleLogin}><AiOutlineClose size={20} /></button>
                </div>
                <div>
                    <p className="text-center font-sans font-bold text-lg">Войти</p>
                </div>
                <form className="flex text-center flex-col">
                    {formFields.map((field, index) => (
                        <label key={index} className="py-1">
                            <p>{field.label}</p>
                            <input
                                required
                                onChange={event => field.set(event.target.value)}
                                type={field.type}
                                name={field.name}
                                placeholder={field.placeholder}
                                className="rounded-xl bg-blue-100 px-2 py-1 outline-blue-300 outline-2 outline focus:outline-4"
                            />
                        </label>
                    ))}
                    <button onClick={(e) => handleLogin(e)} className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-2 mt-4 rounded-full">
                        Войти
                    </button>
                </form>
                <div className="text-center font-sans font-semibold text-md mt-4">
                    <p className="inline">
                        Ещё нет аккаунта?
                    </p>
                    <button onClick={() => {handleToggleLogin(); handleToggleRegister();}} 
                        className="text-cyan-500 inline indent-0.5 hover:text-cyan-600">
                        Зарегистрироваться
                    </button>
                </div>
            </div>
        </div >
    );
}

export default Login