import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/appContext.jsx';
import toast from 'react-hot-toast';



const Login = () => {

  const {axios,setToken} = useAppContext();

  const handleSubmit =async (e) => {
    e.preventDefault();
    try{
      const {data} = await axios.post('/api/admin/login', {
        email,
        password
      })    
      if(data.success){
        setToken(data.token);
        localStorage.setItem("token", data.token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
        navigate("/admin");
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred while logging in. Please try again.");
    }
  } 

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  return (

    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary/10 via-white to-primary/5">
      <div className="w-full max-w-sm p-8 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg bg-white/90 backdrop-blur-md">
        <div className="flex flex-col items-center mb-8">
          <img src="/src/assets/logo.svg" alt="Quickblog Admin" className="w-16 mb-2" />
          <h1 className="text-3xl font-bold mb-1 text-gray-800">
            <span className="text-primary">Admin</span> Login
          </h1>
          <p className="font-light text-gray-500 text-sm">Enter your credentials to access the admin panel</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input onChange={e=> setEmail(e.target.value)} value={email} type="email" placeholder="Enter your email..." required className="border-b-2 border-primary/30 focus:border-primary transition-all p-2 outline-none bg-transparent text-gray-700" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input onChange={e=> setPassword(e.target.value)} value={password}  type="password" placeholder="Enter your password..." required className="border-b-2 border-primary/30 focus:border-primary transition-all p-2 outline-none bg-transparent text-gray-700" />
          </div>
          <button type="submit" className="w-full py-3 font-semibold bg-gradient-to-r from-primary to-indigo-500 text-white rounded-lg shadow hover:scale-105 hover:shadow-lg transition-all">Login</button>
        </form>

        <div className="mt-6 text-center">
          <button className="text-xs text-primary hover:underline transition-all">Forgot password?</button>
        </div>
      </div>
    </div>
  )
}

export default Login