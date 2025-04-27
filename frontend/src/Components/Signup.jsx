import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const submitForm = async (userInfo) => {
    try {
      setIsLoading(true);
      const { data } = await axios.get("http://localhost:5000/signup");
      const userExists = data.find(item => item.email === userInfo.email);

      if (userExists) {
        alert("User already registered. Please login.");
        navigate('/login');
      } else {
        await axios.post("http://localhost:5000/signup", userInfo);
        alert("Signup done successfully!");
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-6">
      <div className="flex flex-col items-center px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">Create Account</h1>

        {isLoading ? (
          <div className="flex flex-col items-center">
            <div className="h-10 w-10 border-4 border-t-4 border-gray-900 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-700">Processing...</p>
          </div>
        ) : (
          <div className="w-full max-w-md p-6 rounded-md shadow-md bg-white">
            <form onSubmit={handleSubmit(submitForm)} className="space-y-4">

              {/* Name */}
              <div>
                <label className="block mb-1 text-sm text-gray-600">Name</label>
                <input
                  type="text"
                  {...register("username", { required: "Name is required", minLength: 3, maxLength: 15 })}
                  className="w-full border rounded p-2 text-sm"
                  placeholder="Enter your name"
                />
                {errors.username && <p className="text-red-500 text-xs">{errors.username.message}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block mb-1 text-sm text-gray-600">Email</label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" }
                  })}
                  className="w-full border rounded p-2 text-sm"
                  placeholder="you@example.com"
                />
                {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block mb-1 text-sm text-gray-600">Password</label>
                <div className="flex items-center border rounded p-2">
                  <input
                    type={showPass ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                      minLength: { value: 8, message: "At least 8 characters" },
                      pattern: { value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/, message: "Must include uppercase, number, special character" }
                    })}
                    className="w-full text-sm outline-none"
                    placeholder="Enter password"
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="ml-2 text-lg">
                    {showPass ? "🙈" : "👁️"}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded mt-2 hover:bg-gray-800"
              >
                Sign Up
              </button>

              <p className="text-center text-sm text-gray-500 mt-4">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
              </p>

            </form>
          </div>
        )}
      </div>
    </section>
  );
}

export default Signup;
