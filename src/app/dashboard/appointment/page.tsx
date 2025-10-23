"use client"
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { AdjustmentsVerticalIcon, BeakerIcon, ChevronDownIcon, ExclamationTriangleIcon, InformationCircleIcon, MagnifyingGlassCircleIcon, PlusIcon, TicketIcon, XMarkIcon } from '@heroicons/react/20/solid'
import React, { useState, useEffect, useMemo } from 'react'

interface AppointmentType {
  id: string;
  token_no: string;
  patient_name: string;
  age: number;
  aadhar: string;
  date: string;
  time: string;
  doctor_id: string;
  status: string;
}

interface Doctor {
  id: string;
  name: string;
}

function AddAppointmentModal({ open, setOpen, onAddAppointment, appointments, doctors }: { open: boolean; setOpen: (open: boolean) => void; onAddAppointment: (appointment: Omit<AppointmentType, 'id'>) => void; appointments: AppointmentType[]; doctors: Doctor[] }) {
  const [formData, setFormData] = useState({
    patientName: '',
    doctor: '',
    appointmentDate: '',
    appointmentType: '',
    notes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedDoctor = doctors.find(doc => doc.id === formData.doctor);
    const doctorId = selectedDoctor ? selectedDoctor.id : doctors[0].id;

    // Calculate next available time
    const sameDayAppointments = appointments.filter(app =>
      app.date === formData.appointmentDate && app.doctor_id === doctorId
    );
    let nextTime = '09:00'; // Default start time
    if (sameDayAppointments.length > 0) {
      const times = sameDayAppointments.map(app => {
        const [hours, minutes] = app.time.split(':').map(Number);
        return hours * 60 + minutes;
      });
      const maxTime = Math.max(...times);
      const nextMinutes = maxTime + 30; // 30 minutes per appointment
      const nextHours = Math.floor(nextMinutes / 60);
      const nextMins = nextMinutes % 60;
      nextTime = `${nextHours.toString().padStart(2, '0')}:${nextMins.toString().padStart(2, '0')}`;
    }

    const newAppointment: Omit<AppointmentType, 'id'> = {
      token_no: `T${(appointments.length + 1).toString().padStart(3, '0')}`,
      patient_name: formData.patientName,
      age: Math.floor(Math.random() * 50) + 20, // Random age between 20-70
      aadhar: Math.random().toString().slice(2, 17), // Random 15 digit aadhar
      date: formData.appointmentDate,
      time: nextTime,
      doctor_id: doctorId,
      status: 'pending'
    };
    onAddAppointment(newAppointment);
    setFormData({
      patientName: '',
      doctor: '',
      appointmentDate: '',
      appointmentType: '',
      notes: ''
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-stone-200 text-left shadow-xl outline -outline-offset-1 outline-white/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div className=" px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="flex sm:items-start flex-row gap-4">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-400/20 sm:mx-0 sm:size-10">
                  <InformationCircleIcon aria-hidden="true" className="size-6 text-blue-500" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left grow">
                  <DialogTitle as="h3" className="text-base font-semibold text-gray-900 mb-8">
                    Add New Appointment
                  </DialogTitle>
                  <form onSubmit={handleSubmit} className="space-y-4 w-full">
                    <div>
                      <label htmlFor="patientName" className="block text-sm font-medium text-gray-700">
                        Patient Name
                      </label>
                      <input
                        type="text"
                        id="patientName"
                        name="patientName"
                        value={formData.patientName}
                        onChange={handleChange}
                        required
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        placeholder="Enter patient name"
                      />
                    </div>

                    <div>
                      <label htmlFor="doctor" className="block text-sm font-medium text-gray-700">
                        Doctor
                      </label>
                      <select
                        id="doctor"
                        name="doctor"
                        value={formData.doctor}
                        onChange={handleChange}
                        required
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      >
                        <option value="">Select a doctor</option>
                        {doctors.map(doctor => (
                          <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="appointmentDate" className="block text-sm font-medium text-gray-700">
                        Date
                      </label>
                      <input
                        type="date"
                        id="appointmentDate"
                        name="appointmentDate"
                        value={formData.appointmentDate}
                        onChange={handleChange}
                        required
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>



                    <div>
                      <label htmlFor="appointmentType" className="block text-sm font-medium text-gray-700">
                        Appointment Type
                      </label>
                      <select
                        id="appointmentType"
                        name="appointmentType"
                        value={formData.appointmentType}
                        onChange={handleChange}
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      >
                        <option value="">Select type</option>
                        <option value="consultation">Consultation</option>
                        <option value="follow-up">Follow-up</option>
                        <option value="emergency">Emergency</option>
                        <option value="check-up">Check-up</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                        Notes
                      </label>
                      <textarea
                        id="notes"
                        name="notes"
                        rows={3}
                        value={formData.notes}
                        onChange={handleChange}
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        placeholder="Additional notes..."
                      />
                    </div>
                    <div className="py-3 sm:flex sm:flex-row-reverse">
                      <button
                        type="submit"
                        className="inline-flex w-full justify-center rounded-md bg-green-700 px-3 py-2 text-sm font-semibold text-white hover:bg-green-600 sm:ml-3 sm:w-auto"
                      >
                        Add Appointment
                      </button>
                      <button
                        type="button"
                        data-autofocus
                        onClick={() => setOpen(false)}
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white/70 px-3 py-2 text-sm font-semibold text-gray-800 inset-ring inset-ring-white/5 hover:bg-white/20 sm:mt-0 sm:w-auto"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

function PatientLists({ appointments, doctors }: { appointments: AppointmentType[]; doctors: Doctor[] }) {
  const getDoctorName = (doctorId: string) => {
    const doctor = doctors.find(doc => doc.id === doctorId);
    return doctor ? doctor.name : 'Unknown Doctor';
  };

  return (
    <div className="overflow-auto h-[calc(100vh-210px)]">
      {appointments.map((appointment) => (
        <div key={appointment.id} className="bg-white p-4 rounded-lg border-[1.5px] border-gray-300 mb-2 hover:shadow-md transition-shadow">
          <div className='flex flex-row gap-4'>
            <div className="text-sm text-blue-600 bg-blue-50 p-1 px-3 border-[1px] border-blue-400 rounded-md flex flex-row gap-2 justify-center items-center w-fit">
              <div><TicketIcon className='size-4' /></div>
              <div>{appointment.token_no}</div>
            </div>
            <div className='grow flex flex-row justify-around items-center gap-2'>
              <div className="text-lg font-medium flex-1 text-nowrap">{appointment.patient_name}</div>
              {/* <div className="text-sm text-gray-500">{appointment.age} years</div> */}
              <div className="text-sm text-gray-500 flex-2">{getDoctorName(appointment.doctor_id)}</div>
            </div>
            <div>
              <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${appointment.status === 'pending' ? 'bg-yellow-400/10 text-yellow-400 inset-ring inset-ring-yellow-400/20' :
                appointment.status === 'completed' ? 'bg-green-400/10 text-green-400 inset-ring inset-ring-green-400/20' :
                  appointment.status === 'cancelled' ? 'bg-red-400/10 text-red-400 inset-ring inset-ring-red-400/20' :
                    'bg-gray-100 text-gray-800'
                }` }>{appointment.status}</span>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">{appointment.date} {appointment.time}</p>

            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
function DateFilter({ selectedDateFilter, setSelectedDateFilter }: { selectedDateFilter: string; setSelectedDateFilter: (filter: string) => void }) {
  const getDisplayText = () => {
    switch (selectedDateFilter) {
      case 'today': return 'Today';
      case 'tomorrow': return 'Tomorrow';
      default: return 'All Dates';
    }
  };

  return (
    <Menu as="div" className="relative inline-block">
      <MenuButton className="inline-flex w-full justify-center gap-x-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-800 cursor-pointer inset-ring-1 inset-ring-gray-300 hover:bg-white/70 focus-visible:hidden">
        <AdjustmentsVerticalIcon className='size-5'/>{getDisplayText()}
        <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
      </MenuButton>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white outline-1 -outline-offset-1 outline-gray-300 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <button
              onClick={() => setSelectedDateFilter('all')}
              className="block w-full text-left px-4 py-2 text-sm text-gray-800 data-focus:bg-gray-100 data-focus:font-semibold data-focus:outline-hidden"
            >
              All Dates
            </button>
          </MenuItem>
          <MenuItem>
            <button
              onClick={() => setSelectedDateFilter('today')}
              className="block w-full text-left px-4 py-2 text-sm text-gray-800 data-focus:bg-gray-100 data-focus:font-semibold data-focus:outline-hidden"
            >
              Today
            </button>
          </MenuItem>
          <MenuItem>
            <button
              onClick={() => setSelectedDateFilter('tomorrow')}
              className="block w-full text-left px-4 py-2 text-sm text-gray-800 data-focus:bg-gray-100 data-focus:font-semibold data-focus:outline-hidden"
            >
              Tomorrow
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  )
}

function Appointment() {
  const [open, setOpen] = useState(false)
  const [appointments, setAppointments] = useState<AppointmentType[]>([])
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDateFilter, setSelectedDateFilter] = useState('all')

  useEffect(() => {
    fetch('/json/appointment.json')
      .then(response => response.json())
      .then(data => setAppointments(data))
      .catch(error => console.error('Error fetching appointments:', error))
  }, [])

  useEffect(() => {
    fetch('/json/profile.json')
      .then(response => response.json())
      .then(data => {
        const doctorList = data.map((doc: any) => ({
          id: doc.id,
          name: doc.name
        }));
        setDoctors(doctorList);
      })
      .catch(error => console.error('Error fetching doctors:', error))
  }, [])

  const handleAddAppointment = (newAppointment: Omit<AppointmentType, 'id'>) => {
    const id = (appointments.length + 1).toString();
    setAppointments([...appointments, { ...newAppointment, id }]);
  };

  const filteredAppointments = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

    let filtered = appointments.filter(appointment => {
      const matchesSearch = appointment.patient_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        appointment.token_no.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDate = selectedDateFilter === 'all' ||
        (selectedDateFilter === 'today' && appointment.date === today) ||
        (selectedDateFilter === 'tomorrow' && appointment.date === tomorrow);
      return matchesSearch && matchesDate;
    });
    filtered.sort((a, b) => {
      if (a.token_no !== b.token_no) {
        return a.token_no.localeCompare(b.token_no);
      }
      return a.patient_name.localeCompare(b.patient_name);
    });
    return filtered;
  }, [appointments, searchQuery, selectedDateFilter]);

  return (
    <div className='p-4'>
      <div className='flex flex-row items-center gap-4 mb-8'>
        <div className="grow pr-20">
          <span className='relative'>
            <div className='absolute left-3 top-3.5 pointer-events-none'>
              <MagnifyingGlassCircleIcon className='size-5 text-gray-400' />
            </div>
            <input
              id="email"
              name="Search"
              type="text"
              placeholder="Search"
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
        <DateFilter selectedDateFilter={selectedDateFilter} setSelectedDateFilter={setSelectedDateFilter} />
        <button
          onClick={() => setOpen(true)}
          className="flex flex-row rounded-md cursor-pointer items-center gap-2 bg-black p-3 py-2 text-sm font-semibold text-white shadow-md hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
        >
          <PlusIcon className='size-5' /> Add Appointment
        </button>
      </div>

      <PatientLists appointments={filteredAppointments} doctors={doctors} />

      <AddAppointmentModal open={open} setOpen={setOpen} onAddAppointment={handleAddAppointment} appointments={appointments} doctors={doctors} />
    </div>
  )
}

export default Appointment
