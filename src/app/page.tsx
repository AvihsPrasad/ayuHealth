"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { setUserId, setUserName, setHospitalId, setRole } from '../redux/userSlice';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { useFetch } from "@/lib/fetch";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('arya.sharma@example.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const { data: categoriesDb, loading, error } = useFetch<any[]>("/api/getData");
  // Frontend example
  // const fetchData = async () => {
  //   const response = await fetch('/api/getData'); // Ensure this matches your route
  //   const data = await response.json();
  //   console.log(data);
  // };
  // const version = getData();
  // console.log(version)
  console.log(categoriesDb)

  useEffect(() => {
    // fetchData()
    fetch('/json/profile.json')
      .then(res => res.json())
      .then(data => setProfiles(data));

    // Fetch data from getcat API
    // fetch('/api/getcat')
    //   .then(res => res.json())
    //   .then(data => {
    //     console.log('Fetched data from getcat:', data);
    //   })
    //   .catch(error => {
    //     console.error('Error fetching from getcat:', error);
    //   });
  }, []);
  return (
    <>
      <div className="flex flex-row items-center justify-center min-h-screen bg-gray-50">
        <div className="grow flex items-center justify-center">
          <img src="./loginBanner.png" alt="" className="w-2/3" />
        </div>
        <div className="w-1/3">

          <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-white">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                alt="Your Company"
                src="/FullLogo.png"
                className="mx-auto h-20 w-auto"
              />
              <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                Sign in to your account
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form action="#" method="POST" className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      //   required
                      autoComplete="email"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-600 sm:text-sm/6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                      Password
                    </label>
                    <div className="text-sm">
                      <a href="#" className="font-semibold text-violet-600 hover:text-violet-500">
                        Forgot password?
                      </a>
                    </div>
                  </div>
                  <div className="mt-2 relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      //   required
                      autoComplete="current-password"
                      className="block w-full rounded-md bg-white px-3 py-1.5 pr-10 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-600 sm:text-sm/6"
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-gray-400" />
                      )}
                    </span>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-violet-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-violet-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
                    onClick={async (e) => {
                      e.preventDefault();
                      const user = profiles.find((profile: any) => profile.email === email && profile.pwd === password);
                      if (user) {
                        // Fetch data from Neon DB dummy table
                        // try {
                        //   const response = await fetch('/db/getdummy/1'); // Using 1 as dummy id
                        //   const data = await response.json();
                        //   console.log('Fetched data from dummy table:', data);
                        // } catch (error) {
                        //   console.error('Error fetching from dummy table:', error);
                        // }

                        dispatch(setUserId((user as any).id));
                        dispatch(setUserName((user as any).name));
                        dispatch(setHospitalId((user as any).hospitals[0].id));
                        dispatch(setRole((user as any).role));
                        router.push('/dashboard');
                      } else {
                        alert('Invalid email or password');
                      }
                    }}
                  >
                    Sign in
                  </button>
                </div>
              </form>

              <p className="mt-10 text-center text-sm/6 text-gray-500">
                Not a member?{' '}
                <Link href="/" className="font-semibold text-violet-600 hover:text-violet-500">
                  SignIn
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
