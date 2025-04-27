import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setLoggedIn(!!token);
  }, []);

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/signup');
      const foundUser = res.data.find(u => u.email === formData.email);

      if (!foundUser) {
        alert('User not found, please register first.');
        navigate('/');
      } else if (foundUser.password !== formData.password) {
        alert('Wrong password, try again.');
      } else {
        alert('Logged in successfully!');
        localStorage.setItem('token', foundUser.token);
        navigate('/dashboard');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-8 flex justify-center items-center">
      <div className="w-full max-w-md">
        {loading ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin h-10 w-10 border-4 border-t-black rounded-full"></div>
            <p className="mt-3 text-black">Logging you in...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Enter a valid email',
                  },
                })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <div className="flex items-center border rounded">
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', { required: 'Password is required' })}
                  className="w-full py-2 px-3 text-gray-700 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="px-3 text-gray-600"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 w-full rounded"
            >
              Login
            </button>

            <p className="text-center text-gray-600 text-sm mt-4">
              Don't have an account? <Link to="/" className="text-blue-500 hover:underline">Sign Up</Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
