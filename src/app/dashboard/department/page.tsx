'use client'
import { EllipsisVerticalIcon, MagnifyingGlassCircleIcon, PhoneIcon, PhotoIcon, PlusIcon, TrashIcon, XMarkIcon } from '@heroicons/react/20/solid'
import React, { useState, useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'

interface StaffType {
    id: string;
    name: string;
    department: string;
    position: string;
    docId: string;
}

export default function Department() {
    const userId = useSelector((state: RootState) => state.user.userId)
    const [staff, setStaff] = useState<StaffType[]>([])
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        fetch('/json/staff.json')
            .then(response => response.json())
            .then(data => {
                if (userId) {
                    const filteredData = data.filter((staffMember: StaffType) => staffMember.docId === userId);
                    setStaff(filteredData);
                } else {
                    setStaff(data);
                }
            })
            .catch(error => console.error('Error fetching staff:', error))
    }, [userId])

    const filteredStaff = useMemo(() => {
        return staff.filter(staffMember =>
            staffMember.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            staffMember.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            staffMember.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
            staffMember.position.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [staff, searchQuery]);

    return (
        <div className='p-4'>
            <div className='flex flex-row items-center gap-4 mb-8'>
                <div className="grow pr-20">
                    <span className='relative'>
                        <div className='absolute left-3 top-3.5 pointer-events-none'>
                            <MagnifyingGlassCircleIcon className='size-5 text-gray-400' />
                        </div>
                        <input
                            id="search"
                            name="search"
                            type="text"
                            placeholder="Search staff"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="block w-full rounded-full bg-gray-100 pl-10 pr-10 py-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-400 sm:text-sm/6"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className='absolute right-3 top-3.5 text-gray-400 hover:text-gray-600'
                            >
                                <XMarkIcon className='size-5' />
                            </button>
                        )}
                    </span>
                </div>
                <button
                    className="flex flex-row rounded-md cursor-pointer items-center gap-2 bg-blue-600 p-3 py-2 text-sm font-semibold text-white shadow-md hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                >
                    <PlusIcon className='size-5' /> Add Departments
                </button>
            </div>
            {/* list of staff as a cards  */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-auto max-h-[calc(100vh-210px)]'>
                {filteredStaff.map((staffMember) => (
                    <div key={staffMember.id} className='bg-white flex flex-row  inset-ring-1 inset-ring-gray-300'>
                        <span className='w-1 h-full bg-red-600'></span>
                        <div className="p-4">
                            <div className="flex flex-row gap-4 items-center">
                                <div>
                                    <div className="bg-gray-200 w-8 h-8 flex justify-center items-center">
                                        <PhotoIcon className='size-4 m-auto text-gray-400' />
                                    </div>
                                </div>
                                <div>
                                    <div className="text-base font-medium">{staffMember.name}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
