import axios from 'axios';
import Poster from '../../assets/Images/pexels-airamdphoto-20873207.jpg'
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Backend_URL } from '../../utils/Constant.js';

export default function SignUp() {

  const navigate = useNavigate();

  const [formData, setformData] = useState({
    Full_Name: "",
    Phone_Number: "",
    Email: "",
    OTP: "",
    Password: "",
    Privacy_policy: false,
    Terms: false,
    EmailVariefy: false,
  });
  const [buttonDisable, setbuttonDisable] = useState({
    ConfirmButton: true,
    VerifyButton: true,
    SignUpButton: true,
  });

  const [regPattern , setregPattern] = useState({
    FulL_Name_Rule: /^[A-Za-z]+(?:\s[A-Za-z]+)*$/,
    Phone_Number_Rule: /^(?:\+91|91)?[6-9]\d{9}$/,
    Email_Rule: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    OTP_Rule: /^\d{6}$/,
    Password_Rule: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  })


  // start js code here
  async function SubmitForm() {

    if(!regPattern.FulL_Name_Rule.test(formData.Full_Name)){
      toast.success("Full Name is mandatory !!!")
      return false
    }

    if(!regPattern.Phone_Number_Rule.test(formData.Phone_Number)){
      toast.success("Phone Number is mandatory !!!")
      return false
    }

    if(!regPattern.Email_Rule.test(formData.Email)){
      toast.success("Email is mandatory !!!")
      return false
    }

    if(!regPattern.Password_Rule.test(formData.Password)){
      toast.success("Password is mandatory !!!")
      return false
    }


    await axios.post(`${Backend_URL}/api/customer/register`, {
      CustomerName: formData.Full_Name,
      CustomerNumber: formData.Phone_Number,
      CustomerEmail: formData.Email,
      CustomerPassword: formData.Password,
      EmailVariefy: formData.EmailVariefy
    })
      .then(function (response) {
          if(response.data.message == "Customer Created"){
            toast.success("Account Created !!!");
            navigate("/signin");
          }
      })
      .catch(function (error) {
        if (error.response.data == "Customer Name is mandatory") {
          toast.error("Customer Name is mandatory");
        }
        if (response.data == "Customer Number is mandatory") {
          toast.error("Customer Number is mandatory");
        }
        if (response.data == "Customer Email is mandatory") {
          toast.error("Customer Email is mandatory");
        }

        if (error.response.data == "Customer Password is mandatory") {
          toast.error("Customer Password is mandatory");
        }
        if (response.data == "Please Verify Email First") {
          toast.error("Please Verify Email First");
        }
        if (response.data == "Customer Existed") {
          toast.error("Customer Existed");
        }
        if (response.data == "Customer Existed") {
          toast.error("Customer Existed");
        }
      })

  }

  async function sendOtp() {

    setbuttonDisable({ ...buttonDisable, ConfirmButton: true });

    await axios.post(`${Backend_URL}/api/customer/sendRegisterOtp`, { CustomerEmail: formData.Email })
      .then(function (response) {
        if (response.data.message == "Email is send") {
          toast.success('OTP Send !!!');
        }
      })
      .catch(function (error) {
        setbuttonDisable({ ...buttonDisable, ConfirmButton: false });
          if(error.response.data == "Customer is already exist"){
            toast.error('Customer is already exist !!!')
          }

          if(error.response.data == "Email is required"){
            toast.error('Email is required !!!')
          }
      })
  }

  async function verifyOTP() {

    setbuttonDisable({ ...buttonDisable, VerifyButton: true });

    await axios.post(`${Backend_URL}/api/customer/variefyOTP`, { CustomerEmail: formData.Email , CustomerOTP: formData.OTP})
      .then(function (response) {
        if (response.data.message == "Variefy Email") {
          toast.success("Email is verified !!!")
        }
        setformData({ ...formData , EmailVariefy: true })
        setbuttonDisable({ ...buttonDisable, SignUpButton: false });
      })
      .catch(function (error) {
        setbuttonDisable({ ...buttonDisable, VerifyButton: false });
        if (error.response.data == "Email is not variefy") {
          toast.error("Email is not Verify")
        }

        if (error.response.data == "Email is required") {
          toast.error("Email is required !!!")
        }

        if (error.response.data == "OTP is required") {
          toast.error("OTP is required !!!")
        }
      })
  }

  return (
    <>
      <div className="w-screen h-screen flex bg-gray-50">
        {/* Left Form Section */}
        <div className="w-full sm:w-3/5 flex items-center justify-center px-6 sm:px-12">

          <div className="w-full max-w-lg bg-white p-8 sm:p-12 rounded-xl shadow-lg">

            <h1 className="text-2xl sm:text-4xl font-bold mb-2">
              Welcome to <span className="text-red-500">Daily Delight</span>
            </h1>

            <p className="text-gray-600 text-lg sm:text-xl mb-6">
              Create your account
            </p>

            <form className="space-y-6">

              <input
                type="text"
                placeholder="Full Name"
                className="w-full border-b py-2 focus:outline-none focus:border-red-500 transition"
                onChange={(e) => { setformData({ ...formData, Full_Name: e.target.value }) }}
                value={formData.Full_Name}
              />

              <input
                type="text"
                placeholder="Phone Number"
                className="w-full border-b py-2 focus:outline-none focus:border-red-500 transition"
                onChange={(e) => {setformData({ ...formData, Phone_Number: e.target.value })}}
                value={formData.Phone_Number}
              />

              <div className="flex gap-3 items-end">
                <input
                  type="text"
                  placeholder="Email"
                  className="flex-1 border-b py-2 focus:outline-none focus:border-red-500 transition"
                  onChange={(e) => { setformData({ ...formData, Email: e.target.value })
                    if (regPattern.Email_Rule.test(e.target.value)) {
                      setbuttonDisable({ ...buttonDisable, ConfirmButton: false })
                    } else {
                      setbuttonDisable({ ...buttonDisable, ConfirmButton: true })
                    }

                  }}
                  value={formData.Email}
                />
                <button
                  type="button"
                  onClick={sendOtp}
                  className="border px-4 py-1 rounded-md hover:bg-gray-700 hover:text-white transition click-effect disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
                  disabled={buttonDisable.ConfirmButton}
                >
                  Confirm
                </button>
              </div>

              <div className="flex gap-3 items-end">
                <input
                  type="text"
                  placeholder="OTP"
                  className="flex-1 border-b py-2 focus:outline-none focus:border-red-500 transition"
                  onChange={(e) => { setformData({ ...formData, OTP: e.target.value })
                  if(regPattern.OTP_Rule.test(e.target.value)){
                    setbuttonDisable({ ...buttonDisable, VerifyButton: false })
                  }else{
                    setbuttonDisable({ ...buttonDisable, VerifyButton: true })
                  }
                  }}
                  value={formData.OTP}
                />
                <button
                  type="button"
                  onClick={verifyOTP}
                  className="border px-4 py-1 rounded-md hover:bg-gray-700 hover:text-white transition click-effect disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
                  disabled={buttonDisable.VerifyButton}
                >
                  Verify
                </button>
              </div>

              <input
                type="password"
                placeholder="Password"
                className="w-full border-b py-2 focus:outline-none focus:border-red-500 transition"
                onChange={(e) => { setformData({ ...formData, Password: e.target.value }) }}
                value={formData.Password}
              />

              <div className="space-y-2 text-sm text-gray-500">
                <label className="flex gap-2 items-center">
                  <input type="checkbox" value={formData.Privacy_policy} onChange={(e) => { setformData({ ...formData, Privacy_policy: e.target.value }) }} />
                  I accept the <span className="underline cursor-pointer">privacy policy</span>
                </label>

                <label className="flex gap-2 items-center">
                  <input type="checkbox" value={formData.Terms} onChange={(e) => { setformData({ ...formData, Terms: e.target.value }) }} />
                  I agree to the <span className="underline cursor-pointer">terms & conditions</span>
                </label>
              </div>

              <button
                type="button"
                onClick={SubmitForm}
                className="w-full mt-6 py-2 border rounded-lg text-lg hover:bg-gray-700 hover:text-white transition click-effect disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
                disabled={buttonDisable.SignUpButton}
              >
                Sign Up
              </button>

            </form>
          </div>
        </div>

        {/* Right Image Section */}
        <div
          className="hidden sm:block sm:w-2/5 bg-cover bg-center"
          style={{ backgroundImage: `url(${Poster})` }}
        />
      </div>
      <Toaster />
    </>
  )
}
