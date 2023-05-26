import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import logo from '../Images/logo.png'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import SocialLogin from './SocialLogin';
import Loading from '../Components/Loading';
import UseToken from '../Deshboard/Hooks/UseToken';
import { getAuth } from 'firebase/auth';
const Login = () => {
  const [emails, setEmails] = useState('');
  const auth = getAuth();
  const navigate=useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";
  const { register, formState: { errors }, handleSubmit } = useForm();
  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);
      const onSubmit = data => {
        signInWithEmailAndPassword(data.email,data.password);
      }
      const [token]=UseToken(user);
      let signInErrorMessage;
   useEffect(()=>{
     if (token) {
       navigate(from, { replace: true });
     }
   },[token,from,navigate])
  if(error){
    
signInErrorMessage=<p className='text-red-700'>{error?.message}</p>
  }
  if (loading ) {
    return <Loading/>;
  }
     return (
<div className=" py-10 bg-white">
<div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl border-primary border border-opacity-30 ">
        <div className="hidden lg:block lg:w-1/2 bg-cover" style={{backgroundImage:"url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80')"}}></div>
        <div className="w-full p-8 lg:w-1/2">
      <img className='h-12 w-28 text-center mx-auto' src={logo} alt="logo" />
         
        <SocialLogin/>
         <form onSubmit={handleSubmit(onSubmit)}>
         <div className="mt-4 flex items-center justify-between">
          <span className="border-b w-1/5 lg:w-1/4"></span>
          <a href="#" className="text-xs text-center text-gray-500 uppercase">OR</a>
           <span className="border-b w-1/5 lg:w-1/4"></span>
           </div>
           <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
            <input placeholder='Type your e-mail address' onChange={(e) => setEmails(e.target.value)} className="bg-gray-200 text-primary focus:outline-primary focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none caret-primary" type="email"
            {...register("email",{
                required:{
                
                value: true,
                message:"Email is Required"
            }
              })}
            
            />
            <label className='label '>
            {errors.email?.type === 'required' && <p className='text-red-600' >{errors.email.message}</p>}
            {errors.email?.type === 'pattern' && <p className='text-red-600' >{errors.email.message}</p>}
            </label>
            
           </div>
           <div className="mt-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input placeholder="Type your password" className="bg-gray-200 text-primary focus:outline-primary focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none caret-primary" type="password"
            {...register("password",{
                required:{
                
                value: true,
                message:"Password is Required"
            }, 
            minLength: { 
                value:6,
                message:"Must be 6 char password or long"
            }
              })}
            
            />
            <label className='label'>
            {errors.password?.type === 'required' && <p className=' text-red-600' >{errors.password.message}</p>}
            {errors.password?.type === 'minLength' && <p className=' text-red-600' >{errors.password.message}</p>}
            </label>
            
           </div>
         
           <div className='text-end'>
      <Link to="/forget-password" className='underline hover:text-primary hover:font-semibold'>
        forget password
      </Link>
    </div>
          {signInErrorMessage}
            <div className="mt-8">
            <input className="bg-primary text-white font-bold py-2 px-4 w-full rounded cursor-pointer " type="submit" value="Login"/>
            </div>
            </form>
            <div className="mt-4 flex items-center justify-between">
           <span className="border-b w-1/5 md:w-1/4"></span>
            <NavLink to="/register" className="text-xs text-gray-500 ">Don’t have an account? <span className='text-primary font-bold underline'>Sign Up</span> </NavLink>
            <span className="border-b w-1/5 md:w-1/4"></span>
            </div>
                  </div>
              </div>
          </div>
     );
};
export default Login;