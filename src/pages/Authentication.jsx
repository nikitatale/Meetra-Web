import React, { useState, useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { AuthContext } from '../contexts/AuthContext'

const Authentication = () => {

  const navigate = useNavigate()
  const { handleLogin, handleRegister } = useContext(AuthContext)

  const [isSignup, setIsSignup] = useState(false)

  const [fullname, setFullname] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      if (isSignup) {
        const result = await handleRegister(fullname, username, password)

      
        setFullname("")
        setUsername("")
        setPassword("")
        setIsSignup(false)
      } else {
        await handleLogin(username, password)
      }

    } catch (err) {
      const message = err?.response?.data?.message || "Something went wrong"
      setError(message)
    }
  }

  return (
    <div className='bg-[#020319] min-h-screen'>

      <div
        onClick={() => navigate("/")}
        className="flex items-center gap-2 px-6 pt-6 text-gray-300 cursor-pointer hover:text-indigo-400 transition duration-200 w-fit"
        
      >
        <ArrowLeft size={22} />
        <span className="text-sm font-medium">Back to Home</span>
      </div>

      <main className="flex items-center justify-center w-full px-4">
        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col max-w-96 mt-10 px-4 py-6"
          style={{boxShadow: "0 4px 8px rgba(0,0,0,0.5)"}}
        >

          <div className='flex justify-between'>
            <h2 className="text-4xl text-start font-medium text-gray-100">
              {isSignup ? "Sign Up" : "Sign in"}
            </h2>
            <img src={assets.chatlogo} alt="logo" width={40} />
          </div>

          <p className="mt-4 text-base text-start text-gray-400/90">
            {isSignup
              ? "Create your account to get started."
              : "Please enter username and password to access."}
          </p>

          {isSignup && (
            <div className="mt-10">
              <label className="font-medium text-gray-200">Full Name</label>
              <input
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                placeholder="Enter your full name"
                className="mt-2 text-gray-400 rounded-md ring ring-gray-200 focus:ring-2 focus:ring-indigo-600 outline-none px-3 py-3 w-full"
                required
                type="text"
              />
            </div>
          )}

          <div className={isSignup ? "mt-6" : "mt-10"}>
            <label className="font-medium text-gray-200">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="mt-2 text-gray-400 rounded-md ring ring-gray-200 focus:ring-2 focus:ring-indigo-600 outline-none px-3 py-3 w-full"
              required
              type="text"
            />
          </div>

          <div className="mt-6">
            <label className="font-medium text-gray-200">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="mt-2 text-gray-400 rounded-md ring ring-gray-200 focus:ring-2 focus:ring-indigo-600 outline-none px-3 py-3 w-full"
              required
              type="password"
            />
          </div>

          {error && (
            <p className="text-red-500 mt-4 text-sm">{error}</p>
          )}

          <button
            type="submit"
            className="mt-8 py-3 w-full cursor-pointer rounded-md bg-indigo-600 text-white transition hover:bg-indigo-700"
          >
            {isSignup ? "Create Account" : "Login"}
          </button>

          <p className='text-center py-8 text-gray-200'>
            {isSignup ? "Already have an account?" : "Don't have an account?"}
            <span
              onClick={() => {
                setIsSignup(!isSignup)
                setError("")
              }}
              className="text-indigo-600 hover:underline cursor-pointer ml-1"
            >
              {isSignup ? "Sign in" : "Sign up"}
            </span>
          </p>

        </form>
      </main>
    </div>
  )
}

export default Authentication