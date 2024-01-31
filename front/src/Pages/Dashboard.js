import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import config from '../Service/config';
import Swal from 'sweetalert2';
import { CiEdit } from "react-icons/ci";
import { FaTimes } from "react-icons/fa";
import { FaRegMinusSquare } from "react-icons/fa";
import { FaRegPlusSquare } from "react-icons/fa";
import Chart from "react-apexcharts";


export default function Dashboard() {
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    const options_time = {
        hour: "numeric",
        minute: "numeric",
    };


    const [dashboardList, setDashboardList] = useState([])
    const [totalExpense, setTotalExpense] = useState(0)
    const [totalIncome, setTotalIncome] = useState(0)

    const [dateSelected, setDateSelected] = useState((new Date().toLocaleString("default", { year: "numeric" }) + "-" +
        new Date().toLocaleString("default", { month: "2-digit" }) + "-" +
        new Date().toLocaleString("default", { day: "2-digit" })))

    const fetchdataList = async () => {
        try {
            await axios.post(config.api_path + "/dashboard/list", { date: dateSelected }, config.headers()).then(res => {
                if (res.data.message === "success") {
                    setDashboardList(res.data.results)
                }
            }).catch(err => {
                throw err
            })
        } catch (error) {
            Swal.fire({
                title: "error",
                text: error.message,
                icon: "error"
            })
        }
    }

    useEffect(() => {
        let totalex = 0
        let totalin = 0
        dashboardList.map(item => {

            if (item.actiontype === "Income") {
                totalin = totalin + parseFloat(item.money)
            } else if (item.actiontype === "Expense") {
                totalex = totalex + parseFloat(item.money)
            }
            return item
        })
        setTotalExpense(totalex)
        setTotalIncome(totalin)
    }, [dashboardList])

    useEffect(() => {
        fetchdataList()
    }, [dateSelected])

    const handleDeleteItem = async (item) => {
        try {
            Swal.fire({
                title: `Confirm to continue`,
                text: `Confirm to delete this expense`,
                icon: 'question',
                showCancelButton: true,
                showConfirmButton: true
            }).then(async (res) => {
                if (res.isConfirmed) {
                    try {
                        await axios.delete(config.api_path + `/dashboard/delete/${item.id}`, config.headers()).then(res => {
                            if (res.data.message === "success") {
                                Swal.fire({
                                    title: `Delete item`,
                                    text: `Your item already delete`,
                                    icon: 'success',
                                    timer: 2000,
                                    showConfirmButton: false
                                })
                                fetchdataList()
                            }
                        }).catch(err => {
                            throw err
                        })
                    } catch (error) {
                        Swal.fire({
                            title: "error",
                            text: error.message,
                            icon: "error"
                        })
                    }

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



    return (
        <div className='p-5 '>
            <div className='my-3 flex justify-center'>
                <div className='text-[1.5em] underline'>Dashboard</div>
            </div>
            <div className='flex justify-evenly'>
                <div className='w-[50%]'>
                    <div className='my-5 flex justify-center items-center gap-2'>
                        <div>Net profit = </div>
                        <div className={`border rounded-[1em] text-[1.2em] text-white ${totalIncome >= totalExpense ? "bg-green-700" : "bg-red-700"} p-2 underline`}>{(parseFloat(totalIncome) - parseFloat(totalExpense)).toLocaleString("th-TH")}</div>
                        <div>Baht.</div>
                    </div>
                    <div className='my-5 flex justify-center items-center gap-2'>
                        <div>Income = </div>
                        <div className='border rounded-[1em] text-[1.2em] bg-gray-100 p-2 underline'>{parseFloat(totalIncome).toLocaleString("th-TH")}</div>
                        <div>Baht.</div>
                    </div>
                    <div className='my-5 flex justify-center items-center gap-2'>
                        <div>Expense = </div>
                        <div className='border rounded-[1em] text-[1.2em] bg-gray-100 p-2 underline'>{parseFloat(totalExpense).toLocaleString("th-TH")}</div>
                        <div>Baht.</div>
                    </div>
                </div>

                <div className='items-center w-[50%] '>
                    <Chart
                        type="pie"
                        width="100%"
                        height="100%"
                        options={{
                            chart: {
                                toolbar: {
                                    show: false,
                                },
                            },
                            title: {
                                show: "",
                            },
                            dataLabels: {
                                enabled: true,
                                formatter: function (value, { seriesIndex, dataPointIndex, w }) {
                                    return w.config.series[seriesIndex] + ` - (${Math.round(value)}%)`
                                },
                                style: {
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    colors: ["#000000", "#000000"]
                                },
                            },
                            tooltip: {
                                enabled: false,
                            },


                            labels: [`Income`, `Expense`],
                            colors: ["#4786fc", "#fa6161"],
                            legend: {
                                show: true,
                                position: 'bottom',
                                onItemClick: {
                                    toggleDataSeries: true
                                },
                                onItemHover: {
                                    highlightDataSeries: true
                                },
                                fontSize: '18px',
                            }
                        }} series={[totalIncome, totalExpense]} />
                </div>
            </div>
            <div className='sticky top-14 z-[49] sm:top-20  my-5 flex justify-between gap-3 bg-white'>
                <div className="flex gap-3">
                    <Link to="./addincome" className="inline-block items-center p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-700 group">
                        <div className="flex items-center">
                            <FaRegPlusSquare className='w-[20px] h-[20px] sm:w-[30px] sm:h-[30px]' />
                            <span className={`flex-1 ms-1 sm:ms-3 whitespace-nowrap flex`}><span className='hidden sm:flex'>Add&nbsp;</span>Income</span>
                        </div>
                    </Link>
                    <Link to="./addexpense" className="inline-block items-center p-2 rounded-lg bg-red-500 text-white hover:bg-red-700 group">
                        <div className="flex items-center">
                            <FaRegMinusSquare className='w-[20px] h-[20px] sm:w-[30px] sm:h-[30px]' />
                            <span className={`flex-1 ms-1 sm:ms-3 whitespace-nowrap flex`}><span className='hidden sm:flex'>Add&nbsp;</span>Expense</span>
                        </div>
                    </Link>
                </div>

                <div>
                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="Name"
                        type="date"
                        name='date'
                        value={dateSelected}
                        onChange={(e) => setDateSelected(e.target.value)}
                    />
                </div>
            </div>




            <div className=" overflow-x-auto shadow-md sm:rounded-lg ">
                <table className=" w-full text-left rtl:text-right text-gray-500">
                    <thead className=" text-[1.25em] text-gray-700 uppercase bg-gray-50 ">
                        <tr >
                            <th scope="col" className=" px-6 py-3 bg-gray-50">
                                Date
                            </th>
                            <th scope="col" className=" px-6 py-3 text-center bg-gray-50">
                                Time
                            </th>
                            <th scope="col" className=" px-6 py-3 text-center bg-gray-50">
                                Type
                            </th>
                            <th scope="col" className=" px-6 py-3 text-center bg-gray-50">
                                Name
                            </th>
                            <th scope="col" className=" px-6 py-3 text-center bg-gray-50">
                                Money
                            </th>

                            <th scope="col" className=" px-6 py-3 text-center bg-gray-50">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {dashboardList.map((item) => {
                            const date = new Date(item.datetime)
                            return (
                                <tr key={item.id} className="odd:bg-white even:bg-gray-50 border-b ">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {date.toLocaleDateString('en-GB', options)}
                                    </th>
                                    <td className="px-6 py-4 text-center">
                                        {date.toLocaleString('en-GB', options_time)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        {item.actiontype}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        {item.name}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {parseInt(item.money).toLocaleString("th-TH")}
                                    </td>

                                    <td className="flex px-6 py-4 justify-center">
                                        <Link to={`./edit/${item.id}`} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-3 py-2.5 me-2 mb-2 flex justify-center items-center"><CiEdit className='w-[20px] h-[20px] sm:w-[30px] sm:h-[30px]' /><span className='mx-2 hidden sm:flex'>Edit</span></Link>
                                        <button
                                            onClick={() => handleDeleteItem(item)}
                                            type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg px-2 py-2.5 me-2 mb-2 flex justify-center items-center"><FaTimes className='w-[20px] h-[20px] sm:w-[30px] sm:h-[30px]' /><span className='mx-2 hidden sm:flex'>Delete</span></button>
                                    </td>
                                </tr>
                            )
                        })}


                    </tbody>
                </table>
            </div>


        </div>
    )
}
