import React from 'react'
import { Link } from 'react-router-dom'

export default function Homepage() {
    return (
        <div>
            <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
                <div className="flex items-center flex-shrink-0 text-white mr-6">

                </div>
                <div className="flex items-center flex-shrink-0 text-white mr-6">
                    <span className="font-semibold text-xl tracking-tight">Web Application: Income and Expense Recording</span>
                </div>

                <div className=" flex lg:items-center gap-3">
                    <Link to="/login" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Sign in</Link>
                    <Link to="/signup" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Sign up</Link>
                </div>
            </nav>
            <div>
                Hello
            </div>
        </div>
    )
}
