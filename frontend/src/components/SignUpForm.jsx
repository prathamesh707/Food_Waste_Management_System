import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }
    // try {
    //   const userCredential = await createUserWithEmailAndPassword(
    //     auth,
    //     email,
    //     password
    //   );
    //   console.log("User created:", userCredential.user);
    //   navigate("/");
    // } catch (error) {
    //   setError(error.message);
    // }

    const loginData = {
      email,
      password

    }
    try {
      const reposne = await axios.post("http://localhost:8000/api/signin", loginData);
      if (reposne) {
        console.log("User Succfully Login", reposne.data);
        // Store user information in localStorage
        localStorage.setItem('userData', JSON.stringify(reposne.data));
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = () => {
    navigate("/registerPage");
  };
  return (
    <div className="w-full h-full pt-10   overflow-hidden relative">
      <div className="w-full my-4">
        <h2 className="text-center text-[4vw] sm:text-[2vw] font-semibold text-[#084c6a]">
          Login
        </h2>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-8/12 mx-auto flex flex-col mt-10 gap-5 text-black, "
      >
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full h-10 bg-transparent border-2 border-[#386a76] outline-none rounded-full pl-2 bg-white placeholder-[#386a76]"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full h-10 bg-transparent border-2 border-[#386a76] outline-none rounded-full pl-2 bg-white placeholder-[#386a76]"
        />
        <Toaster />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-6/12 mx-auto shadow-gray-600 shadow-md py-2 bg-[#347a99] rounded-full text-white mt-5 active:shadow-none"
        >
          Login
        </button>
      </form>
      <h2 className="w-full text-center font-semibold absolute bottom-2">
        New to Website?&nbsp;
        <button onClick={handleRegister} className="text-blue-500 underline">
          Register
        </button>
      </h2>
    </div>
  );
}

export default SignUpForm;
