"use client"
import React from 'react'
import { PhotoIcon } from '@heroicons/react/24/outline'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/redux/store'
import { setActiveHospital } from '@/redux/userSlice'

interface HospitalTabProps {
  reduuxUserDetails: any
}

export default function HospitalTab({ reduuxUserDetails }: HospitalTabProps) {
  const dispatch = useDispatch()
  const currentHospitalId = useSelector((state: RootState) => state.user.active_hospital.id)

  // Handler for selecting a hospital
  const handleHospitalSelect = (hospital: any) => {
    dispatch(setActiveHospital({id: hospital.id , name: hospital.name}))
  }

  return (
    <div className="bg-white p-6 rounded-lg ring-1 ring-stone-700/20">
      <h2 className="text-lg font-semibold mb-4">Hospitals associated with</h2>
      <div className="grid grid-cols-2 gap-4">
        {reduuxUserDetails.hospitalId && reduuxUserDetails.hospitalId.length > 0 ? (
          reduuxUserDetails.hospitalId.map((hospital: any, idx: number) => (
            <div
              key={idx}
              className={`flex flex-col items-center justify-center gap-8 p-10 border rounded cursor-pointer ${hospital.id === currentHospitalId ? 'border-2 border-dashed border-red-500 bg-red-50' : 'border-gray-300'}`}
              onClick={() => handleHospitalSelect(hospital)}
            >
              <p className={`rounded-full flex items-center justify-center${hospital.id === currentHospitalId ? 'text-red-500 ' : 'text-gray-500 '}`}>
                <PhotoIcon className={`size-10 ${hospital.id === currentHospitalId ? 'text-red-500 ' : 'text-gray-500 '}`} />
              </p>
              <div className={`font-semibold text-base ${hospital.id === currentHospitalId ? 'text-red-500 ' : 'text-gray-500 '}`}>{hospital.name}</div>
            </div>
          ))
        ) : (
          <div className="text-sm text-gray-500">No hospitals associated</div>
        )}
      </div>
    </div>
  )
}
