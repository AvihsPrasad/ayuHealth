'use client'
import { EllipsisVerticalIcon, MagnifyingGlassCircleIcon, PhoneIcon, PhotoIcon, PlusIcon, TrashIcon, XMarkIcon } from '@heroicons/react/20/solid'
import React, { useState, useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { useFetch } from '@/lib/fetch'

interface StaffType {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  hospital_id: string;
  department?: string;
}

export default function Staff() {
  const userRedux = useSelector((state: RootState) => state.user)
  const [staff, setStaff] = useState<StaffType[]>([])
  const [searchQuery, setSearchQuery] = useState('');
  const { data: staffDBdata, loading, error } = useFetch<any[]>(`/api/getstaff?hospital_id=${userRedux.active_hospital.id}`);
  console.log('staffDBdata', staffDBdata);

  useEffect(() => {
    if (staffDBdata && staffDBdata.length > 0) {
      setStaff(staffDBdata);
    }
  }, [staffDBdata])

  const filteredStaff = useMemo(() => {
    return staff.filter(staffMember =>
      staffMember.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staffMember.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staffMember.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (staffMember.department && staffMember.department.toLowerCase().includes(searchQuery.toLowerCase()))
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
          <PlusIcon className='size-5' /> Add Staff
        </button>
      </div>
      {/* list of staff as a cards  */}
      {loading && <div className='animate-pulse'>Loading appointments...</div>}

      {!loading && <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-auto max-h-[calc(100vh-200px)]'>
        {filteredStaff.map((staffMember) => (
          <div key={staffMember.id} className="bg-white p-4 rounded-md inset-ring-1 inset-ring-gray-300">
            <div className="flex flex-col gap-4">
              <div>
                <div className="bg-gray-300 w-full h-48 flex justify-center items-center">
                  <PhotoIcon className='size-10 m-auto text-gray-400' />
                </div>
              </div>
              <div>
                <div className="text-base font-medium">{staffMember.name}</div>
                <div className="text-sm font-medium text-gray-400">{staffMember.role}</div>
              </div>
            </div>
            <div className="flex flex-row mt-5">
              <button className="w-full flex flex-row cursor-pointer justify-center items-center gap-2 bg-white p-3 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 focus-visible:hidden">
                <PhoneIcon className='size-5' /> Ring
              </button>
              <span className='bg-gray-200 w-1 mx-0.5'></span>
              <button className="w-full flex flex-row cursor-pointer justify-center items-center gap-2 bg-white p-3 py-4 text-sm font-semibold text-gray-600  hover:bg-gray-100 focus-visible:hidden">
                <EllipsisVerticalIcon className='size-5' /> More
              </button>
            </div>
            <button className="mt-4 w-full flex flex-row cursor-pointer justify-center items-center gap-2 bg-red-200 p-3 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 focus-visible:hidden">
                <TrashIcon className='size-5' /> Remove
              </button>
          </div>
        ))}
      </div>}
    </div>
  )
}
