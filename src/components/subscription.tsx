import React from 'react'

function Subscription() {
    return (
        <div>
            <div className='grid grid-cols-2 gap-4'>
                <div className="p-8 rounded-lg bg-white inset-ring-1 inset-ring-gray-400">
                    <div className="flex flex-row items-center mb-4">
                        <h3 className="text-base font-semibold flex-1">Your Plan Information</h3>
                        <div>
                            <span className="inline-flex items-center rounded-md bg-purple-400/10 px-2 py-1 text-xs font-medium text-purple-400 inset-ring inset-ring-purple-400/30">
                                Active Subscription
                            </span>
                        </div>
                    </div>
                    <div className='flex flex-row mb-2'>
                        <div className="text-sm flex-1">Plan</div>
                        <div className="text-sm font-semibold">Monthly Plan</div>
                    </div>
                    <div className='flex flex-row'>
                        <div className="text-sm flex-1">Price of your current plan</div>
                        <div className="text-sm font-semibold">1, 200</div>
                    </div>
                </div>

                <div className="p-8 rounded-lg bg-white inset-ring-1 inset-ring-gray-400">
                    <div className="flex flex-row items-center mb-4">
                        <h3 className="text-base font-semibold flex-1">Next Billing Information</h3>
                        {/* <div>
                            <span className="inline-flex items-center rounded-md bg-purple-400/10 px-2 py-1 text-xs font-medium text-purple-400 inset-ring inset-ring-purple-400/30">
                                Active Subscription
                            </span>
                        </div> */}
                    </div>
                    <div className='flex flex-row mb-2'>
                        <div className="text-sm flex-1">Payment <span className='italic font-light text-gray-500'>(billed monthly)</span></div>
                        <div className="text-sm font-semibold">Monthly Plan</div>
                    </div>
                    <div className='flex flex-row'>
                        <div className="text-sm flex-1">Next Invoice Date <a href='#' className='italic text-xs text-amber-600 ml-3 hover:underline'>View invoice history</a></div>
                        <div className="text-sm font-semibold">01st November 2025</div>
                    </div>
                </div>
                <div className="p-8 rounded-lg bg-white inset-ring-1 inset-ring-gray-400">
                    <div className="flex flex-row items-center mb-4">
                        <h3 className="text-base font-semibold flex-1">Billing Details</h3>
                        <div>
                            <span className="inline-flex items-center rounded-md bg-purple-400/10 px-2 py-1 text-xs font-medium text-purple-400 inset-ring inset-ring-purple-400/30">
                                Edit
                            </span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <div className="text-xs flex-1 text-gray-500">Billing Name</div>
                            <div className="text-sm font-semibold">User Name</div>
                        </div>
                        <div>
                            <div className="text-xs flex-1 text-gray-500">Email Address</div>
                            <div className="text-sm font-semibold">email</div>
                        </div>
                        <div>
                            <div className="text-xs flex-1 text-gray-500">License</div>
                            <div className="text-sm font-semibold">User Name</div>
                        </div>
                        <div>
                            <div className="text-xs flex-1 text-gray-500">Phone</div>
                            <div className="text-sm font-semibold">User Name</div>
                        </div>
                        <div className="col-span-2">
                            <div className="text-xs flex-1 text-gray-500">Billing Address</div>
                            <div className="text-sm font-semibold">Address</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Subscription