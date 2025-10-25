"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useFetch } from "@/lib/fetch";
import { useAuth, useSignIn } from "@clerk/nextjs";
import Message from "@/components/Message";

export default function PasswordReset() {
  const {isSignedIn} = useAuth();
  const router = useRouter();
  const [emailVerify, setEmailVerify] = useState('agustya742@gmail.com');
  const [verifyPassword, setVerifyPassword] = useState('password123');
  const [verifyCode, setVerifyCode] = useState('password123');

  const { isLoaded, signIn, setActive } = useSignIn();
  const [successfulCreation, setSuccessfullCreation] = useState(false)
  const [forgotPassword, setForgotPassword] = useState(false)
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' | 'warning' } | null>(null)

  async function verifyEmail(e: any) {
    e.preventDefault();
    try {
      await signIn?.create({
        strategy: "reset_password_email_code",
        identifier: emailVerify
    }).then(
        () => {
          setSuccessfullCreation(true)
        }
      )
    } catch (error: any) {
      setMessage({ text: error.errors?.[0]?.message || 'An error occurred during email verification.', type: 'error' });
    }
  }

  async function resetPasswordSubmit(e: any) {
    e.preventDefault();
    try {
      await signIn?.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code: verifyCode,
        password: verifyPassword
      }).then(
        (result) => {
          if (result.status === "complete") {
            router.push('/')
          }
        }
      )
    } catch (error: any) {
      setMessage({ text: error.errors?.[0]?.message || 'An error occurred during password reset.', type: 'error' });
    }
  }

  if (isSignedIn) {
    router.push('/dashboard')
  }

  if (!isLoaded) return;

  return (
    <>
    <div className="flex flex-row items-center justify-center min-h-screen bg-gray-50">
        {/* <div className="grow flex items-center justify-center">
          <img src="./loginBanner.png" alt="" className="w-2/3" />
        </div> */}
        <div className="w-full">
          <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-white">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                alt="Your Company"
                src="/FullLogo.png"
                className="mx-auto h-20 w-auto"
              />
              <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                {!forgotPassword ? 'Sign in to your account' : 'Forgot password'} {successfulCreation ? 'resetPasswordSubmit' : 'verifyEmail'}
              </h2>
              {message && <Message message={message.text} type={message.type} />}
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form onSubmit={successfulCreation ? resetPasswordSubmit : verifyEmail} className="space-y-6">
                {!successfulCreation && <div>
                  <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                    Verify email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="identifier"
                      type="email"
                      value={emailVerify}
                      onChange={(e) => setEmailVerify(e.target.value)}
                      //   required
                      autoComplete="email"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-600 sm:text-sm/6"
                    />
                  </div>
                </div>}
                {successfulCreation && <>
                  <div>
                    <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                      Enter new password
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="identifier"
                        type="text"
                        value={verifyPassword}
                        onChange={(e) => setVerifyPassword(e.target.value)}
                        //   required
                        autoComplete="email"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-600 sm:text-sm/6"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                      Verify code
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="identifier"
                        type="text"
                        value={verifyCode}
                        onChange={(e) => setVerifyCode(e.target.value)}
                        //   required
                        autoComplete="email"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-600 sm:text-sm/6"
                      />
                    </div>
                  </div>
                </>}
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-violet-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-violet-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
                  >
                    {!successfulCreation ? 'Next' : 'Submit'}
                  </button>
                </div>
              </form>
              <p className="mt-6 text-center text-sm/6 text-gray-500">
                <span onClick={() => { setForgotPassword(false); setSuccessfullCreation(false); }} className="cursor-pointer font-semibold text-violet-600 hover:text-violet-500">
                  Cancel
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
