"use client";

import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { setUserId, setUserName, setHospitalId, setRole } from '../redux/userSlice';
import { EyeIcon, EyeSlashIcon, ArrowPathIcon } from '@heroicons/react/24/solid';
import { useFetch } from "@/lib/fetch";
import { useAuth, useSignIn, useSignUp, useUser } from "@clerk/nextjs";
import Message from "@/components/Message";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { sessionId } = useAuth();
  // const [emailVerify, setEmailVerify] = useState('agustya742@gmail.com');
  // const [verifyPassword, setVerifyPassword] = useState('password123');
  // const [verifyCode, setVerifyCode] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [profiles, setProfiles] = useState([]);

  const { isLoaded: signInLoaded, signIn, setActive: setSignInActive } = useSignIn();
  const { isLoaded: signUpLoaded, signUp, setActive: setSignUpActive } = useSignUp();
  const [verify, setVerify] = useState(false);
  const [code, setCode] = useState("");
  const [formType, setFormType] = useState("signin");
  const [signUpFields, setSignUpFields] = useState({ username: "", emailAddress: "", password: "" })
  const [signInFields, setSignInFields] = useState({ identifier: "agustya742@gmail.com", password: "jashp@19112023" });
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' | 'warning' } | null>(null);
  const [signInLoading, setSignInLoading] = useState(false);
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  // const [successfulCreation, setSuccessfullCreation] = useState(false)
  // const [forgotPassword, setForgotPassword] = useState(false)

  // const { data: categoriesDb, loading, error } = useFetch<any[]>("/api/getData");
  // console.log(categoriesDb);

  useEffect(() => {
    // fetch('/json/profile.json')
    //   .then(res => res.json())
    //   .then(data => setProfiles(data));

    if (sessionId) {
      router.push("/dashboard");
    }
  }, []);


  function handleSignUpFieldChange(e: any) {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    setSignUpFields({
      ...signUpFields,
      [name]: value
    })
  }

  function handleSignInFieldChange(e: any) {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    setSignInFields({
      ...signInFields,
      [name]: value
    })
  }

  async function verifySubmit(e: any) {
    e.preventDefault();
    setVerifyLoading(true);
    try {
      const signUpAttempt = await signUp?.attemptEmailAddressVerification({ code })

      if (signUpAttempt?.status === "complete") {
        // if (!setSignUpActive) return; // Clerk not ready yet
        await setSignUpActive!({ session: signUpAttempt.createdSessionId });
        router.push("/dashboard")
      } else {
        setMessage({ text: 'Verification failed. Please try again.', type: 'error' });
      }

    } catch (error: any) {
      setMessage({ text: error.errors?.[0]?.message || 'An error occurred during verification.', type: 'error' });
    } finally {
      setVerifyLoading(false);
    }
  }

  async function signInSubmit(e: any) {
    e.preventDefault();
    setSignInLoading(true);
    try {
      const signInAttempt = await signIn?.create({
        ...signInFields
      })

      if (signInAttempt?.status === 'complete') {
        //  if (!setSignInActive) return; // Clerk not ready yet
        await setSignInActive!({ session: signInAttempt.createdSessionId });
        router.push('/dashboard')
      } else {
        setMessage({ text: 'Sign in failed. Please check your credentials.', type: 'error' });
      }


    } catch (error: any) {
      setMessage({ text: error.errors?.[0]?.message || 'An error occurred during sign in.', type: 'error' });
    } finally {
      setSignInLoading(false);
    }
  }
  async function signUpSubmit(e: any) {
    e.preventDefault();
    setSignUpLoading(true);
    try {
      await signUp?.create({
        ...signUpFields
      });
      await signUp?.prepareEmailAddressVerification({
        strategy: "email_code"
      })
      setVerify(true)
    } catch (error: any) {
      setMessage({ text: error.errors?.[0]?.message || 'An error occurred during sign up.', type: 'error' });
    } finally {
      setSignUpLoading(false);
    }
  }

  if (!signInLoaded || !signUpLoaded) return;


  const renderSignInForm = () => (
    <div className="flex flex-row items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full">
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
            {message && <Message message={message.text} type={message.type} />}
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={signInSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="identifier"
                    type="email"
                    value={signInFields.identifier}
                    onChange={handleSignInFieldChange}
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
                    <span className="font-semibold text-violet-600 hover:text-violet-500 cursor-pointer" onClick={() => router.push("/password_reset")}>
                      Forgot password?
                    </span>
                  </div>
                </div>
                <div className="mt-2 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={signInFields.password}
                    onChange={handleSignInFieldChange}
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
                  disabled={signInLoading}
                  className="flex w-full justify-center rounded-md bg-violet-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-violet-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {signInLoading ? (
                    <ArrowPathIcon className="animate-spin h-5 w-5" />
                  ) : (
                    'Sign in'
                  )}
                </button>
              </div>
            </form>
            <p className="mt-10 text-center text-sm/6 text-gray-500">
              Not a member?{' '}
              <span onClick={() => setFormType('signup')} className="font-semibold text-violet-600 hover:text-violet-500">
                SignUp
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSignUpForm = () => (
    <div className="flex flex-row items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full">
        <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-white">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="Your Company"
              src="/FullLogo.png"
              className="mx-auto h-20 w-auto"
            />
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Sign Up your account
            </h2>
            {message && <Message message={message.text} type={message.type} />}
          </div>
          {verify ? (
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form onSubmit={verifySubmit} className="space-y-6">
                <div>
                  <label htmlFor="code" className="block text-sm/6 font-medium text-gray-900">
                    Enter code to verify
                  </label>
                  <div className="mt-2">
                    <input
                      id="code"
                      name="code"
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      autoComplete="email"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-600 sm:text-sm/6"
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={verifyLoading}
                    className="flex w-full justify-center rounded-md bg-violet-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-violet-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {verifyLoading ? (
                      <ArrowPathIcon className="animate-spin h-5 w-5" />
                    ) : (
                      'Verify Code'
                    )}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form onSubmit={signUpSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                    User Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      value={signUpFields.username}
                      onChange={handleSignUpFieldChange}
                      autoComplete="email"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-600 sm:text-sm/6"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="emailAddress"
                      type="email"
                      value={signUpFields.emailAddress}
                      onChange={handleSignUpFieldChange}
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
                  </div>
                  <div className="mt-2 relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={signUpFields.password}
                      onChange={handleSignUpFieldChange}
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
                    disabled={signUpLoading}
                    className="flex w-full justify-center rounded-md bg-violet-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-violet-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {signUpLoading ? (
                      <ArrowPathIcon className="animate-spin h-5 w-5" />
                    ) : (
                      'Sign Up'
                    )}
                  </button>
                </div>
              </form>
              <p className="mt-10 text-center text-sm/6 text-gray-500">
                Already have an account?{' '}
                <span onClick={() => setFormType('signin')} className="font-semibold text-violet-600 hover:text-violet-500 cursor-pointer">
                  Sign In
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {formType === 'signin' && renderSignInForm()}
      {formType === 'signup' && renderSignUpForm()}
    </>
  )
}
