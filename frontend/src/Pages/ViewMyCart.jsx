import react, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ViewMyCart = () => {
  const status = "accept";
  const { id } = useParams();
  const [selectedStatus, setSelectedStatus] = useState(status);
  const [userDataArray, setUserDataArray] = useState([]);
  const [address, setAddress] = useState({})
  const [data, setData] = useState({})
  const [name, setName] = useState('')

  useEffect(() => {
    const loadData = async () => {
      console.log("Sagar chi Id :", id)
      try {
        const response = await fetch(`http://localhost:8000/api/view-cart-details-ngo/${id}`);
        console.log(response.data)
        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
        }

        const data = await response.json();
        console.log(data)
        setData(data)
        setName(data.restaurantName)
        setUserDataArray(data.foodDescription);
        setAddress(data.restaurantAddress)
        console.log("Data:", data.status);
      } catch (error) {
        console.error("Fetch error:", error.message);
      }
    };

    loadData();
  }, []);

  const handleDelivered = async (id) =>{

      try {
          const response = await fetch(`http://localhost:8000/api/delivery/${id}`);
          
          if (!response.ok) {
              const errorMessage = await response.text();
              throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
          }
          navigate(`/displayResult/${userData._id}`)
      } catch (error) {
          console.error("Fetch error:", error.message);
      }
  }

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
  return (
    <>
      <div className="items-center max-w-3xl text-[#000] mx-auto mt-6 p-4 bg-gray-600 rounded-lg shadow-lg">
        <h2 className="text-lg mb-2 font-bold">My Cart</h2>
        <div>
          <div className="items-center max-w-3xl mx-auto  p-4 bg-white rounded-lg shadow-lg">
            <h2 className="font-bold text-2xl color-[#000] text-center">
              {name}
            </h2>
            <div className="flex row">
              <p className="font-semibold">Address :-&nbsp;</p>
              <p>{`${address.city} , ${address.district}`}</p>
            </div>
            <div className="flex row">
              <p className="font-semibold">Phone No :-&nbsp;</p>
              <p>{data.restaurantPhone}</p>
            </div>
            <div className="flex row ">
              <div className="flex font-semibold row items-end ">
                Status :- &nbsp;
                <p style={{ color: getCurrentStatus(status) }}>
                  {data.status}
                </p>
              </div>
            </div>
          </div>
          <div className="items-center max-w-3xl mx-auto mt-4 p-4 bg-white rounded-lg shadow-lg">
            <div className="">
              <h4 className="font-bold text-lg">WHAT INSIDE THE KITCHEN ?</h4>
            </div>
            <div className="flex row justify-around mt-2">
              <p className="text-xs text-[#d44c4c] font-medium">LIST ITEMS</p>
              <p className="text-xs text-[#d44c4c] font-medium">QUANTITY</p>
            </div>
            {userDataArray.map((item, index) => (
                    <div className="flex row justify-around mt-2">
                        <p className="text-base font-semibold ">{item.name}</p>
                        <p className="text-base font-semibold">{item.quantity}</p>
                    </div>
                ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-2">
        <div className="text-center">
          <h2 className="mb-4">Is your food delivered?</h2>
          <button className="w-40 px-4 py-2 rounded-full shadow-gray-600 shadow-md bg-[#50C878] active:shadow-none text-white text-md"
          onClick={() =>handleDelivered(data.ngo_id)}
          >
            Yes
          </button>
        </div>
      </div>
    </>
  );
};

export default ViewMyCart;
