"use client"
import AdBanner from "@/components/adBanner"
import Header from "@/components/header"
import LeftBlockNav from "@/components/leftBlockNav"
import NotificationBar from "@/components/notificationBar"
import SideNav from "@/components/sideNav"
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/redux/store'
import { setIsCollapsed } from '@/redux/userSlice'

export default function DashboardLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    const dispatch = useDispatch()
    const isCollapsed = useSelector((state: RootState) => state.user.isCollapsed)
    const [localCollapsed, setLocalCollapsed] = useState(false)

    useEffect(() => {
        setLocalCollapsed(isCollapsed)
    }, [isCollapsed])

    return (
        <section>
            {/* Include shared UI here e.g. a header or sidebar */}

            <AdBanner />
            {/* <Header /> */}
            <div className="flex flex-row">
                <div className={`h-screen sticky top-0 transition-all duration-300 ${localCollapsed ? 'w-[100px]' : 'w-[250px]'}`}>
                    <SideNav isCollapsed={localCollapsed} />
                    <button
                        onClick={() => {
                            const newCollapsed = !localCollapsed
                            setLocalCollapsed(newCollapsed)
                            dispatch(setIsCollapsed(newCollapsed))
                        }}
                        className="absolute cursor-pointer bg-white text-gray-500 p-1 rounded-md border border-gray-300 hover:bg-gray-100 top-20 -right-3 z-[999]"
                    >
                        {localCollapsed ? <ArrowRightIcon className="size-4" /> : <ArrowLeftIcon className="size-4" />}
                    </button>
                </div>
                <div className="flex-1">
                    <LeftBlockNav />
                    <main className="p-4 overflow-y-auto max-h-[calc(100vh-66px)] relative">
                        {/* <NotificationBar /> */}
                        {children}
                    </main>
                </div>
            </div>
        </section>
    )
}
