'use client';

import AdBanner from "@/components/adBanner";
import Header from "@/components/header";
import { TicketIcon, UserIcon, BellIcon, ChevronDownIcon, ChevronUpIcon, BellAlertIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useDispatch, useSelector } from 'react-redux';
import { setActiveHospital, setDbReduxUser } from '../../redux/userSlice';
import { RootState } from "@/redux/store";
import { useFetch } from "@/lib/fetch";
import { persistor } from '../../redux/store';

export default function Home() {
  const { user } = useUser();
  const dispatch = useDispatch();

  const router = useRouter();
  const [profiles, setProfiles] = useState<any[]>([]);
  const [staff, setStaff] = useState<any[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [open, setOpen] = useState(true);

  const userId = useSelector((state: RootState) => state.user.userId)
  const userDetails = useSelector((state: RootState) => state.user)

  const { data: categoriesDb, loading, error } = useFetch<any[]>(`/api/getDoctorData?id=${user?.id}`);
  const { data: hospitalDbList, loading: hospitalLoading, error: hospitalError } = useFetch<any[]>(`/api/getHospitals?id=${categoriesDb?.[0]?.id || userDetails.userdbId}`);

  // Clear Redux store before fetching data
  // useEffect(() => {
    // persistor.purge();
  // }, []);
  // const { data: staffDBdata, loading: staffLoading, error: staffError } = useFetch<any[]>(`/api/getstaff?hospital_id=${userRedux.active_hospital.id}`);
  // console.log(user);
  console.log('categoriesDb');
  console.log(categoriesDb);
  console.log(hospitalDbList);
  // console.log(user && categoriesDb && categoriesDb.length > 0);
  

  useEffect(() => {
    // if (user && categoriesDb && categoriesDb.length > 0 && hospitalDbList && hospitalDbList.length > 0) {
    if (user && categoriesDb && categoriesDb.length > 0) {
      const userData = categoriesDb[0];
      dispatch(setDbReduxUser({
        userId: user.id,
        userdbId: userData.id.toString(),
        userName: user.username || '',
        firstName: userData.first_name || '',
        lastName: userData.last_name || '',
        email: userData.email || '',
        phone: userData.phone || '',
        license: userData.licence || '',
        bio: userData.bio || '',
        exp: userData.experience || '',
        education: userData.education || '',
        awards: userData.awards || '',
        website: userData.social_url.website || '',
        linkedIn: userData.social_url.linkedin || '',
        facebook: userData.social_url.facebook || '',
        instagram: userData.social_url.instagram || '',
        address: userData.address || '',
        country: userData.country || '',
        state: userData.state || '',
        city: userData.city || '',
        zip: userData.zip || '',
        active_hospital: {id: '', name: ''},
        hospitalId: hospitalDbList ? hospitalDbList : [],
        role: 'admin',
        isCollapsed: false
      }));
    }

    if (user && hospitalDbList && hospitalDbList.length > 0) {
      console.log(hospitalDbList[0].id);
      dispatch(setActiveHospital({id: hospitalDbList[1].id , name: hospitalDbList[1].name}))
    }
    // fetch('/json/profile.json')
    //   .then(res => res.json())
    //   .then(data => setProfiles(data));
    // fetch('/json/staff.json')
    //   .then(res => res.json())
    //   .then(data => {
    //     // console.log(userId)
    //     // console.log(data)
    //     const matchingStaff = data.filter((s: any) => s.docId === userId);
    //     // console.log(matchingStaff)
    //     setStaff(matchingStaff)
    //   });

    // Update Redux with user details from Clerk
  }, [user, categoriesDb, hospitalDbList, dispatch]);

  console.log(userDetails)

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div className="overflow-y-auto max-h-[calc(100vh-96px)] p-4">
      <p className="text-2xl font-bold mb-4">Hi!  {user?.username}</p>
      <div className="flex flex-row items-center gap-4 mb-8 inset-ring-2 inset-ring-violet-400 p-6 px-10 rounded-md bg-violet-100">
        <p className="font-medium text-base flex-1">To continue further please complete your profile by providing appropriate informations as requested.</p>
        <button
          onClick={() => router.push('/dashboard/profile/' + userId)}
          className="flex flex-row rounded-md cursor-pointer items-center gap-2 bg-blue-600 p-3 py-2 text-sm font-semibold text-white shadow-md hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
        >
          Complete Profile
        </button>
      </div>
      <div className="grid grid-cols-4 xl:grid-cols-5 gap-5">
        <div className="col-span-2 xl:col-span-3 space-y-6 ">
          <div className="grid grid-cols-2 gap-4">
            {/* info cards */}
            <Link href={'/dashboard/patients'} className="cursor-pointer bg-white p-4 ring-1.5 ring-gray-300 rounded-md flex flex-row gap-3">
              <div className="">
                <div className="p-1.5 ring-1 ring-blue-300 text-blue-500 bg-blue-50 rounded-lg min-w-8 min-h-8 justify-center items-center flex"><UserIcon className="size-5" /></div>
              </div>
              <div className="text-base text-gray-400">
                Total Patients
                <div className="text-xl font-medium text-black">3330</div>
              </div>
            </Link>

            <Link href={'/dashboard/token'} className="cursor-pointer bg-white p-4 ring-1.5 ring-gray-300 rounded-md flex flex-row gap-3">
              <div className="">
                <div className="p-1 ring-1 ring-blue-300 text-blue-500 bg-blue-50 rounded-lg min-w-8 min-h-8 justify-center items-center flex"><TicketIcon className="size-5" /></div>
              </div>
              <div className="text-base text-gray-400">
                Tokens
                <div className="text-xl font-medium text-black">33/101</div>
              </div>
            </Link>

          </div>
          <div className="mt-4">
            {/* Placeholder for future charts or data visualization */}
            <div className="bg-white p-4 rounded-lg ring-1.5 ring-gray-300 h-64 flex items-center justify-center">
              <p className="text-gray-400">Data Visualization Coming Soon...</p>
            </div>
          </div>
        </div>
        <div className="col-span-2 xl:col-span-2 space-y-6">
          <div className="bg-white rounded-lg ring-1.5 ring-gray-300">
            <div className="text-md font-bold flex flex-row p-4 border-b-1 border-gray-200 justify-center items-center gap-2">
              <div className="grow">Staff</div>
              <button onClick={() => setOpen(!open)} className="flex rounded-md cursor-pointer justify-center items-center bg-white w-8 h-8 text-gray-700  hover:bg-gray-200 border-1 border-gray-300">
                <ChevronDownIcon className={`size-5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
              </button>
            </div>
            <div className={`bg-white ring-1.5 ring-gray-300 p-4 overflow-y-auto rounded-b-lg transition-all duration-500 ease-in-out ${open ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'}`}>
              {staff.length > 0 ? (
                staff.map((s, index) => (
                  <div key={s.id} className={`flex flex-row gap-4 pb-3 mb-3 ${index < staff.length - 1 ? 'border-b-1 border-gray-200' : ''}`}>
                    <div className="flex items-center justify-center">
                      <div className="p-1.5 ring-1 ring-blue-300 text-blue-500 bg-blue-50 rounded-lg min-w-8 min-h-8 justify-center items-center flex">
                        <UserIcon className="size-5" />
                      </div>
                    </div>
                    <div className="grow">
                      <div className="text-sm font-medium text-gray-900">{s.name}</div>
                      <div className="text-sm text-gray-500">{s.position} - {s.department}</div>
                    </div>
                    <div className="flex items-center justify-center">
                      <button className="flex rounded-full cursor-pointer justify-center items-center bg-white p-2 text-gray-500  hover:bg-gray-200 border-1 border-gray-300">
                        <BellAlertIcon  className='size-4' />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray-500">No staff found.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
