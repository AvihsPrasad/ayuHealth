'use client'
import { useFetch } from '@/lib/fetch';
import { EllipsisVerticalIcon, MagnifyingGlassCircleIcon, PhoneIcon, PlusIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useMemo } from 'react'

interface PatientType {
  id: string;
  name: string;
  aadhar: string;
  phone: string;
  email: string;
  age: number;
  gender: string;
  dob: string;
  father_name: string;
  mother_name: string;
  history: string;
}

export default function Patients() {

  const router = useRouter();
  const [patients, setPatients] = useState<PatientType[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('')
    const { data: patientDbData, loading, error } = useFetch<any[]>(`/api/getpatients`);

  useEffect(() => {
    if (patientDbData && patientDbData.length > 0) {
      setPatients(patientDbData);
    }
  }, [patientDbData])

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const search = urlParams.get('search')
    const sort = urlParams.get('sort')
    if (search) setSearchQuery(search)
    if (sort) setSortBy(sort)
  }, [])

  const filteredPatients = useMemo(() => {
    let filtered = patients.filter(patient =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.phone.includes(searchQuery) ||
      patient.aadhar.includes(searchQuery)
    );
    if (sortBy === 'aadhar') {
      filtered = filtered.sort((a, b) => a.aadhar.localeCompare(b.aadhar))
    }
    return filtered;
  }, [patients, searchQuery, sortBy]);

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
              placeholder="Search patients"
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
          <PlusIcon className='size-5' /> Add Patient
        </button>
      </div>
      {/* list of patients as a cards  */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-auto max-h-[calc(100vh-210px)]'>
        {filteredPatients.map((patient) => (
          <div key={patient.id} className="bg-white p-4 rounded-md inset-ring-1 inset-ring-gray-300">
            <div className="flex flex-row gap-4">
              <div>
                <div className="bg-gray-300 w-16 h-16 rounded-full"></div>
              </div>
              <div>
                <div className="text-base font-medium">{patient.name}</div>
                {/* <div className="text-sm font-medium text-gray-500">{patient.id}</div> */}
                <div className="text-sm font-medium text-gray-500">{patient.aadhar}</div>
              </div>
            </div>
            <div className="flex flex-row mt-5">
              <button className="w-full flex flex-row cursor-pointer justify-center items-center gap-2 bg-white p-3 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 focus-visible:hidden">
                <PhoneIcon className='size-5' /> Contact
              </button>
              <span className='bg-gray-200 w-1 mx-0.5'></span>
              <button 
                onClick={() => router.push('/dashboard/patients/' + patient.id)}
                className="w-full flex flex-row cursor-pointer justify-center items-center gap-2 bg-white p-3 py-4 text-sm font-semibold text-gray-600  hover:bg-gray-100 focus-visible:hidden">
                <EllipsisVerticalIcon className='size-5' /> More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
