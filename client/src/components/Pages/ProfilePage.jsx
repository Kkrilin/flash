import React, { useState } from "react";
import { useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import toast from "react-hot-toast";
import axios from "axios";
import { requestConfig, userBaseUrl } from "../../helper/api";
import { setProfileData } from "../../redux/slice/profileSlice";
import { useDispatch } from "react-redux";
import { emptyProfileField } from "../../helper/utils";

export default function ProfilePage() {
  const [isEdit, setIsEdit] = useState(false);
  const profile = useSelector((state) => state.profile);
  const emptyField = emptyProfileField(profile);
  const dispatch = useDispatch();
  const [profilePayloadData, setProfilePayloadData] = useState({
    gender: "male",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "age" && value) {
      const number = Number(value);
      if (!Number.isInteger(number) || number < 1 || number > 99) {
        toast.error("age must be  between 1 and 99");
        return;
      }
    }

    if (name === "aadhar_number") {
      const aadharRegex = /^[0-9]*$/;
      if (!aadharRegex.test(value)) {
        return;
      }
      if (value.length > 12) {
        return;
      }
    }
    setProfilePayloadData((prv) => {
      return {
        ...prv,
        [name]: value,
      };
    });
  };

  const updateUserData = async () => {
    try {
      const response = await axios.post(
        userBaseUrl,
        profilePayloadData,
        requestConfig
      );
      dispatch(setProfileData(response.data.user));
      setIsEdit(false);
    } catch (err) {
      toast.error(err.response?.data?.message || '"something went Wrong"');
    }
  };

  const handleSubmit = () => {
    if (!profilePayloadData.gender) {
      toast.error("gender is mandatory");
      return;
    }
    if (!profilePayloadData.age) {
      toast.error("age is mandatory");
      return;
    }
    if (!profilePayloadData.address) {
      toast.error("address is mandatory");
      return;
    }
    if (!profilePayloadData.aadhar_number) {
      toast.error("Aadhar number is mandatory");
      return;
    }
    if (
      profilePayloadData.aadhar_number &&
      profilePayloadData.aadhar_number.length !== 12
    ) {
      toast.error("aadhar number must be 12 number");
      return;
    }
    updateUserData();
  };

  console.log("profilePayloadData", profilePayloadData);

  return (
    <div className=" w-full flex justify-center  items-center">
      <div className="px-80 py-20 flex flex-col gap-10 bg-neutral-800 rounded-md">
        <div className="flex gap-3 items-center">
          <Avatar
            variant="circular"
            sx={{
              width: "100px",
              height: "100px",
              fontSize: "2rem",
              textTransform: "capitalize",
            }}
          >
            {profile.name && profile.name[0]}
          </Avatar>
          <h1 className="text-2xl capitalize font-medium">{profile.name}</h1>
        </div>
        <div className="profile_data_container flex flex-col px-10 gap-6 ">
          <div>
            <span>name: </span>
            <span>{profile.name} </span>
          </div>
          <div>
            <span>email: </span>
            <span>{profile.email} </span>
          </div>
          <div>
            <span>mobileNumber: </span>
            <span>{profile.mobile_number} </span>
          </div>
          <div>
            <span>gender: </span>
            {!profile.gender && isEdit && (
              <select
                onChange={(e) => handleInputChange(e)}
                className="border px-2 w-40 h-8"
                name="gender"
                id=""
              >
                <option value="male">male</option>
                <option value="female">female</option>
              </select>
            )}
            {!isEdit && <span>{profile.gender || "-"} </span>}
          </div>
          <div>
            <span>age(in yr): </span>
            {!profile.age && isEdit && (
              <input
                name="age"
                onChange={(e) => handleInputChange(e)}
                value={profilePayloadData.age || ""}
                className="border px-2 w-40"
              />
            )}
            {!isEdit && <span>{profile.age || "-"} </span>}
          </div>
          <div>
            <span>aadhar: </span>
            {!profile.aadhar_number && isEdit && (
              <input
                name="aadhar_number"
                onChange={(e) => handleInputChange(e)}
                value={profilePayloadData.aadhar_number || ""}
                className="border px-2 w-40"
              />
            )}
            {!isEdit && <span>{profile.aadhar_number || "-"} </span>}
          </div>
          <div>
            <span>address: </span>
            {!profile.address && isEdit && (
              <textarea
                name="address"
                onChange={(e) => handleInputChange(e)}
                value={profilePayloadData.address}
                className="border px-2 w-40"
              />
            )}
            {!isEdit && <span>{profile.address || "-"} </span>}
          </div>
        </div>
        {emptyField.length > 0 && (
          <div className="flex justify-end px-10 gap-4">
            <button
              style={{}}
              onClick={() => setIsEdit(true)}
              className="py-2 px-4 bg-amber-950 text-white rounded-md"
            >
              edit
            </button>
            <button
              onClick={() => handleSubmit()}
              style={{
                cursor: !isEdit ? "not-allowed" : "pointer",
              }}
              disabled={!isEdit}
              className="py-2 px-4 bg-amber-950 text-white rounded-md"
            >
              save
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
