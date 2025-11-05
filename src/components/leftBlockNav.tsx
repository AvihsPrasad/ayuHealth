"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ArrowRightEndOnRectangleIcon, ArrowRightStartOnRectangleIcon, CreditCardIcon, LifebuoyIcon, MagnifyingGlassCircleIcon, UserCircleIcon, WrenchIcon, WrenchScrewdriverIcon } from '@heroicons/react/20/solid'
import { BellIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../redux/store'
import { useClerk, useUser } from '@clerk/nextjs';

function LeftBlockNav() {
    const { signOut } = useClerk();
    const { user } = useUser();
    const userId = useSelector((state: RootState) => state.user.userId)
    const userName = useSelector((state: RootState) => state.user.userName)
    const hospitalId = useSelector((state: RootState) => state.user.hospitalId)
    const [hospitalName, setHospitalName] = React.useState('')

    const reduuxUserDetails = useSelector((state: RootState) => state.user)

    // React.useEffect(() => {
    //     fetch('/json/profile.json')
    //         .then(res => res.json())
    //         .then(data => {
    //             const user = data.find((profile: any) => profile.id === userId)
    //             if (user) {
    //                 const hospital = user.hospitals.find((h: any) => h.id === hospitalId)
    //                 if (hospital) {
    //                     setHospitalName(hospital.name)
    //                 }
    //             }
    //         })
    // }, [userId, hospitalId])
    return (
        <div className='flex flex-row h-16 items-center px-6 bg-white after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10 border-b-[1px] border-gray-300 z-10'>

            <div className='grow'>
                <p className='text-violet-800 font-bold'>{reduuxUserDetails.active_hospital.name || 'Hospital Name'}</p>
                {/* <span className='relative'>
                    <div className='absolute left-3 top-2 pointer-events-none'>
                        <MagnifyingGlassCircleIcon className='size-5 text-gray-400' />
                    </div>
                    <input
                        id="email"
                        name="Search"
                        type="text"
                        placeholder="Search"
                        className="block w-full rounded-full bg-gray-100 pl-10 pr-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-400 sm:text-sm/6"
                    />
                </span> */}
            </div>
            <div className='flex flex-row gap-4 ml-auto'>
                <Link
                    href={`/dashboard/profile/${userId}?tab=Notifications`}
                    className="relative cursor-pointer rounded-full p-2 text-gray-500 hover:bg-stone-200 focus:outline-2 focus:outline-offset-2 focus:outline-gray-400"
                >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <div className="absolute right-2 flex size-3">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex size-2 rounded-full bg-red-700"></span>
                    </div>
                    <BellIcon aria-hidden="true" className="size-6" />
                </Link>
                <Menu as="div" className="relative ml-3 cursor-pointer">
                    <MenuButton className="relative cursor-pointer flex items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                            alt="img"
                            src={user?.imageUrl}
                            className="size-8 rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10"
                        />
                        <ChevronDownIcon aria-hidden="true" className="size-5 text-gray-500 ml-1 mt-1" />
                    </MenuButton>

                    <MenuItems
                        transition
                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white ring-1 ring-stone-300 py-1 outline -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                    >
                        <MenuItem>
                            <a
                                href={`/dashboard/profile/${userId}`}
                                className="flex flex-row items-center gap-3 px-4 py-2 text-base text-gray-500 hover:text-gray-800 hover:font-semibold data-focus:bg-gray-200 data-focus:outline-hidden"
                            >
                                <UserCircleIcon className='size-5' /> {userName}
                            </a>
                        </MenuItem>
                        <MenuItem>
                            <Link
                                href={`/dashboard/profile/${userId}?tab=Subscription`}
                                className="flex flex-row items-center gap-3 px-4 py-2 text-sm text-gray-500 hover:text-gray-800 hover:font-semibold data-focus:bg-gray-200 data-focus:outline-hidden"
                            >
                                <CreditCardIcon className='size-5' /> Subscription
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <Link
                                href={`/dashboard/profile/${userId}?tab=About`}
                                className="flex flex-row items-center gap-3 px-4 py-2 text-sm text-gray-500 hover:text-gray-800 hover:font-semibold data-focus:bg-gray-200 data-focus:outline-hidden"
                            >
                                <WrenchScrewdriverIcon className='size-5' /> About
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <Link
                                href={`/dashboard/profile/${userId}?tab=Feedbacks`}
                                className="flex flex-row items-center gap-3 px-4 py-2 text-sm text-gray-500 hover:text-gray-800 hover:font-semibold data-focus:bg-gray-200 data-focus:outline-hidden"
                            >
                                <LifebuoyIcon className='size-5' /> Feedback
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <button
                                className="flex flex-row w-full items-center gap-3 px-4 py-2 text-sm text-gray-500 hover:text-gray-800 hover:font-semibold data-focus:bg-gray-200 data-focus:outline-hidden"
                                onClick={async () => await signOut({ redirectUrl: '/' })}
                            >
                                <ArrowRightStartOnRectangleIcon className='size-5' /> Sign out
                            </button>
                        </MenuItem>
                    </MenuItems>
                </Menu>
            </div>
        </div>
    )
}

export default LeftBlockNav
