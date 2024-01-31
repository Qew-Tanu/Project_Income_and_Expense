import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios';
import config from '../Service/config';
import Swal from 'sweetalert2';


export default function Recording() {
    const navigate = useNavigate()
    const [profile, setProfile] = useState({
        id: "",
        firstname: "",
        lastname: ""
    })

    const fetchuserdata = async () => {
        try {
            await axios.get(config.api_path + "/user/detail", config.headers()).then(res => {
                setProfile(res.data.user)
            }).catch(err => {
                throw err.response.data
            })
        } catch (error) {
            Swal.fire({
                title: "error",
                text: "please log in again",
                icon: "error",
                timer: 2000,
            }).then(() => {
                navigate('/')
            })
        }
    }

    const handleSignOut = () => {
        Swal.fire({
            title: `Sign out`,
            text: `Confirm to sign out`,
            icon: 'question',
            showCancelButton: true,
            showConfirmButton: true
        }).then((res) => {
            if (res.isConfirmed) {
                localStorage.removeItem(config.token_name)
                navigate('/')
            }
        })
    }

    useEffect(() => {
        fetchuserdata()
    }, [])





    return (
        <div className="h-screen text-xs sm:text-lg">

            <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6 h-20">

                <div className="flex justify-center items-center flex-shrink-0 text-white ">
                    <span className="font-semibold text-[1.5em] tracking-tight text-center">Welcome {profile.firstname + " " + profile.lastname}</span>
                </div>
                <div className=" flex lg:items-center gap-3">
                    <button onClick={handleSignOut} className=" px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-0">Sign out</button>
                </div>
            </nav>
            <div className='h-[calc(100%-5rem)]'>
                <Outlet />
            </div>

        </div>


    )
}
