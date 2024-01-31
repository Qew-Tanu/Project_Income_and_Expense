import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import config from '../Service/config';
import Swal from 'sweetalert2';



export default function Editpage() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [sendData, setSendData] = useState({
        id: "",
        name: "",
        money: "",
        datetime: new Date().toISOString().split(':').slice(0, 2).join(":"),
        actiontype: ""
    })


    useEffect(() => {
        fetchItemData()
    }, [])


    const fetchItemData = async () => {
        try {
            await axios.get(config.api_path + `/dashboard/${id}`, config.headers()).then(res => {
                if (res.data.message === "success") {
                    const date = new Date(res.data.results.datetime)
                    const dateConvert = date.toLocaleString("default", { year: "numeric" }) + "-" +
                        date.toLocaleString("default", { month: "2-digit" }) + "-" +
                        date.toLocaleString("default", { day: "2-digit" }) + "T" +
                        date.toLocaleString("en-GB", { timeStyle: "short" })
                    setSendData({ ...res.data.results, datetime: dateConvert })
                }
            }).catch(err => {
                throw err.data.message
            })
        } catch (error) {
            Swal.fire({
                title: "error",
                text: error.message,
                icon: "error"
            })
        }

    }



    const goBack = () => {
        navigate(-1);
    }


    const handlechange = (event) => {
        setSendData((prev) => ({ ...prev, [event.target.name]: event.target.value }))
    }



    const handlesubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.patch(config.api_path + "/dashboard/update", sendData, config.headers()).then(res => {
                if (res.data.message === "success") {
                    Swal.fire({
                        title: `Income`,
                        text: `Your income update success.`,
                        icon: 'success',
                        timer: 2000,
                        showConfirmButton: true
                    }).then(() => {
                        navigate(-1)
                    })
                }
            }).catch(err => {
                throw err.data
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
        <div className="min-h-[calc(100vh-56px)] flex flex-col justify-center items-center">
            <div className='border rounded-3xl p-5 flex flex-col md:w-[600px] w-full bg-gray-100'>
                <h1 className="mb-8 text-3xl text-center">Update {sendData.actiontype}</h1>
                <form className="w-full"
                    onSubmit={handlesubmit}
                >
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/4">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="Username">
                                Type
                            </label>
                        </div>
                        <div className="md:w-3/4">
                            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                id="Name"
                                type="text"
                                name='name'
                                readOnly
                                disabled
                                value={sendData.actiontype + " (Can't change type)"}
                                placeholder="Name" />
                        </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/4">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="Username">
                                Income Name
                            </label>
                        </div>
                        <div className="md:w-3/4">
                            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                id="Name"
                                type="text"
                                name='name'
                                required
                                value={sendData.name}
                                onChange={handlechange}
                                placeholder="Name" />
                        </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/4">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="Username">
                                Money
                            </label>
                        </div>
                        <div className="md:w-3/4">
                            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                id="Name"
                                type="number"
                                name='money'
                                required
                                value={sendData.money}
                                onChange={handlechange}
                                placeholder="10,000" />
                        </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/4">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="Username">
                                Date and time
                            </label>
                        </div>
                        <div className="md:w-3/4">
                            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                id="Name"
                                type="datetime-local"
                                name='datetime'
                                required
                                value={sendData.datetime}
                                onChange={handlechange}
                            />
                        </div>
                    </div>


                    <div className="flex items-center justify-center">
                        <div className="flex gap-3 mx-5 justify-center w-full">
                            <button
                                type="submit"
                                className="basis-1/4 text-nowrap px-10 text-center py-3 rounded bg-blue-500 text-white hover:bg-blue-700 focus:outline-none my-1">
                                Update
                            </button>
                            <button
                                onClick={goBack}
                                className="basis-1/4 px-10 text-center py-3 rounded bg-red-500 text-white hover:bg-red-700 focus:outline-none my-1">
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
