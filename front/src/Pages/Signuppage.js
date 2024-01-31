import axios from 'axios'
import React, { useState } from 'react'
import Swal from 'sweetalert2'
import config from '../Service/config'
import { Link, useNavigate } from 'react-router-dom'

export default function Signuppage() {
    const [sendData, setSendData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        username: "",
        password: "",
        conPassword: ""
    })
    const navigate = useNavigate()

    const handlechange = (event) => {
        const value = event.target.value
        if (!value.includes(" ")) {
            setSendData((prev) => ({ ...prev, [event.target.name]: event.target.value }))
        }


    }

    const handlesubmit = async (e) => {
        e.preventDefault()
        console.log("test");
        if (sendData.password !== sendData.conPassword) {
            console.log("test2");
            Swal.fire({
                title: `Check password`,
                text: `Password and Confirm Password is not same.`,
                icon: 'warning',
                timer: 2000,
                showConfirmButton: true
            })
        } else {
            try {
                await axios.post(config.api_path + "/user/signup", sendData)
                    .then(res => {
                        if (res.data.message === "success") {
                            Swal.fire({
                                title: `Sign up success`,
                                text: `You sign up success. We will navigate to login page`,
                                icon: 'success',
                                timer: 2000,
                                showConfirmButton: true
                            }).then(() => {
                                navigate('/login')
                            })
                        }
                        console.log(res);
                    }).catch(err => {
                        // console.log(err);
                        if (err.response.status === 401) {
                            Swal.fire({
                                title: `Change username`,
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
    }



    return (
        <div className=" min-h-screen flex flex-col justify-center items-center">
            <div className='border rounded-3xl p-5 flex flex-col md:w-[700px] w-full bg-gray-100'>
                <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                <form className="w-full" onSubmit={handlesubmit} >

                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/4">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="Firstname">
                                Firstname
                            </label>
                        </div>
                        <div className="md:w-3/4">
                            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                id="Firstname"
                                type="text"
                                name='firstname'
                                required
                                value={sendData.firstname}
                                onChange={handlechange}
                                placeholder="Firstname" />
                        </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/4">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="Lastname">
                                Lastname
                            </label>
                        </div>
                        <div className="md:w-3/4">
                            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                id="Lastname"
                                type="text"
                                name='lastname'
                                required
                                value={sendData.lastname}
                                onChange={handlechange}
                                placeholder="Lastname" />
                        </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/4">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="Email">
                                Email
                            </label>
                        </div>
                        <div className="md:w-3/4">
                            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                id="Email"
                                type="email"
                                name='email'
                                required
                                value={sendData.email}
                                onChange={handlechange}
                                placeholder="yourname@email.com" />
                        </div>
                    </div>
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
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/4">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="Confirm_password">
                                Confirm Password
                            </label>
                        </div>
                        <div className="md:w-3/4">
                            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                id="Confirm_password"
                                type="password"
                                name='conPassword'
                                required
                                value={sendData.conPassword}
                                onChange={handlechange}
                                placeholder="******************" />
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="flex justify-center gap-3 mx-5 w-full">
                            <button
                                type="submit"
                                className="basis-1/4 px-3 text-nowrap text-center py-3 rounded bg-blue-500 text-white hover:bg-blue-700 focus:outline-none my-1">
                                Create Account
                            </button>
                            <Link
                                to="/"
                                className="basis-1/4 px-3 text-center py-3 rounded bg-red-500 text-white hover:bg-red-700 focus:outline-none my-1">
                                Cancel
                            </Link>
                        </div>
                    </div>
                    <div className="text-grey-dark mt-6 flex items-center justify-center">
                        Already have an account?&nbsp;
                        <Link className="no-underline border-b border-blue text-blue text-blue-700" href="/login/">
                            Log in
                        </Link>.
                    </div>
                </form>
            </div>
        </div>
    )
}
