import React, { useState, useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from "react-router-dom"
import { AuthContext } from '../contexts/AuthContext'
import Loader from '../components/Loader'

const Authentication = () => {

  const navigate = useNavigate()
  const { handleLogin, handleRegister } = useContext(AuthContext)

  const [isSignup, setIsSignup] = useState(false)
  const [fullname, setFullname] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (isSignup) {
        await handleRegister(fullname, username, password)
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
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <Loader />
  }

  return (
    <div className='bg-[#020319] min-h-screen flex items-center justify-center px-4'>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm 
        px-5 py-6 
        bg-white/5 backdrop-blur-xl 
        border border-white/10 
        rounded-xl 
        shadow-lg 
        space-y-4"
      >

      
        <div className='flex justify-between items-center'>
          <h2 className="text-3xl font-semibold text-gray-100">
            {isSignup ? "Sign Up" : "Sign In"}
          </h2>
          <img src={assets.chatlogo} alt="logo" width={36} />
        </div>

        <p className="text-sm text-gray-400/80">
          {isSignup
            ? "Create your account to get started."
            : "Enter username and password to continue."}
        </p>

      
        {isSignup && (
          <div>
            <label className="text-sm font-medium text-gray-200">Full Name</label>
            <input
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              placeholder="Enter your full name"
              className="mt-1 w-full px-3 py-2 rounded-md 
              bg-white/10 text-gray-200 
              border border-white/10 
              focus:outline-none focus:ring-2 focus:ring-indigo-600"
              required
              type="text"
            />
          </div>
        )}

      
        <div>
          <label className="text-sm font-medium text-gray-200">Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="mt-1 w-full px-3 py-2 rounded-md 
            bg-white/10 text-gray-200 
            border border-white/10 
            focus:outline-none focus:ring-2 focus:ring-indigo-600"
            required
            type="text"
          />
        </div>

      
        <div>
          <label className="text-sm font-medium text-gray-200">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="mt-1 w-full px-3 py-2 rounded-md 
            bg-white/10 text-gray-200 
            border border-white/10 
            focus:outline-none focus:ring-2 focus:ring-indigo-600"
            required
            type="password"
          />
        </div>

      
        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-md 
          bg-indigo-600 text-white 
          hover:bg-indigo-700 transition cursor-pointer
          disabled:opacity-50"
        >
          {isSignup ? "Create Account" : "Login"}
        </button>

      
        <p className='text-center text-sm text-gray-300 pt-2'>
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <span
            onClick={() => {
              setIsSignup(!isSignup)
              setError("")
            }}
            className="text-indigo-500 hover:underline cursor-pointer ml-1"
          >
            {isSignup ? "Sign In" : "Sign Up"}
          </span>
        </p>

      </form>
    </div>
  )
}

export default Authentication