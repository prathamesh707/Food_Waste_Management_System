
import react, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Request = () => {
    const { id } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [userDataArray, setUserDataArray] = useState([]);
    const [deliveryOption, setDeliveryOption] = useState("");
    const [address, setAddress] = useState({})
    const [name, setName] = useState('')
    // const [selectedStatus, setSelectedStatus] = useState(status);
    const [status, setStatus] = useState('')
    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem('userData'));

    console.log('here', userDataArray)
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

    const handleReject = async () => {

        try {
            const response = await fetch(`http://localhost:8000/api/delete/${id}`);

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
            }
            navigate(`/displayResult/${userData._id}`)
        } catch (error) {
            console.error("Fetch error:", error.message);
        }
    };

    const handleAccept = () => {
        setShowModal(true)

    }

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleDeliveryOption = (option) => {
        setDeliveryOption(option);
    };

    useEffect(() => {
        const loadData = async () => {
            console.log("Sagar chi Id :", id)
            try {
                const response = await fetch(`http://localhost:8000/api/view-details-restaurnt/${id}`);

                if (!response.ok) {
                    const errorMessage = await response.text();
                    throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
                }

                const data = await response.json();
                setName(data.restaurantName)
                setUserDataArray(data.fooDescription);
                setAddress(data.restaurantAddress)
                setStatus(data.status)
                console.log("Data:", data.status);
            } catch (error) {
                console.error("Fetch error:", error.message);
            }
        };

        loadData();
    }, []);
    const handleSubmit = async () => {
        const formData = {
            id: id,
            ngo_id: userData._id,
            deliveryType: deliveryOption
        };
        if (!deliveryOption == '') {

            try {

                const response = await fetch(`http://localhost:8000/api/accept-ngo/${id}/${userData._id}/${deliveryOption}`);

                if (!response.ok) {
                    const errorMessage = await response.text();
                    throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
                }

            } catch (error) {
                console.error("Fetch error:", error.message);
            }
            navigate(`/displayResult/${userData._id}`)
            console.log("Selected delivery option:", deliveryOption);
            setShowModal(false);
        }
        // Close modal after submission
    };

    return (
        <>
            <div className="items-center max-w-3xl mx-auto mt-10 p-4 bg-white rounded-lg shadow-lg">
                <h2 className="font-bold text-2xl color-[#212121] text-center">
                    {name}
                </h2>
                <div className="flex row">
                    <p className="font-semibold">Address :-&nbsp;</p>
                    <p>{address.city}</p>
                </div>
                <div className="flex row">
                    <p className="font-semibold">Phone No :-&nbsp;</p>
                    <p>6875697689</p>
                </div>
                <div className="flex row ">
                    <div className="flex font-semibold row items-end ">
                        Status :- &nbsp;
                        <p style={{ color: getCurrentStatus(status) }}>
                            {status}
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
            <div className="flex justify-end w-80  items-end fixed bottom-10 right-10">
                {userData.userType === 'NGOs' ? (
                    <button
                        onClick={handleAccept}
                        className="w-40 px-6 py-2 rounded-full shadow-gray-600 shadow-md mx-auto bg-[#50C878] col-start-1 col-end-3 active:shadow-none text-black text-xl "
                    >
                        Accept
                    </button>
                ) : (
                    <button
                        onClick={handleReject}
                        className="w-40 px-6 py-2 rounded-full shadow-gray-600 shadow-md mx-auto bg-[#50C878] col-start-1 col-end-3 active:shadow-none text-black text-xl "
                    >
                        Reject
                    </button>
                )}


            </div>

            {showModal && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Select Delivery Option</h2>
                        <div className="flex justify-between">
                            <button
                                onClick={() => handleDeliveryOption("self")}
                                className={`px-4 py-2 rounded-full mr-4 ${deliveryOption === "self"
                                    ? "bg-[#50C878] text-white"
                                    : "bg-gray-200 text-gray-800"
                                    }`}
                            >
                                Self
                            </button>
                            <button
                                onClick={() => handleDeliveryOption("volunteer")}
                                className={`px-4 py-2 rounded-full mr-4 ${deliveryOption === "volunteer"
                                    ? "bg-[#50C878] text-white"
                                    : "bg-gray-200 text-gray-800"
                                    }`}
                            >
                                Volunteer
                            </button>
                        </div>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={handleCloseModal}
                                className="px-4 py-1 bg-[#FF5733] text-gray-800 rounded-full"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="px-4 py-1 bg-[#50C878] text-white rounded-full ml-4"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Request;
