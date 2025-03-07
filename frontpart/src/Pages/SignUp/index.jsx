import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className='flex justify-center items-center min-h-screen bg-gradient-to-r '>
      <div className='w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-6'>
        <h2 className='text-3xl font-bold text-center text-gray-800'>Create an Account</h2>
        <p className='text-center text-gray-600'>Join us today!</p>
        <form className='space-y-4'>
          <div>
            <label className='block text-gray-700 font-medium'>Name</label>
            <input 
              type='text' 
              className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f56666] shadow-sm' 
              placeholder='Enter your name' 
              required
            />
          </div>
          <div>
            <label className='block text-gray-700 font-medium'>Email</label>
            <input 
              type='email' 
              className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f56666] shadow-sm' 
              placeholder='Enter your email' 
              required
            />
          </div>
          <div className='relative'>
            <label className='block text-gray-700 font-medium'>Password</label>
            <input 
              type={showPassword ? 'text' : 'password'}
              className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f56666] shadow-sm pr-10' 
              placeholder='Enter your password' 
              required
            />
            <button
              type='button'
              className='absolute top-9 right-3 text-gray-500 hover:text-gray-700'
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <button 
            type='submit' 
            className='w-full bg-[#f56666] text-white py-3 rounded-lg hover:bg-[#f56666] transition duration-200 font-medium shadow-md'
          >
            Sign Up
          </button>
        </form>
        <div className='flex items-center justify-center my-4'>
          <div className='w-full border-t border-gray-300'></div>
          <span className='px-3 text-gray-500'>OR</span>
          <div className='w-full border-t border-gray-300'></div>
        </div>
        <button 
          className='w-full flex items-center justify-center bg-white border border-gray-300 py-2 rounded-lg shadow-sm hover:bg-gray-100 transition duration-200'
        >
          <FcGoogle size={24} className='mr-2' /> Continue with Google
        </button>
        <p className='text-center text-gray-600'>Already have an account? <a href='/Login' className='text-[#f56666] hover:underline'>Login</a></p>
      </div>
    </section>
  );
}

export default SignUp;
