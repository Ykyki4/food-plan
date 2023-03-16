import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { redirect } from "react-router-dom";
import axios from "axios";

const Register = ({ registerOppened, handleToggleRegister, handleToggleLogin }) => {
    const hidden = registerOppened ? "" : "opacity-0 invisible"

    const [ name, setName ] = useState("")
    const [ phone, setPhone ] = useState("")
    const [ password, setPassword ] = useState("")

    const formFields = [
        { name: "name", type: "text", label: "Ваше имя: ", set: setName},
        { name: "phone", type: "tel", label: "Номер телефона: ", placeholder: "+7 900 000 00 00", set: setPhone },
        { name: "password", type: "password", label: "Пароль: ", set: setPassword }
    ]

    const handleRegister = (event) => {
        event.preventDefault()
        const body = {
            "name": name,
            "phone": phone,
            "password": password,
        }

        axios.post('/api/register/', body, {
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
                    <button onClick={handleToggleRegister}><AiOutlineClose size={20} /></button>
                </div>
                <div>
                    <p className="text-center font-sans font-bold text-lg">Регистрация</p>
                </div>
                <form className="flex text-center flex-col">
                    {formFields.map((field, index) => (
                        <label key={index} className="py-1">
                            <p>{field.label}</p>
                            <input
                                required
                                onChange={event => field.set(event.target.value)}
                                name={field.name}
                                type={field.type}
                                placeholder={field.placeholder}
                                className="rounded-xl bg-blue-100 px-2 py-1 outline-blue-300 outline-2 outline focus:outline-4"
                            />
                        </label>
                    ))}
                    <button onClick={(e) => handleRegister(e)} className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-2 mt-4 rounded-full">
                        Зарегистрироваться
                    </button>
                </form>
                <div className="text-center font-sans font-semibold text-md mt-4">
                    <p className="inline">
                        Уже есть аккаунт?  
                    </p>
                    <button onClick={() => {handleToggleLogin(); handleToggleRegister();}} 
                        className="text-cyan-500 inline indent-1 hover:text-cyan-600">
                        Войти
                    </button>
                </div>
            </div>
        </div >
    );
}

export default Register