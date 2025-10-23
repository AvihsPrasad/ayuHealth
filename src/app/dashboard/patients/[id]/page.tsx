"use client"
import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { PlusIcon } from '@heroicons/react/24/outline'
import { ArrowLeftIcon, ArrowRightIcon, ClockIcon, DocumentIcon, TrashIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

export default function PatientProfile() {
  const params = useParams()
  const userName = useSelector((state: RootState) => state.user.userName)
  const [patient, setPatient] = useState<any>(null)
  const [appointments, setAppointments] = useState<any[]>([])
  const [showForm, setShowForm] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  useEffect(() => {
    // Fetch patient details
    fetch('/json/patients.json')
      .then(res => res.json())
      .then(data => {
        const found = data.find((p: any) => p.id === params.id)
        setPatient(found)
      })

    // Fetch appointments and filter by patient name
    fetch('/json/appointment.json')
      .then(res => res.json())
      .then(data => {
        if (patient) {
          const filtered = data.filter((appt: any) => appt.patient_name === patient?.name)
          setAppointments(filtered)
        } else {
          setAppointments(data) // Fallback
        }
      })
  }, [params.id, patient])

  if (!patient) {
    return <div>Patient not found</div>
  }

  // Status config
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'completed':
        return { label: 'Confirmed', color: 'bg-green-100 text-green-800 border-green-300' }
      case 'pending':
        return { label: 'Pending', color: 'bg-orange-100 text-orange-800 border-orange-300' }
      case 'cancelled':
        return { label: 'Cancelled', color: 'bg-red-100 text-red-800 border-red-300' }
      default:
        return { label: status, color: 'bg-gray-100 text-gray-800 border-gray-300' }
    }
  }

  // Dummy notes based on status
  const getDummyNotes = (status: string, patientName: string) => {
    const notes = {
      completed: `It's important to take care of it after the appointment with ${patientName}.`,
      pending: `Please arrive on time for your appointment.`,
      cancelled: `Appointment was cancelled. Reschedule if needed.`
    }
    return notes[status as keyof typeof notes] || 'No notes available.'
  }

  // Format date
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (uploadedFiles.length === 0) return
    const newEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      doctor_name: userName,
      sickness: '',
      treatment: '',
      scaning: uploadedFiles.map(file => file.name).join(', '),
      medicine: ''
    }
    // Update patient history (in a real app, this would be an API call)
    setPatient((prev: any) => ({
      ...prev,
      history: [newEntry, ...prev.history]
    }))
    setUploadedFiles([])
    setShowForm(false)
  }

  return (
    <div className='p-4 pb-2 rounded-xl'>
      {/* Patient Basic Info */}
      <div className="bg-white p-6 rounded-lg ring-1 ring-stone-700/20 mb-6">
        <h2 className='text-lg font-semibold mb-4'>Patient Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-500">Name</div>
            <div className='font-semibold text-sm'>{patient.name}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Aadhar</div>
            <div className='font-semibold text-sm'>{patient.aadhar}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Phone</div>
            <div className='font-semibold text-sm'>{patient.phone}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Email</div>
            <div className='font-semibold text-sm'>{patient.email}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Age</div>
            <div className='font-semibold text-sm'>{patient.age}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Gender</div>
            <div className='font-semibold text-sm'>{patient.gender}</div>
          </div>
          <div className="col-span-2">
            <div className="text-sm text-gray-500">DOB</div>
            <div className='font-semibold text-sm'>{formatDate(patient.dob)}</div>
          </div>
        </div>
      </div>

      {/* Add History Button */}
      <div className="bg-white p-6 rounded-lg ring-1 ring-stone-700/20 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className='text-lg font-semibold'>Medical History</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex flex-row rounded-md cursor-pointer items-center gap-2 bg-blue-600 p-2 py-1 text-sm font-semibold text-white shadow-md hover:bg-blue-500"
          >
            <PlusIcon className='size-4' />
            Add History
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <form onSubmit={handleFormSubmit} className="mb-6 p-4 border rounded-lg bg-gray-50">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Upload File</label>
              <div
                className="mt-1 border-2 border-dashed border-purple-300 rounded-lg py-6 bg-purple-50 hover:border-purple-400 transition-colors"
                onDragOver={(e) => e.preventDefault()}
                onDragLeave={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault()
                  const files = Array.from(e.dataTransfer.files)
                  setUploadedFiles(prev => [...prev, ...files])
                }}
              >
                <input
                  type="file"
                  id="upload-file"
                  className="hidden"
                  multiple
                  onChange={(e) => setUploadedFiles(prev => [...prev, ...(e.target.files ? Array.from(e.target.files) : [])])}
                />
                <label htmlFor="upload-file" className="block cursor-pointer text-center p-6">
                  <span className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md text-sm">
                    Choose File
                  </span>
                </label>
                <p className="mt-2 text-sm text-gray-500 text-center">or drag files here</p>

              </div>
            </div>
            <div className='flex flex-col mb-5'>
              {uploadedFiles.length > 0 && (
                <div className="mt-2 text-sm text-gray-600">
                  <p>Selected files:</p>
                  <ul>
                    {uploadedFiles.map((file, index) => (
                      <li key={index} className='p-4 bg-gray-100 border-b-[1px] border-gray-400 flex flex-row items-center'>
                        <DocumentIcon className='size-5 text-red-800 mr-5' />
                        <div className='grow'>
                          <div>{file.name}</div>
                          <div className='text-xs text-gray-500'>{file.type || 'Unknown type'}</div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setUploadedFiles(prev => prev.filter((_, i) => i !== index))}
                          className="rounded-md cursor-pointer bg-white p-2 text-sm font-semibold text-gray-500 border-[1px] border-gray-300 hover:bg-gray-100"
                        >
                          <TrashIcon className='size-4' />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                Upload Files
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
        <div className="space-y-4">
          {(() => {
            // Group history by date
            const grouped = patient.history.reduce((acc: any, item: any) => {
              const dateKey = item.date.split('T')[0] // Use date part only for grouping
              if (!acc[dateKey]) acc[dateKey] = []
              acc[dateKey].push(item)
              return acc
            }, {})

            return Object.entries(grouped).map(([date, items]) => (
              <div key={date} className="border-b border-gray-300 p-4">
                <div className="text-sm font-semibold mb-4 capitalize bg-indigo-100 p-2 px-4">{formatDate(date)}</div>
                {(items as any[]).map((item: any, index: number) => (
                  <div key={item.id} className={`flex flex-row gap-6 p4 mb-2 ${index % 2 === 0 ? 'border-b-[1px] border-gray-200' : 'bg-white'} p-2 rounded`}>
                    <div className='text-sm text-gray-400 flex flex-row'>
                      <ClockIcon className='size-5 mr-2' />
                      {new Date(item.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <div className="text-base">{item.doctor_name}</div>
                    <div className='pl-10'>
                      <div className='grow flex flex-row gap-4 items-center flex-1'>
                        <div className='flex flex-col'>
                          <div className='text-sm font-semibold'>Sickness</div>
                          <div className='text-sm text-gray-500'>{item.sickness}</div>
                        </div>
                        <ArrowRightIcon className='size-5' />
                        <div className='flex flex-col'>
                          <div className='text-sm font-semibold'>Treatment</div>
                          <div className='text-sm text-gray-500'>{item.treatment}</div>
                        </div>
                        {item.scaning && (
                          <>
                            <ArrowRightIcon className='size-5' />
                            <div className='flex flex-col'>
                              <div className='text-sm font-semibold'>Scaning</div>
                              <div className='text-sm text-gray-500'>{item.scaning}</div>
                            </div>
                          </>
                        )}
                        <ArrowRightIcon className='size-5 ' />
                        <div className='flex flex-col'>
                          <div className='text-sm font-semibold'>Medicine</div>
                          <div className='text-sm text-gray-500'>{item.medicine}</div>
                        </div>
                      </div>
                      {item.scaning && (
                        <>
                          <div className='flex flex-row gap-3 bg-blue-50 p-2 px-6 mt-4 rounded'>
                            <DocumentIcon className='size-5 text-red-400' />
                            <div className='text-sm underline cursor-pointer grow'>{item.scaning}.pdf</div>
                            <div className='text-sm text-gray-400'>{item.date}</div>
                          </div>
                          <div className='flex flex-row gap-3 bg-blue-50 p-2 px-6 mt-4 rounded'>
                            <DocumentIcon className='size-5 text-red-400' />
                            <div className='text-sm underline cursor-pointer grow'>{item.scaning}.pdf</div>
                            <div className='text-sm text-gray-400'>{item.date}</div>
                          </div>
                        </>
                      )}

                    </div>
                  </div>
                ))}
              </div>
            ))
          })()}
        </div>
      </div>
    </div>
  )
}
