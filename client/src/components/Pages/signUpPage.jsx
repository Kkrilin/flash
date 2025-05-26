import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { requestConfig, userSignUpUrl } from "../../helper/api";
import { useNavigate } from "react-router-dom";

export default function SignUP() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "mobileNumber") {
      const mobileRegex = /^[0-9]*$/;
      if (!mobileRegex.test(value)) {
        return;
      }
      if (value.length === 11) {
        toast.error("only 10 digit allow");
        return;
      }
    }

    setFormData((prv) => {
      return {
        ...prv,
        [name]: value,
      };
    });
  };

  const signUpUser = async () => {
    try {
      const response = await axios.post(userSignUpUrl, formData, requestConfig);
      localStorage.setItem("token", response.data.token);
      navigate("/user/activity");
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) {
      toast.error("name is empty");
      return;
    }
    if (!formData.email) {
      toast.error("email is empty");
      return;
    }
    if (!formData.mobileNumber) {
      toast.error("mobileNumber is empty");
      return;
    }
    if (!formData.password || formData.password < 6) {
      toast.error("password is empty");
      return;
    }
    signUpUser();
  };

  return (
    <div className="flex justify-center items-center h-full ">
      <div className=" px-10 py-4 bg-neutral-800 rounded-md text-white">
        <h1 className="text-2xl text-center py-5">Sign Up</h1>
        <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-4">
          <label className="flex flex-col gap-2">
            <h1 className="strike">Name</h1>
            <input
              onChange={(e) => handleChange(e)}
              value={formData.name || ""}
              name="name"
              className=" px-2 outline-0 bg-neutral-900 border-amber-700  h-10 rounded-md active:border-amber-950"
              type="text"
            />
          </label>
          <label className="flex flex-col gap-2">
            <h1 className="strike">Email</h1>
            <input
              onChange={(e) => handleChange(e)}
              value={formData.email || ""}
              name="email"
              className=" px-2 outline-0 bg-neutral-900 border-amber-700  h-10 rounded-md active:border-amber-950"
              type="email"
            />
          </label>
          <label className="flex flex-col gap-2">
            <h1 className="strike">mobileNumber</h1>
            <input
              onChange={(e) => handleChange(e)}
              value={formData.mobileNumber || ""}
              name="mobileNumber"
              className=" px-2 outline-0 bg-neutral-900 border-amber-700  h-10 rounded-md active:border-amber-950"
              type="text"
            />
          </label>
          <label className="flex flex-col gap-2">
            <h1 className="strike">Password</h1>
            <input
              onChange={(e) => handleChange(e)}
              value={formData.password || ""}
              name="password"
              className=" px-2 outline-0 bg-neutral-900 border-amber-700  h-10 rounded-md active:border-amber-950"
              type="password"
            />
          </label>
          <button className="bg-neutral-900 text-center py-2 rounded-md capitalize hover:bg-neutral-950">
            sign up
          </button>
        </form>
        <div>
          <h1>
            Already have an Account?
            <Link className="text-blue-700 px-2 capitalize " to="/signin">
              sign In
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
}
