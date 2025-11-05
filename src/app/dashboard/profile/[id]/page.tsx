"use client"
import React, { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { CameraIcon, InboxIcon, PencilSquareIcon, PhotoIcon, XCircleIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
import AboutUs from '../../about/page'
import Subscription from '@/components/subscription'
import { HeartIcon } from '@heroicons/react/20/solid'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../../redux/store'
import { setHospitalId } from '../../../../redux/userSlice'
import { useUser } from '@clerk/nextjs'
import NotificationBar from '@/components/notificationBar'

export default function Profile() {
  const { user: clerkUser } = useUser();

  const params = useParams()
  const searchParams = useSearchParams()
  const dispatch = useDispatch()
  const reduuxUserDetails = useSelector((state: RootState) => state.user)
  const currentHospitalId = useSelector((state: RootState) => state.user.hospitalId)
  const [profiles, setProfiles] = useState<any[]>([])
  const [user, setUser] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('Account')

  // Edit states for each block
  const [editPersonal, setEditPersonal] = useState(false)
  const [editAddress, setEditAddress] = useState(false)
  const [editMedical, setEditMedical] = useState(false)
  const [editEducation, setEditEducation] = useState(false)
  const [editSocial, setEditSocial] = useState(false)
  const [editUser, setEditUser] = useState(false)

  // Draft states for each block
  const [personalDraft, setPersonalDraft] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    descp: ''
  })
  const [addressDraft, setAddressDraft] = useState({
    country: '',
    state: '',
    city: '',
    pin: '',
    address: ''
  })
  const [medicalDraft, setMedicalDraft] = useState({
    licence: '',
    hospital_name: '',
    profession_type: '',
    specialization: ''
  })
  const [educationDraft, setEducationDraft] = useState<string[]>([])
  const [socialDraft, setSocialDraft] = useState({
    website: '',
    linkedin: '',
    facebook: '',
    instagram: ''
  })
  const [userDraft, setUserDraft] = useState({
    name: '',
    profession_type: '',
    experience: ''
  })
  const [notifications, setNotifications] = useState<Array<{ id: string; message: string; type: 'success' | 'error' | 'info' | 'warning' }>>([])
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    const tab = searchParams.get('tab')
    if (tab) setActiveTab(tab)
  }, [searchParams])

  console.log(reduuxUserDetails)

  // No need for this useEffect since we're using Redux

  useEffect(() => {
    if (reduuxUserDetails.userId) {
      const userData = {
        id: reduuxUserDetails.userId,
        name: reduuxUserDetails.firstName + ' ' + reduuxUserDetails.lastName,
        first_name: reduuxUserDetails.firstName,
        last_name: reduuxUserDetails.lastName,
        email: reduuxUserDetails.email,
        phone: reduuxUserDetails.phone,
        descp: reduuxUserDetails.bio,
        country: reduuxUserDetails.country,
        state: reduuxUserDetails.state,
        city: reduuxUserDetails.city,
        pin: reduuxUserDetails.zip,
        address: reduuxUserDetails.address,
        licence: reduuxUserDetails.license,
        hospital_name: '', // Not in Redux, set empty
        profession_type: reduuxUserDetails.role,
        specialization: '', // Not in Redux, set empty
        education: reduuxUserDetails.education ? [reduuxUserDetails.education] : [],
        awards: reduuxUserDetails.awards ? [reduuxUserDetails.awards] : [],
        'social-links': {
          website: reduuxUserDetails.website,
          linkedin: reduuxUserDetails.linkedIn,
          facebook: reduuxUserDetails.facebook,
          instagram: reduuxUserDetails.instagram
        },
        experience: reduuxUserDetails.exp,
        hospitals: [], // Not in Redux, set empty
        imageUrl: clerkUser?.imageUrl
      }
      setUser(userData)
      setPersonalDraft({
        first_name: userData.first_name || '',
        last_name: userData.last_name || '',
        email: userData.email || '',
        phone: userData.phone || '',
        descp: userData.descp || ''
      })
      setAddressDraft({
        country: userData.country || '',
        state: userData.state || '',
        city: userData.city || '',
        pin: userData.pin || '',
        address: userData.address || ''
      })
      setMedicalDraft({
        licence: userData.licence || '',
        hospital_name: userData.hospital_name || '',
        profession_type: userData.profession_type || '',
        specialization: userData.specialization || ''
      })
      setEducationDraft(userData.education || [])
      setSocialDraft({
        website: userData['social-links']?.website || '',
        linkedin: userData['social-links']?.linkedin || '',
        facebook: userData['social-links']?.facebook || '',
        instagram: userData['social-links']?.instagram || ''
      })
      setUserDraft({
        name: userData.name || '',
        profession_type: userData.profession_type || '',
        experience: userData.experience || ''
      })
    }
  }, [reduuxUserDetails, clerkUser])

  if (!user) {
    return <div>User not found</div>
  }

  // if (userId !== params.id) {
  //   return <div>Access denied {userId} {params.id}</div>
  // }

  // Personal block handlers
  const handlePersonalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonalDraft({ ...personalDraft, [e.target.name]: e.target.value })
  }
  const handlePersonalSave = () => {
    setUser({ ...user, ...personalDraft })
    setEditPersonal(false)
  }
  const handlePersonalCancel = () => {
    setPersonalDraft({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone,
      descp: user.descp
    })
    setEditPersonal(false)
  }

  // Address block handlers
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressDraft({ ...addressDraft, [e.target.name]: e.target.value })
  }
  const handleAddressSave = () => {
    setUser({ ...user, ...addressDraft })
    setEditAddress(false)
  }
  const handleAddressCancel = () => {
    setAddressDraft({
      country: user.country,
      state: user.state,
      city: user.city,
      pin: user.pin,
      address: user.address
    })
    setEditAddress(false)
  }

  // Medical block handlers
  const handleMedicalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMedicalDraft({ ...medicalDraft, [e.target.name]: e.target.value })
  }
  const handleMedicalSave = () => {
    setUser({ ...user, ...medicalDraft })
    setEditMedical(false)
  }
  const handleMedicalCancel = () => {
    setMedicalDraft({
      licence: user.licence,
      hospital_name: user.hospital_name,
      profession_type: user.profession_type,
      specialization: user.specialization
    })
    setEditMedical(false)
  }

  // Education block handlers
  const handleEducationChange = (idx: number, value: string) => {
    const updated = [...educationDraft]
    updated[idx] = value
    setEducationDraft(updated)
  }
  const handleEducationSave = () => {
    setUser({ ...user, education: educationDraft })
    setEditEducation(false)
  }
  const handleEducationCancel = () => {
    setEducationDraft(user.education)
    setEditEducation(false)
  }

  // Social block handlers
  const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSocialDraft({ ...socialDraft, [e.target.name]: e.target.value })
  }
  const handleSocialSave = () => {
    setUser({
      ...user,
      ['social-links']: { ...socialDraft }
    })
    setEditSocial(false)
  }
  const handleSocialCancel = () => {
    setSocialDraft({
      website: user['social-links']?.website || '',
      linkedin: user['social-links']?.linkedin || '',
      facebook: user['social-links']?.facebook || '',
      instagram: user['social-links']?.instagram || ''
    })
    setEditSocial(false)
  }

  // User block handlers
  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserDraft({ ...userDraft, [e.target.name]: e.target.value })
  }
  const handleUserSave = () => {
    setUser({ ...user, ...userDraft })
    setEditUser(false)
  }
  const handleUserCancel = () => {
    setUserDraft({
      name: user.name,
      profession_type: user.profession_type,
      experience: user.experience
    })
    setEditUser(false)
  }

  // Handler for selecting file
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      // Update local preview
      const reader = new FileReader()
      reader.onload = function (ev) {
        const img = document.getElementById('profileImg') as HTMLImageElement
        if (img && ev.target?.result) {
          img.src = ev.target.result as string
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // Handler for uploading and replacing profile image
  const handleProfileImgUpload = async () => {
    if (selectedFile && clerkUser) {
      setUploading(true)
      try {
        // Upload to Clerk
        await clerkUser.setProfileImage({ file: selectedFile });
        const id = Date.now().toString()
        setNotifications(prev => [...prev, { id, message: 'Profile image updated successfully!', type: 'success' }])
        setSelectedFile(null)
      } catch (error) {
        console.error('Failed to update profile image:', error);
        const id = Date.now().toString()
        setNotifications(prev => [...prev, { id, message: 'Failed to update profile image. Please try again.', type: 'error' }])
      } finally {
        setUploading(false)
      }
    }
  }

  // Handler for selecting a hospital
  const handleHospitalSelect = (hospitalId: string) => {
    localStorage.setItem('hospital', hospitalId)
    // dispatch(setHospitalId(hospitalId))
  }

  return (
    <div className=' p-6 pb-2 rounded-xl'>
      {notifications.slice().reverse().map((notif, idx) => (
        <NotificationBar
          key={notif.id}
          message={notif.message}
          type={notif.type}
          onClose={() => setNotifications(prev => prev.filter(n => n.id !== notif.id))}
          duration={5000}
          index={idx}
        />
      ))}
      {/* tab block */}
      {/* <div className='flex flex-row justify-center items-center mb-8'>
        <div className='grow'>
          <h1 className="text-xl font-semibold">User Profile</h1>
        </div>
      </div> */}
      <div className="mb-8 ">
        <div className="border-b border-gray-400">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {['Account', 'Hospital', 'Subscription', 'Notifications', 'Feedbacks', 'About'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap py-2 px-4 border-b-2 font-medium text-sm ${activeTab === tab
                    ? 'border-indigo-500 text-indigo-600 bg-indigo-200 font-semibold'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-500'
                  }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </div>
      {activeTab === 'Account' && (
        <div className='overflow-y-auto max-h-[calc(100vh-200px)]'>
          {/* user block */}
          <div className="bg-white p-6 rounded-lg ring-1 ring-stone-700/20 flex flex-row mb-5">
            <div className='grow flex flex-row gap-6'>
              <div>
                {/* <PhotoIcon className='size-6 text-gray-500' /> */}
                <div className='relative w-24 h-24 bg-stone-300 items-center justify-center rounded-full flex'>
                  <img alt="" id='profileImg' src={user.imageUrl || clerkUser?.imageUrl}
                    className="size-fit rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10" />
                  <button
                    className="absolute bottom-0 right-0 rounded-full cursor-pointer items-center bg-white p-1.5 ring-1 ring-stone-300 "
                    onClick={() => document.getElementById('profileImgInput')?.click()}
                  >
                    <CameraIcon className='size-4' />
                  </button>
                  <input
                    id="profileImgInput"
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleFileSelect}
                  />
                </div>
                {selectedFile && (
                  <button
                    onClick={handleProfileImgUpload}
                    disabled={uploading}
                    className="mt-2 w-full rounded-lg cursor-pointer items-center bg-violet-600 px-3 py-1.5 hover:bg-violet-500 text-white flex justify-center gap-2 disabled:opacity-50"
                  >
                    {uploading && <ArrowPathIcon className="size-4 animate-spin" />}
                    Upload
                  </button>
                )}
              </div>
              <div className='grow'>
                {editUser ? (
                  <>
                    <input name="name" value={userDraft.name} onChange={handleUserChange} className="block mb-2 border rounded px-2 py-1 w-full font-medium" />
                    <input name="profession_type" value={userDraft.profession_type} onChange={handleUserChange} className="block mb-2 border rounded px-2 py-1 w-full text-sm text-gray-500" />
                    <input name="experience" value={userDraft.experience} onChange={handleUserChange} className="block mb-2 border rounded px-2 py-1 w-full text-sm text-gray-500" />
                  </>
                ) : (
                  <>
                    <h1 className='text-base font-medium mb-1'>{user.name}</h1>
                    <p className='text-gray-500 text-sm mb-1'>{user.profession_type}</p>
                    <p className='text-gray-500 text-sm'>{user.experience}</p>
                  </>
                )}
              </div>
              <div>
                {!editUser ? (
                  <button
                    className="flex flex-row rounded-md cursor-pointer items-center gap-2 bg-white px-3.5 ring-1 ring-stone-300 py-2.5 text-sm font-semibold text-gray-500 hover:text-black shadow-xs hover:bg-gray-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                    onClick={() => setEditUser(true)}
                  >
                    <PencilSquareIcon className='size-5' />Edit
                  </button>
                ) : (
                  <div className="flex flex-col gap-2 pl-2 mt-4">
                    <button
                      className="flex flex-row rounded-md cursor-pointer items-center gap-2 bg-white px-5 ring-1 ring-emerald-300 py-2.5 text-sm font-semibold text-emerald-500 shadow-xs hover:bg-emerald-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                      onClick={handleUserSave}
                    >
                      <InboxIcon className='size-5' />Save
                    </button>
                    <button
                      className="flex flex-row rounded-md cursor-pointer items-center gap-2 bg-white px-3.5 ring-1 ring-red-300 py-2.5 text-sm font-semibold text-red-500 shadow-xs hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                      onClick={handleUserCancel}
                    >
                      <XCircleIcon className='size-5' />Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* personal info block */}
          <div className="bg-white p-6 rounded-lg ring-1 ring-stone-700/20 flex flex-row">
            <div className='grow'>
              <h2 className='text-lg font-semibold block w-full mb-5'>Personal information</h2>
              <div className="grid grid-cols-2 gap-4">
                {editPersonal ? (
                  <>
                    <div>
                      <div className="text-sm text-gray-500">First Name:</div>
                      <input name="first_name" value={personalDraft.first_name} onChange={handlePersonalChange} className="font-semibold text-sm border rounded px-2 py-1 w-full" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Last Name</div>
                      <input name="last_name" value={personalDraft.last_name} onChange={handlePersonalChange} className="font-semibold text-sm border rounded px-2 py-1 w-full" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Email</div>
                      <input name="email" value={personalDraft.email} onChange={handlePersonalChange} className="font-semibold text-sm border rounded px-2 py-1 w-full" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">phone</div>
                      <input name="phone" value={personalDraft.phone} onChange={handlePersonalChange} className="font-semibold text-sm border rounded px-2 py-1 w-full" />
                    </div>
                    <div className="col-span-2">
                      <div className="text-sm text-gray-500">Bio</div>
                      <input name="descp" value={personalDraft.descp} onChange={handlePersonalChange} className="font-semibold text-sm border rounded px-2 py-1 w-full" />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <div className="text-sm text-gray-500">First Name:</div>
                      <div className='font-semibold text-sm'>{user.first_name}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Last Name</div>
                      <div className='font-semibold text-sm'>{user.last_name}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Email</div>
                      <div className='font-semibold text-sm'>{user.email}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">phone</div>
                      <div className='font-semibold text-sm'>{user.phone}</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-sm text-gray-500">Bio</div>
                      <div className='font-semibold text-sm'>{user.descp}</div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div>
              {!editPersonal ? (
                <button
                  className="flex flex-row rounded-md cursor-pointer items-center gap-2 bg-white px-3.5 ring-1 ring-stone-300 py-2.5 text-sm font-semibold text-gray-500 hover:text-black shadow-xs hover:bg-gray-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                  onClick={() => setEditPersonal(true)}
                >
                  <PencilSquareIcon className='size-5' />Edit
                </button>
              ) : (
                <div className="flex flex-col gap-2 pl-2">
                  <button
                    className="flex flex-row rounded-md cursor-pointer items-center gap-2 bg-white px-5 ring-1 ring-emerald-300 py-2.5 text-sm font-semibold text-emerald-500 shadow-xs hover:bg-emerald-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                    onClick={handlePersonalSave}
                  >
                    <InboxIcon className='size-5' />Save
                  </button>
                  <button
                    className="flex flex-row rounded-md cursor-pointer items-center gap-2 bg-white px-3.5 ring-1 ring-red-300 py-2.5 text-sm font-semibold text-red-500 shadow-xs hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    onClick={handlePersonalCancel}
                  >
                    <XCircleIcon className='size-5' />Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
          {/* address info block */}
          <div className="bg-white p-6 rounded-lg ring-1 ring-stone-700/20 flex flex-row mt-5">
            <div className='grow'>
              <h2 className='text-lg font-semibold block w-full mb-5'>Address</h2>
              <div className="grid grid-cols-2 gap-4">
                {editAddress ? (
                  <>
                    <div>
                      <div className="text-sm text-gray-500">Country</div>
                      <input name="country" value={addressDraft.country} onChange={handleAddressChange} className="font-semibold text-sm border rounded px-2 py-1 w-full" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">State</div>
                      <input name="state" value={addressDraft.state} onChange={handleAddressChange} className="font-semibold text-sm border rounded px-2 py-1 w-full" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">City</div>
                      <input name="city" value={addressDraft.city} onChange={handleAddressChange} className="font-semibold text-sm border rounded px-2 py-1 w-full" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">PinCode</div>
                      <input name="pin" value={addressDraft.pin} onChange={handleAddressChange} className="font-semibold text-sm border rounded px-2 py-1 w-full" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Address</div>
                      <input name="address" value={addressDraft.address} onChange={handleAddressChange} className="font-semibold text-sm border rounded px-2 py-1 w-full" />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <div className="text-sm text-gray-500">Country</div>
                      <div className='font-semibold text-sm'>{user.country}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">State</div>
                      <div className='font-semibold text-sm'>{user.state}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">City</div>
                      <div className='font-semibold text-sm'>{user.city}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">PinCode</div>
                      <div className='font-semibold text-sm'>{user.pin}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Address</div>
                      <div className='font-semibold text-sm'>{user.address}</div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div>
              {!editAddress ? (
                <button
                  className="flex flex-row rounded-md cursor-pointer items-center gap-2 bg-white px-3.5 ring-1 ring-stone-300 py-2.5 text-sm font-semibold text-gray-500 hover:text-black shadow-xs hover:bg-gray-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                  onClick={() => setEditAddress(true)}
                >
                  <PencilSquareIcon className='size-5' />Edit
                </button>
              ) : (
                <div className="flex flex-col gap-2 pl-2">
                  <button
                    className="flex flex-row rounded-md cursor-pointer items-center gap-2 bg-white px-5 ring-1 ring-emerald-300 py-2.5 text-sm font-semibold text-emerald-500 shadow-xs hover:bg-emerald-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                    onClick={handleAddressSave}
                  >
                    <InboxIcon className='size-5' />Save
                  </button>
                  <button
                    className="flex flex-row rounded-md cursor-pointer items-center gap-2 bg-white px-3.5 ring-1 ring-red-300 py-2.5 text-sm font-semibold text-red-500 shadow-xs hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    onClick={handleAddressCancel}
                  >
                    <XCircleIcon className='size-5' />Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
          {/* Medical info block */}
          <div className="bg-white p-6 rounded-lg ring-1 ring-stone-700/20 flex flex-row mt-5">
            <div className='grow'>
              <h2 className='text-lg font-semibold block w-full mb-5'>Medical</h2>
              <div className="grid grid-cols-2 gap-4">
                {editMedical ? (
                  <>
                    <div>
                      <div className="text-sm text-gray-500">Licence</div>
                      <input name="licence" value={medicalDraft.licence} onChange={handleMedicalChange} className="font-semibold text-sm border rounded px-2 py-1 w-full" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Hospital Name</div>
                      <input name="hospital_name" value={medicalDraft.hospital_name} onChange={handleMedicalChange} className="font-semibold text-sm border rounded px-2 py-1 w-full" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Profession</div>
                      <input name="profession_type" value={medicalDraft.profession_type} onChange={handleMedicalChange} className="font-semibold text-sm border rounded px-2 py-1 w-full" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Specialization</div>
                      <input name="specialization" value={medicalDraft.specialization} onChange={handleMedicalChange} className="font-semibold text-sm border rounded px-2 py-1 w-full" />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <div className="text-sm text-gray-500">Licence</div>
                      <div className='font-semibold text-sm'>{user.licence}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Hospital Name</div>
                      <div className='font-semibold text-sm'>{user.hospital_name}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Profession</div>
                      <div className='font-semibold text-sm'>{user.profession_type}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Specialization</div>
                      <div className='font-semibold text-sm'>{user.specialization}</div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div>
              {!editMedical ? (
                <button
                  className="flex flex-row rounded-md cursor-pointer items-center gap-2 bg-white px-3.5 ring-1 ring-stone-300 py-2.5 text-sm font-semibold text-gray-500 hover:text-black shadow-xs hover:bg-gray-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                  onClick={() => setEditMedical(true)}
                >
                  <PencilSquareIcon className='size-5' />Edit
                </button>
              ) : (
                <div className="flex flex-col gap-2 pl-2 mt-4">
                  <button
                    className="flex flex-row rounded-md cursor-pointer items-center gap-2 bg-white px-5 ring-1 ring-emerald-300 py-2.5 text-sm font-semibold text-emerald-500 shadow-xs hover:bg-emerald-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                    onClick={handleMedicalSave}
                  >
                    <InboxIcon className='size-5' />Save
                  </button>
                  <button
                    className="flex flex-row rounded-md cursor-pointer items-center gap-2 bg-white px-3.5 ring-1 ring-red-300 py-2.5 text-sm font-semibold text-red-500 shadow-xs hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    onClick={handleMedicalCancel}
                  >
                    <XCircleIcon className='size-5' />Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
          {/* Education & Awards block */}
          <div className="bg-white p-6 rounded-lg ring-1 ring-stone-700/20 flex flex-row mt-5">
            <div className='grow'>
              <h2 className='text-lg font-semibold block w-full mb-5'>Education & Awards</h2>
              <div className="flex flex-col gap-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Education</div>
                  <div className='font-semibold text-sm'>
                    {editEducation ? (
                      <div>
                        {educationDraft.map((item: string, idx: number) => (
                          <input
                            key={idx}
                            className="block mb-2 border rounded px-2 py-1 w-full"
                            value={item}
                            onChange={e => handleEducationChange(idx, e.target.value)}
                          />
                        ))}
                      </div>
                    ) : (
                      educationDraft.map((item: string, idx: number) => (
                        <span key={idx} className="block">{item}</span>
                      ))
                    )}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Awards</div>
                  <div className='font-semibold text-sm'>
                    {user.awards.map((item: any, idx: number) => (
                      <span key={idx} className="block">{item}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div>
              {!editEducation ? (
                <button
                  className="flex flex-row rounded-md cursor-pointer items-center gap-2 bg-white px-3.5 ring-1 ring-stone-300 py-2.5 text-sm font-semibold text-gray-500 hover:text-black shadow-xs hover:bg-gray-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                  onClick={() => setEditEducation(true)}
                >
                  <PencilSquareIcon className='size-5' />Edit
                </button>
              ) : (
                <div className="flex flex-col gap-2 pl-2">
                  <button
                    className="flex flex-row rounded-md cursor-pointer items-center gap-2 bg-white px-5 ring-1 ring-emerald-300 py-2.5 text-sm font-semibold text-emerald-500 shadow-xs hover:bg-emerald-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                    onClick={handleEducationSave}
                  >
                    <InboxIcon className='size-5' />Save
                  </button>
                  <button
                    className="flex flex-row rounded-md cursor-pointer items-center gap-2 bg-white px-3.5 ring-1 ring-red-300 py-2.5 text-sm font-semibold text-red-500 shadow-xs hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    onClick={handleEducationCancel}
                  >
                    <XCircleIcon className='size-5' />Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
          {/* social info block */}
          <div className="bg-white p-6 rounded-lg ring-1 ring-stone-700/20 flex flex-row mt-5">
            <div className='grow'>
              <h2 className='text-lg font-semibold block w-full mb-5'>Social</h2>
              <div className="grid grid-cols-2 gap-4">
                {editSocial ? (
                  <>
                    <div>
                      <div className="text-sm text-gray-500">Website</div>
                      <input name="website" value={socialDraft.website} onChange={handleSocialChange} className="font-semibold text-sm border rounded px-2 py-1 w-full" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">linkedIn</div>
                      <input name="linkedin" value={socialDraft.linkedin} onChange={handleSocialChange} className="font-semibold text-sm border rounded px-2 py-1 w-full" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Facebook</div>
                      <input name="facebook" value={socialDraft.facebook} onChange={handleSocialChange} className="font-semibold text-sm border rounded px-2 py-1 w-full" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Instagram</div>
                      <input name="instagram" value={socialDraft.instagram} onChange={handleSocialChange} className="font-semibold text-sm border rounded px-2 py-1 w-full" />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <div className="text-sm text-gray-500">Website</div>
                      <div className='font-semibold text-sm'>{user['social-links'].website}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">linkedIn</div>
                      <div className='font-semibold text-sm'>{user['social-links'].linkedin}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Facebook</div>
                      <div className='font-semibold text-sm'>{user['social-links'].facebook}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Instagram</div>
                      <div className='font-semibold text-sm'>{user['social-links'].instagram}</div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div>
              {!editSocial ? (
                <button
                  className="flex flex-row rounded-md cursor-pointer items-center gap-2 bg-white px-3.5 ring-1 ring-stone-300 py-2.5 text-sm font-semibold text-gray-500 hover:text-black shadow-xs hover:bg-gray-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                  onClick={() => setEditSocial(true)}
                >
                  <PencilSquareIcon className='size-5' />Edit
                </button>
              ) : (
                <div className="flex flex-col gap-2 pl-2">
                  <button
                    className="flex flex-row rounded-md cursor-pointer items-center gap-2 bg-white px-5 ring-1 ring-emerald-300 py-2.5 text-sm font-semibold text-emerald-500 shadow-xs hover:bg-emerald-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                    onClick={handleSocialSave}
                  >
                    <InboxIcon className='size-5' />Save
                  </button>
                  <button
                    className="flex flex-row rounded-md cursor-pointer items-center gap-2 bg-white px-3.5 ring-1 ring-red-300 py-2.5 text-sm font-semibold text-red-500 shadow-xs hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    onClick={handleSocialCancel}
                  >
                    <XCircleIcon className='size-5' />Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {activeTab === 'Subscription' && (
        <div >
          <h2 className="text-lg font-semibold mb-4">Subscription</h2>
          {/* <p className="text-gray-600">Subscription details will be displayed here.</p> */}
          <Subscription />
        </div>
      )}
      {activeTab === 'Notifications' && (
        <div className="bg-white p-6 rounded-lg ring-1 ring-stone-700/20">
          <h2 className="text-lg font-semibold mb-4">Notifications</h2>
          <p className="text-gray-600">Notification settings will be displayed here.</p>
        </div>
      )}
      {activeTab === 'Feedbacks' && (
        <div className="bg-white p-6 rounded-lg ring-1 ring-stone-700/20">
          <h2 className="text-lg font-semibold mb-4">Feedbacks</h2>
          <p className="text-gray-600">User feedbacks will be displayed here.</p>
        </div>
      )}
      {activeTab === 'About' && (
        <div className="bg-white p-6 rounded-lg ring-1 ring-stone-700/20">
          <AboutUs />
        </div>
      )}
      {activeTab === 'Hospital' && (
        <div className="bg-white p-6 rounded-lg ring-1 ring-stone-700/20">
          <h2 className="text-lg font-semibold mb-4">Hospitals associated with</h2>
          <div className="grid grid-cols-2 gap-4">
            {user.hospitals && user.hospitals.length > 0 ? (
              user.hospitals.map((hospital: any, idx: number) => (
                <div
                  key={idx}
                  className={`flex flex-col items-center justify-center gap-8 p-10 border rounded cursor-pointer ${hospital.id === currentHospitalId ? 'border-2 border-dashed border-red-500 bg-red-50' : 'border-gray-300'}`}
                  onClick={() => handleHospitalSelect(hospital.id)}
                >
                  <p className={`rounded-full flex items-center justify-center${hospital.id === currentHospitalId ? 'text-red-500 ' : 'text-gray-500 '}`}>
                    <PhotoIcon className={`size-10 ${hospital.id === currentHospitalId ? 'text-red-500 ' : 'text-gray-500 '}`} />
                  </p>
                  <div className={`font-semibold text-base ${hospital.id === currentHospitalId ? 'text-red-500 ' : 'text-gray-500 '}`}>{hospital.name}</div>
                  {/* <HeartIcon className={`size-10 ${hospital.id === currentHospitalId ? 'text-red-500 ':'text-gray-500 '}`}/> */}
                  {/* <div className="text-sm text-gray-500">ID: {hospital.id}</div> */}
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-500">No hospitals associated</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
