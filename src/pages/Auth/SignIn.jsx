import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import Poster from '../../assets/Images/pexels-airamdphoto-20873207.jpg'
import img1 from '../../assets/icons/support.png'
import img2 from '../../assets/icons/social-justice.png'
import img3 from '../../assets/icons/customer-service.png'
import img4 from '../../assets/icons/mail.png'
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Backend_URL } from '../../utils/Constant.js';


export default function SignIn() {

  const navigate = useNavigate();

  const [formData , setformData] = useState({
    Email: "",
    Password: ""
  })

  const [regPattern , setregPattern] = useState({
    Email_Rule: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    Password_Rule: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  })

  async function SubmitDetails() {

    if(!regPattern.Email_Rule.test(formData.Email)){
      toast.error("Email is mandatory");
      return false;
    }

    if(!regPattern.Password_Rule.test(formData.Password)){
      toast.error("Password is mandatory");
      return false;
    }

    await axios.post(`${Backend_URL}/api/customer/login`, {
      CustomerEmail: formData.Email,
      CustomerPassword: formData.Password
    }, { withCredentials: true })
      .then(function (response) {
        if (response.data.message == "Successfully Login") {
          localStorage.setItem('Customer_Email', response.data.result.email);
          localStorage.setItem('Customer_Avatar', response.data.result.avatar);
          localStorage.setItem('Customer_FullName', response.data.result.firstName);
          navigate("/");
        }
      })
      .catch(function (error) {
        if (error.response.data == "Email or password is incorrect") {
          toast.error("Email or password is incorrect");
        }

        if (error.response.data == "Email not found") {
          toast.error("Email not found");
        }

        if (error.response.data == "Password is required") {
          toast.error("Password is required");
        }

        if (error.response.data == "Email is required") {
          toast.error("Email is required");
        }
      })

  }
  return (
    <div className="w-screen min-h-screen flex bg-gray-50">

      {/* Left Section */}
      <div className="w-full sm:w-3/5 flex items-center justify-center px-6 sm:px-12 py-12">

        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">

          {/* Heading */}
          <h1 className="text-3xl font-bold mb-8">
            <span className="text-red-500">Daily Delight</span>
            <span className="text-black"> / Your Mart</span>
          </h1>

          {/* Inputs */}
          <div className="space-y-6">
            <input
              type="text"
              placeholder="Email"
              className="w-full border-b py-2 focus:outline-none focus:border-red-500 transition"
              onChange={ (e) =>{ setformData({...formData, Email: e.target.value}) } }
              value={formData.Email}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border-b py-2 focus:outline-none focus:border-red-500 transition"
              onChange={ (e) =>{ setformData({...formData, Password: e.target.value}) } }
              value={formData.Password}
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-8">
            <button
              type="button"
              onClick={SubmitDetails}
              className="flex-1 py-2 border rounded-lg hover:bg-gray-800 hover:text-white transition click-effect"
            >
              Login
            </button>

            <Link to="/signup" className="flex-1">
              <button
                type="button"
                className="w-full py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-900 transition click-effect"
              >
                Register
              </button>
            </Link>
          </div>

          {/* Support Section */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-14 text-center">

            <div className="space-y-2">
              <img src={img1} alt="Technical Support" className="mx-auto w-12" />
              <p className="text-sm font-semibold">Technical Support</p>
            </div>

            <div className="space-y-2">
              <img src={img2} alt="Inquiry Service" className="mx-auto w-12" />
              <p className="text-sm font-semibold">Inquiry Service</p>
            </div>

            <div className="space-y-2">
              <img src={img3} alt="Sales & Events" className="mx-auto w-12" />
              <p className="text-sm font-semibold">Sales & Events</p>
            </div>

            <div className="space-y-2">
              <img src={img4} alt="Download Center" className="mx-auto w-12" />
              <p className="text-sm font-semibold">Download Center</p>
            </div>

          </div>

        </div>
      </div>

      {/* Right Image Section */}
      <div
        className="hidden sm:block sm:w-2/5 bg-cover bg-center"
        style={{ backgroundImage: `url(${Poster})` }}
      />
      <Toaster />
    </div>
  )
}
