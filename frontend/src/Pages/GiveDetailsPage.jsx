import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


function GiveDetailsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, SetPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setRole] = useState("");
  const [address, setAddress] = useState({
    localAddress: "",
    district: "",
    taluka: "",
    pinCode: "",
    city: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !userType || !address.district || !address.taluka || !address.pinCode || !address.city) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (!/^\d{6}$/.test(address.pinCode)) {
      toast.error("Please enter a valid 6-digit zip code.");
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      toast.error("Please enter a valid Phone Number")
    }
    const formData = {
      name,
      email,
      phone,
      password,
      userType,
      address,
    };
    console.log(formData);
    try {
      const response = await axios.post("http://localhost:8000/api/signup", formData);
      console.log("User created:", response.data);
      localStorage.removeItem('userData');
      
      // Handle success (e.g., navigate to home page)
    } catch (error) {
      // Handle error
      console.error("Error creating user:", error.response ? error.response.data.message : error.message);
    }
  };

  const handleDistrictChange = (e) => {
    const districtValue = e.target.value;
    // Simulate fetching taluka options based on selected district
    const talukaOptions = fetchTalukaOptions(districtValue);
    setAddress({
      district: districtValue,
      taluka: "", // Reset taluka value when district changes
      pinCode: "",
      city: "",
    });
  };

  const handleTalukaChange = (e) => {
    setAddress({
      ...address,
      taluka: e.target.value,
    });
  };

  const fetchTalukaOptions = (district) => {
    // Simulate fetching taluka options based on district
    // Replace this with actual API call
    switch (district) {
      case "Ratnagiri":
        return [
          "Mandangad",
          "Dapoli",
          "Khed",
          "Chiplun",
          "Guhagar",
          "Sangameshwar",
          "Ratnagiri",
          "Lanja",
          "Rajapur",
        ];
      case "Sindhudurg":
        return [
          "Devgad",
          "Dodamarg",
          "Kankavli",
          "Kudal",
          "Malvan",
          "Savantvadi",
          "Vaibhavvadi",
          "Vengurla",
        ];
      default:
        return [];
    }
  };

  return (
    <div className="w-full h-screen">
      <div className="w-full sm:my-10 ">
        <h2 className="w-full text-center font-semibold text-[2vw] text-[#386a76]">
          Give details
        </h2>
      </div>
      <div className="w-full h-5/6  ">
        <form
          onSubmit={handleSubmit}
          className="w-full gap-12 grid grid-cols-2 sm:w-8/12 sm:mx-auto"
        >
          <input
            type="text"
            placeholder="Name Or Restaurant Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mx-auto w-8/12 h-10 border-2 border-[#386a76] outline-none rounded-full pl-4 placeholder-[#386a76]"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mx-auto w-8/12 h-10 border-2 border-[#386a76] outline-none rounded-full pl-4 placeholder-[#386a76]"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mx-auto w-8/12 h-10 border-2 border-[#386a76] outline-none rounded-full pl-4 placeholder-[#386a76]"
          />
          <input
            type="text"
            placeholder="Local Address"
            value={address.localStorage}
            onChange={(e) => setAddress({ ...address, localAddress: e.target.value })}
            className="mx-auto w-8/12 h-10 border-2 border-[#386a76] outline-none rounded-full pl-4 placeholder-[#386a76]"
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => SetPhoneNumber(e.target.value)}
            className="mx-auto w-8/12 h-10 border-2 border-[#386a76] outline-none rounded-full pl-4 placeholder-[#386a76]"
          />
          <select
            value={userType}
            onChange={(e) => setRole(e.target.value)}
            className="mx-auto w-8/12 h-10 border-2 border-[#386a76] outline-none rounded-full pl-4"
          >
            <option value="">Select Role</option>
            <option value="Restaurant">Restaurant</option>
            <option value="NGOs">NGOs</option>
            <option value="Volunteer">Volunteer</option>
          </select>
          <select
            value={address.district}
            onChange={handleDistrictChange}
            className="mx-auto w-8/12 h-10 border-2 border-[#386a76] outline-none rounded-full pl-4"
          >
            <option value="">Select District</option>
            <option value="Ratnagiri">Ratnagiri</option>
            <option value="Sindhudurg">Sindhudurg</option>
          </select>
          <select
            value={address.taluka}
            onChange={handleTalukaChange}
            className="mx-auto w-8/12 h-10 border-2 border-[#386a76] outline-none rounded-full pl-4"
          >
            <option value="">Select Taluka</option>
            {address.district &&
              fetchTalukaOptions(address.district).map((taluka, index) => (
                <option key={index} value={taluka}>
                  {taluka}
                </option>
              ))}
          </select>
          <input
            type="text"
            placeholder="City"
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
            className="mx-auto w-8/12 h-10 border-2 border-[#386a76] outline-none rounded-full pl-4 placeholder-[#386a76]"
          />
          <input
            type="text"
            placeholder="Pincode Code"
            value={address.pinCode}
            onChange={(e) =>
              setAddress({ ...address, pinCode: e.target.value })
            }
            className="mx-auto w-8/12 h-10 border-2 border-[#386a76] outline-none rounded-full pl-4 placeholder-[#386a76]"
          />
          <Toaster />
          <button
            type="submit"
            className="w-2/12 py-2 rounded-full shadow-gray-600 shadow-md mx-auto bg-[#386a76] col-start-1 col-end-3 active:shadow-none text-white"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default GiveDetailsPage;
