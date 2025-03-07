import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className='flex justify-center items-center min-h-screen bg-gradient-to-r'>
      <div className='w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-6'>
        <h2 className='text-3xl font-bold text-center text-gray-800'>Welcome Back</h2>
        <p className='text-center text-gray-600'>Please login to your account</p>
        
        <button 
          className='w-full flex items-center justify-center gap-2 border py-3 rounded-lg shadow-sm hover:bg-gray-100 transition duration-200'
        >
          <FcGoogle size={24} />
          <span className='font-medium text-gray-700'>Continue with Google</span>
        </button>
        
        <div className='flex items-center gap-2'>
          <hr className='w-full border-gray-300' />
          <span className='text-gray-500'>or</span>
          <hr className='w-full border-gray-300' />
        </div>
        
        <form className='space-y-4'>
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
          <div className='flex justify-between items-center text-sm'>
            <label className='flex items-center space-x-2'>
              <input type='checkbox' className='form-checkbox text-[#f56666]' />
              <span className='text-gray-600'>Remember me</span>
            </label>
            <a href='#' className='text-[#f56666] hover:underline'>Forgot password?</a>
          </div>
          <button 
            type='submit' 
            className='w-full bg-[#f56666] text-white py-3 rounded-lg hover:bg-[#FF3D3D] transition duration-200 font-medium shadow-md'
          >
            Login
          </button>
        </form>
        <p className='text-center text-gray-600'>Don't have an account? <a href='/SignUp' className='text-[#FF3D3D] hover:underline'>Sign up</a></p>
      </div>
    </section>
  );
}

export default Login;