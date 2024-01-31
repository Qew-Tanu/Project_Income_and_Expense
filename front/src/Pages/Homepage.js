import React from 'react'
import { Link } from 'react-router-dom'

export default function Homepage() {
    return (
        <div className='text-xs sm:text-lg'>
            <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6 h-20 text-xs sm:text-lg">
                <div className="flex items-center flex-shrink-0 text-white mr-6">

                </div>
                <div className="hidden lg:flex  items-center flex-shrink-0 text-white mr-6 ">
                    <span className="font-semibold text-xl tracking-tight">Web Application: Income and Expense Recording</span>
                </div>

                <div className=" flex lg:items-center gap-3">
                    <Link to="/login" className="inline-block px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white lg:mt-0">Sign in</Link>
                    <Link to="/signup" className="inline-block px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white lg:mt-0">Sign up</Link>
                </div>
            </nav>
            <div className='max-h-[calc(100vh-5em)] flex flex-col justify-start' >
                <div className='flex justify-center items-center text-center text-[2em] lg:text-[3em] py-5 underline'>
                    <div className='h-fit'>
                        Welcome to Our Web Application
                    </div>
                </div>
                <div className='flex justify-center items-center text-center lg:text-[1.2em] py-5'>
                    <div className='flex justify-center items-center'>
                        <span className='hidden lg:flex '>Our Application is about</span><span className='text-[1.5em] border rounded-xl text-white bg-blue-500 px-3 py-2 mx-2'>Money management Plan</span><span className='hidden lg:flex'>- Income and Expenses</span>
                    </div>
                </div>
                <div className='flex justify-center items-start text-center pt-5 gap-3 h-[300px] sm:h-[500px] lg:h-[500px] px-2 '>
                    <div className='border rounded-md p-3 lg:w-[400px] w-1/2 sm:w-[300px] h-full overflow-y-auto'>
                        <div className='text-[1.5em] underline font-bold'>Income</div>
                        <div className='pt-3 text-start'>
                            <div className='indent-4'>Income is the money you receive in exchange for your labor or products. Income may have different definitions depending on the context—for example, taxation, financial accounting, or economic analysis.</div>
                            <div className='mt-2 indent-4'>For most people, income is their total earnings in the form of wages and salaries, the return on their investments, pension distributions, and other receipts. For businesses, income is the revenue from selling services, products, and any interest and dividends received with respect to their cash accounts and reserves related to the business.</div>
                        </div>

                    </div>
                    <div className='border rounded-md p-3 lg:w-[400px] w-1/2 sm:w-[300px] h-full'>
                        <div className='text-[1.5em] underline font-bold'>Expense</div>
                        <div className='pt-3 text-start '>
                            <div className='indent-4'>An expense is the cost of operations that a company incurs to generate revenue. It is simply defined as the cost one is required to spend on obtaining something. As the popular saying goes, “it costs money to make money.”</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
