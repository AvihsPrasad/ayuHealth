"use client"
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { MagnifyingGlassIcon, PlusIcon, TrashIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/navigation'
import { useFetch } from '@/lib/fetch'

interface AppointmentType {
  id: string;
  token_no: string;
  firstName: string;
  lastName: string;
  age: number;
  aadhar: string;
  schedule: string;
  doctor_id: string;
  hospital_id: string;
  status: string;
}

function Token() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB'); // dd/mm/yyyy
  };

  const userId = useSelector((state: RootState) => state.user.userId)
  const userName = useSelector((state: RootState) => state.user.userName)
  const hospitalId = useSelector((state: RootState) => state.user.hospitalId)
  console.log('hospitalId in token page:', hospitalId)
  console.log('userId in token page:', userId)
  const router = useRouter()
  const [appointments, setAppointments] = useState<AppointmentType[]>([])
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentType | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    sickness: '',
    treat: [] as { id: string; treatment_name: string; medicine: string; frequency: string; duration: string }[],
    scaning: null as File | null,
  })
  const [tempTreatment, setTempTreatment] = useState('')
  const [tempMedicine, setTempMedicine] = useState('')
  const [tempFrequency, setTempFrequency] = useState('')
  const [tempDuration, setTempDuration] = useState('')
  const reduuxUserDetails = useSelector((state: RootState) => state.user)

  const { data: appontmentdbData, loading, error } = useFetch<any[]>(`/api/getappointments?doctor_id=${reduuxUserDetails.userdbId}&hospital_id=1`);

  useEffect(() => {
    if (appontmentdbData && appontmentdbData.length > 0) {
      setAppointments(appontmentdbData);
      console.log('appontmentdbData', appontmentdbData);
      if (appontmentdbData.length > 0) {
        setSelectedAppointment(appontmentdbData[0])
      }
    }
  }, [appontmentdbData])

  const handleAppointmentClick = (appointment: AppointmentType) => {
    setSelectedAppointment(appointment)
  }

  const handleCheckUpDone = () => {
    if (selectedAppointment && selectedAppointment.status === 'pending') {
      setAppointments(prevAppointments =>
        prevAppointments.map(appointment =>
          appointment.id === selectedAppointment.id
            ? { ...appointment, status: 'completed' }
            : appointment
        )
      )
      setSelectedAppointment(prev => prev ? { ...prev, status: 'completed' } : null)
    }
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would be an API call to add to patient history
    // console.log('Adding to patient history:', formData)
    setFormData({ sickness: '', treat: [], scaning: null })
    setTempTreatment('')
    setTempMedicine('')
    setTempFrequency('')
    setTempDuration('')
    setShowForm(false)
  }

  return (
    <div className='p-4'>
      {loading && <div className='animate-pulse'>Loading appointments...</div>}
      {!loading && <div className='flex flex-row gap-4'>
        {/* Left side - Appointments list */}
        <div className=''>
          {/* <h2 className='text-base font-semibold mb-4'>Appointments</h2> */}
          <div className='space-y-2 max-h-[calc(100vh-130px)] overflow-y-auto'>
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                onClick={() => handleAppointmentClick(appointment)}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedAppointment?.id === appointment.id
                  ? 'bg-blue-50 border-blue-300'
                  : 'bg-white border-gray-300 hover:bg-gray-50'
                  }`}
              >
                <div className='flex flex-row justify-between items-center'>
                  <div>
                    <div className='font-medium pr-6'>{appointment.firstName} {appointment.lastName}</div>
                    <div className='text-sm text-gray-500'>Token: {appointment.token_no}</div>
                  </div>
                  <div className='text-right'>
                    <div className='text-sm'>{formatDate(appointment.schedule)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side - Appointment details */}
        <div className='grow max-h-[calc(100vh-130px)] overflow-y-auto'>
          {selectedAppointment ? (
            <div className='bg-white p-6 rounded-lg border border-gray-300'>
              <div className='flex flex-row mb-8'>
                <h2 className='text-xl font-semibold mb-4 grow'>Appointment Details</h2>
                <div>
                  {selectedAppointment.status === 'pending' && (
                    <button
                      onClick={handleCheckUpDone}
                      className="flex flex-row rounded-md cursor-pointer items-center gap-2 bg-green-800 p-3 py-2 text-sm font-semibold text-white shadow-md hover:bg-green-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                    >
                      CheckUp Done
                    </button>
                  )}
                </div>
              </div>
              <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2'>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>Token Number</label>
                  <div className='text-base'>{selectedAppointment.token_no}</div>
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>Patient Name</label>
                  <div className='text-base'>{selectedAppointment.firstName} {selectedAppointment.lastName}</div>
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>Age</label>
                  <div className='text-base'>{selectedAppointment.age}</div>
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>Aadhar</label>
                  <div className='text-base flex flex-row gap-2 items-center'>
                    <p>{selectedAppointment.aadhar}</p>
                    <button
                      onClick={() => router.push(`/dashboard/patients?search=${selectedAppointment.aadhar}&sort=aadhar`)}
                      className="rounded-md cursor-pointer bg-white p-2 px-2 text-gray-600 border-[1px] border-gray-400 hover:bg-gray-100"
                    >
                      <MagnifyingGlassIcon className='size-4' />
                    </button>
                  </div>
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>Schedule</label>
                  <div className='text-base'>{formatDate(selectedAppointment.schedule)}</div>
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>Doctor</label>
                  <div className='text-base'>{userName}</div>
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>Status</label>
                  <span className={`inline-flex items-center rounded-md px-2 py-1 text-sm font-medium ${selectedAppointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    selectedAppointment.status === 'completed' ? 'bg-green-100 text-green-800' :
                      selectedAppointment.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                    }`}>
                    {selectedAppointment.status}
                  </span>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700'>On going Treatment</label>
                  <div className='text-base'>Flu tab - cold</div>
                </div>
              </div>
            </div>
          ) : (
            <div className='bg-white p-6 rounded-lg border border-gray-300 flex items-center justify-center'>
              <p className='text-gray-500'>Select an appointment to view details</p>
            </div>
          )}
          {/* Form to add patient history */}
          {selectedAppointment && (
            <div className='grid grid-cols-2  gap-2'>
              <div>
                <div className="mt-6 bg-white p-6 rounded-lg border border-gray-300">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Add to Patient History</h3>
                  </div>
                  <form onSubmit={handleFormSubmit} className="">
                    <div className="flex flex-col mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Sickness</label>
                        <input
                          type="text"
                          value={formData.sickness}
                          onChange={(e) => setFormData({ ...formData, sickness: e.target.value })}
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mt-2">Treatment</label>
                        <input
                          type="text"
                          value={tempTreatment}
                          onChange={(e) => setTempTreatment(e.target.value)}
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                      <div className="grow">
                        <label className="block text-sm font-medium text-gray-700 mt-2">Medicine</label>
                        <input
                          type="text"
                          value={tempMedicine}
                          onChange={(e) => setTempMedicine(e.target.value)}
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                      <div className="grow">
                        <label className="block text-sm font-medium text-gray-700 mt-2">Frequency</label>
                        <input
                          type="text"
                          value={tempFrequency}
                          onChange={(e) => setTempFrequency(e.target.value)}
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                      <div className="grow">
                        <label className="block text-sm font-medium text-gray-700 mt-2">Duration</label>
                        <input
                          type="text"
                          value={tempDuration}
                          onChange={(e) => setTempDuration(e.target.value)}
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                      <div className="mt-2">
                        <button
                          type="button"
                          onClick={() => {
                            if (tempTreatment && tempMedicine) {
                              const newTreat = [...formData.treat];
                              if (newTreat.length === 0) {
                                newTreat.push({ id: 'T1', treatment_name: tempTreatment, medicine: tempMedicine, frequency: tempFrequency, duration: tempDuration });
                              } else {
                                const lastId = newTreat[newTreat.length - 1].id;
                                const newIdNum = parseInt(lastId.substring(1)) + 1;
                                newTreat.push({ id: `T${newIdNum}`, treatment_name: tempTreatment, medicine: tempMedicine, frequency: tempFrequency, duration: tempDuration });
                              }
                              setFormData({ ...formData, treat: newTreat });
                              setTempTreatment('');
                              setTempMedicine('');
                              setTempFrequency('');
                              setTempDuration('');
                            }
                          }}
                          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                        >
                          Add Medicine
                        </button>
                      </div>
                      <div className='flex-1 mt-4'>
                        <label className="block text-sm font-medium text-gray-700">Scaning (optional)</label>
                        <div
                          className="mt-1 border-2 border-dashed border-purple-300 rounded-lg py-6 bg-purple-50 hover:border-purple-400 transition-colors"
                          onDragOver={(e) => e.preventDefault()}
                          onDragLeave={(e) => e.preventDefault()}
                          onDrop={(e) => {
                            e.preventDefault()
                            const file = e.dataTransfer.files[0]
                            if (file) {
                              setFormData({ ...formData, scaning: file })
                            }
                          }}
                        >
                          <input
                            type="file"
                            id="scanning-file"
                            className="hidden"
                            onChange={(e) => setFormData({ ...formData, scaning: e.target.files ? e.target.files[0] : null })}
                          />
                          <label htmlFor="scanning-file" className="block cursor-pointer text-center p-6">
                            <span className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md text-sm">
                              Choose File
                            </span>
                          </label>
                          <p className="mt-2 text-sm text-gray-500 text-center">or drag file here</p>
                          {formData.scaning && (
                            <p className="mt-2 text-sm text-gray-600 text-center">Selected: {formData.scaning.name}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div>
                <div className="mt-6 bg-white p-6 rounded-lg border border-gray-300">
                  <h3 className="text-lg font-semibold mb-4">Preview</h3>
                  <div className="space-y-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Sickness description</label>
                      <div className="text-base">{formData.sickness || 'Not entered'}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Treatments</label>
                      {formData.treat.length > 0 ? (
                        formData.treat.map((treatment, index) => (
                          <div key={index} className="mb-2 flex flex-row justify-between items-center border p-2 rounded-md bg-gray-50">
                            <div className="text-base font-medium">{treatment.treatment_name || 'No treatment name'}</div>
                            <div className="text-sm"> {treatment.medicine || 'No medicine name'}</div>
                            <div className="text-sm text-gray-500">Freq: {treatment.frequency || 'N/A'}</div>
                            <div className="text-sm text-gray-500">Dur: {treatment.duration || 'N/A'}</div>
                            <button
                              type="button"
                              onClick={() => {
                                const newTreat = [...formData.treat];
                                newTreat.splice(index, 1);
                                setFormData({ ...formData, treat: newTreat });
                              }}
                              className="bg-red-600 text-white p-1 rounded-md hover:bg-red-700"
                            >
                              <TrashIcon className='size-4' />
                            </button>
                          </div>
                        ))
                      ) : (
                        <div className="text-base">No treatments added</div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Scaning</label>
                      <div className="text-base">{formData.scaning ? formData.scaning.name : 'No file selected'}</div>
                    </div>
                  </div>
                  <div className="mt-4 text-right border-t pt-4 border-gray-400">
                    <button
                      type="submit"
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>}
    </div>
  )
}

export default Token
