import axios from 'axios'
import React, { useState } from 'react'
import Swal from 'sweetalert2'
import config from '../Service/config'
import { Link, useNavigate } from 'react-router-dom'

export default function Loginpage() {
    const navigate = useNavigate()
    const [sendData, setSendData] = useState({
        username: "",
        password: "",
    })

    const handlechange = (event) => {
        const value = event.target.value
        if (!value.includes(" ")) {
            setSendData((prev) => ({ ...prev, [event.target.name]: event.target.value }))
        }


    }

    const handlesubmit = async (e) => {
        e.preventDefault()
        console.log("test");
        try {
            await axios.post(config.api_path + "/user/signin", sendData).then(res => {
                console.log(res);
                if (res.data.message === "success") {
                    localStorage.setItem(config.token_name, res.data.token)
                    Swal.fire({
                        title: `Sign In`,
                        text: `You login success.`,
                        icon: 'success',
                        timer: 2000,
                        showConfirmButton: true
                    }).then(() => {
                        navigate('/dashboard')
                    })
                }
            }).catch(err => {
                console.log(err);
                if (err.response.status === 401) {
                    Swal.fire({
                        title: `Can't login`,
                        text: err.response.data.message,
                        icon: 'warning',
                        timer: 2000,
                        showConfirmButton: true
                    })
                } else {
                    throw err.response.data
                }
            })
        } catch (error) {
            Swal.fire({
                title: "error",
                text: error.message,
                icon: "error"
            })
        }

    }



    return (
        <div className=" min-h-screen flex flex-col justify-center items-center">
            <div className='border rounded-3xl p-5 flex flex-col md:w-[600px] w-full bg-gray-100'>
                <h1 className="mb-8 text-3xl text-center">Sign in</h1>
                <form className="w-full" onSubmit={handlesubmit} >
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/4">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="Username">
                                Username
                            </label>
                        </div>
                        <div className="md:w-3/4">
                            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                id="Username"
                                type="text"
                                name='username'
                                required
                                value={sendData.username}
                                onChange={handlechange}
                                placeholder="Username" />
                        </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/4">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="Password">
                                Password
                            </label>
                        </div>
                        <div className="md:w-3/4">
                            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                id="Password"
                                type="password"
                                name='password'
                                required
                                value={sendData.password}
                                onChange={handlechange}
                                placeholder="******************" />
                        </div>
                    </div>

                    <div className="flex items-center justify-center">
                        <div className="flex gap-3 mx-5 justify-center w-full">
                            <button
                                type="submit"
                                className="basis-1/4 text-nowrap px-10 text-center py-3 rounded bg-blue-500 text-white hover:bg-blue-700 focus:outline-none my-1">
                                Sign in
                            </button>
                            <Link
                                to="/"
                                className="basis-1/4 px-10 text-center py-3 rounded bg-red-500 text-white hover:bg-red-700 focus:outline-none my-1">
                                Cancel
                            </Link>
                        </div>
                    </div>
                    <div className="text-grey-dark mt-6 flex items-center justify-center">
                        If you don't have an account.&nbsp;
                        <Link className="no-underline border-b border-blue text-blue text-blue-700" to="/signup">
                            Sign up
                        </Link>.
                    </div>
                </form>
            </div>
        </div>
    )
}
