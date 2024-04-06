import react, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MyCart = () => {
  const navigate = useNavigate()
  const status = "accept";
  const userData = JSON.parse(localStorage.getItem('userData'));
  const [selectedStatus, setSelectedStatus] = useState(status);
  const [userDataArray, setUserDataArray] = useState([]);
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

  function handleViewOption() {
    navigate('/viewcart')
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/ngoCart/${userData._id}`);
        console.log(response.data)

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

  const handleCheck = (id) =>{
    console.log("ID is ",id)
    navigate(`/ViewMyCart/${id}`)
  }
  return (
    <>
      {userDataArray.map((user, index) => (
        <div key={index} className="flex row justify-between items-center max-w-3xl mx-auto mt-10 p-4 bg-white rounded-lg shadow-lg">
          <div>
            <div className="flex row">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 "
                color={"#561c24"}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
                />
              </svg>
              &nbsp;
              <h2 className="text-xl font-medium">{user.restaurantName}</h2>
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
              {user.restaurantAddress.city}
            </div>
            <div className="flex row mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
                color={"#561c42"}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
              &nbsp;
              <div className="flex row items-end ">
                Status :- &nbsp;
                <p style={{ color: getCurrentStatus(selectedStatus) }}>
                  {user.status}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-end ">
            <button
              type="submit"
              onClick={() =>handleCheck(user.id)}
              className="w-1/10 mx-auto shadow-gray-600 shadow-md p-2 bg-[#561c42] rounded-md text-white mt-5 active:shadow-none "
            >
              Know More
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default MyCart;
