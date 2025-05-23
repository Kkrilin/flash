import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { requestConfig, userSignInUrl } from "../../helper/api";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prv) => {
      return {
        ...prv,
        [name]: value,
      };
    });
  };

  const signInUser = async () => {
    try {
      const response = await axios.post(userSignInUrl, formData, requestConfig);
      localStorage.setItem("token", response.data.token);
      navigate("/user/profile");
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email) {
      toast.error("email is empty");
      return;
    }
    if (!formData.password || formData.password < 6) {
      toast.error("password is empty");
      return;
    }
    signInUser();
  };

  return (
    <div className="flex justify-center items-center h-full ">
      <div className=" px-10 py-4 bg-amber-600 rounded-md text-white">
        <h1 className="text-2xl text-center py-5">Sign In</h1>
        <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-4">
          <label className="flex flex-col gap-2">
            <h1 className="strike">Email</h1>
            <input
              onChange={(e) => handleChange(e)}
              name="email"
              value={formData.email}
              className=" px-2 outline-0 bg-amber-900 border-amber-700  h-10 rounded-md active:border-amber-950"
              type="email"
            />
          </label>
          <label className="flex flex-col gap-2">
            <h1 className="strike">Password</h1>
            <input
              onChange={(e) => handleChange(e)}
              name="password"
              value={formData.password}
              className=" px-2 outline-0 bg-amber-900 border-amber-700  h-10 rounded-md active:border-amber-950"
              type="password"
            />
          </label>
          <button
            type="submit"
            className="bg-amber-950 text-center py-2 rounded-md  capitalize"
          >
            sign in
          </button>
        </form>
        <div>
          <h1>
            Don't have an Account?
            <Link className="text-blue-700 px-2 capitalize" to="/signup">
              Singup
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
}
