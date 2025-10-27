"use client";
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import { ArrowLeftIcon, BriefcaseIcon, BuildingStorefrontIcon, CalculatorIcon, CalendarDaysIcon, GiftIcon, HomeIcon, Squares2X2Icon, UserGroupIcon } from '@heroicons/react/20/solid';

const sidebarLinks = [
    { name: 'Dashboard', href: '/dashboard', Icon: <Squares2X2Icon aria-hidden="true" className="size-6" /> },
    { name: 'Tokens', href: '/dashboard/token', Icon: <CalculatorIcon aria-hidden="true" className="size-6" /> },
    { name: 'Appointments', href: '/dashboard/appointment', Icon: <CalendarDaysIcon aria-hidden="true" className="size-6" /> },
    { name: 'Patients', href: '/dashboard/patients', Icon: <UserGroupIcon aria-hidden="true" className="size-6" /> },
    { name: 'Staff', href: '/dashboard/staff', Icon: <BriefcaseIcon aria-hidden="true" className="size-6" /> },
    // { name: 'Depatment', href: '/dashboard/department', Icon: <BuildingStorefrontIcon aria-hidden="true" className="size-6" /> },
    // { name: 'Events', href: '/dashboard/events', Icon: <GiftIcon aria-hidden="true" className="size-6" /> },
];



function SideNav({ isCollapsed }: { isCollapsed: boolean }) {
    const pathname = usePathname();
    return (
        <div className="flex flex-col bg-white h-full overflow-y-auto after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10">
            <div className={`flex flex-row w-full justify-center items-center h-16 italic font-bold text-xl bg-neutral-300`}>
                {isCollapsed && <img alt="Your Company" src="/FullLogo.png" className="h-10 w-auto "/>}
                {!isCollapsed && (<div className='flex flex-row gap-2 justify-center items-center'>
                <img alt="Your Company" src="/FullLogo.png" className="mx-auto h-10 w-auto"/>
                <span className=''>AyuHealth</span>
                </div>)}
            </div>
            <nav className="grow relative pt-4 border-t-[1.5px] border-violet-200">
                <ul className="space-y-2">
                    {sidebarLinks.map((item) => {
                        // Extract second path segment
                        const secondSegment = pathname.split('/')[2] || '';
                        const itemSegment = item.href.split('/')[2] || '';
                        const isActive = secondSegment === itemSegment;
                        return (
                            <li key={item.name} className='flex flex-row hover:bg-violet-400'>
                                <span className={`w-1.5 ${isActive ? ' bg-violet-500 rounded-e-md': ''}`}></span>
                                <Link
                                    href={item.href}
                                    className={`flex w-full gap-3 items-center  ${isCollapsed ? 'flex-col justify-center py-4' : 'flex-row px-4 py-2'} ${isActive ? ' bg-violet-100 text-gray-700 font-semibold' : ' text-gray-700 hover:text-white'}`}
                                >
                                    {React.cloneElement(item.Icon, { className: isCollapsed ? 'size-8' : 'size-6' })}
                                    <span className={`${isCollapsed ? 'text-xs' : ''}`}>{item.name}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
}

export default SideNav;