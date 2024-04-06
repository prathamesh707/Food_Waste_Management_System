import react, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

const VolunteerDisplay = () => {
  const status = "accept";
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState(status);
  const getCurrentStatus = (status) => {
    switch (status) {
      case "pending":
        return "#FFA500";
      case "accept":
        return "#008000";
      case "deliver":
        return "#0000FF";
      default:
        return "#000000";
    }
  };
  useEffect(() => {
    const loadData = async () => {
      console.log(userData._id);
      try {
        const response = await fetch(`http://localhost:8000/api/filter-for-restaurnt/${userData._id}`);

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
        }

        const data = await response.json();
        setUserDataArray(data);
        console.log("Data:", data);
      } catch (error) {
        console.error("Fetch error:", error.message);
      }
    };

    loadData();
  }, []);
  const handleVolunteer = () => {
    navigate("/detaildata");
  };
  return (
    <>
      <div className="flex justify-between items-center max-w-3xl mx-auto mt-10 p-4 bg-white rounded-lg shadow-lg">
        {/* Left side content */}
        <div className="flex flex-col">
          <p className="text-sm mb-2 text-gray-500 font-bold">FROM</p>
          <div>
            <div className="flex row">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
                color={"#561c24"}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
                />
              </svg>
              &nbsp;
              <h2 className="text-xl font-medium ">
                Ajay Valapkars restaurants
              </h2>
            </div>
            <div className="flex row mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
                color={"#561c24"}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
              &nbsp;
              <p>khed, ratnagiri</p>
            </div>
            <div className="flex row mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
                color={"#521c42"}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                />
              </svg>
              &nbsp;
              <div className="flex row items-end ">Phone:8778967560 </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <p className="text-sm mb-2 text-gray-500 font-bold">To</p>
          <div>
            <div className="flex row">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
                color={"#561c24"}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
                />
              </svg>
              &nbsp;
              <h2 className="text-xl font-medium ">
                Ajay Valapkars restaurants
              </h2>
            </div>
            <div className="flex row mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
                color={"#561c24"}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
              &nbsp;
              <p>khed, ratnagiri</p>
            </div>
            <div className="flex row mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
                color={"#521c42"}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                />
              </svg>
              &nbsp;
              <div className="flex row items-end ">Phone:8778967560 </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center mt-2">
          <div onClick={handleVolunteer} className="text-center">
            <button className="w-40 px-4 py-2 rounded-full shadow-gray-600 shadow-md bg-[#50C878] active:shadow-none text-white text-md">
              Know More
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default VolunteerDisplay;
