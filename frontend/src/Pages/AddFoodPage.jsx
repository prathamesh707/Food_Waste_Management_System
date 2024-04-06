import react, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const AddFoodPage = () => {
    const [foodDescription, setInputs] = useState([{ name: "", quantity: "" }]);
    const userData = JSON.parse(localStorage.getItem('userData'));
    const handleAddInput = () => {
      const lastInput = foodDescription[foodDescription.length - 1];
      if (lastInput.name.trim() !== "" && lastInput.quantity.trim() !== "") {
        const newInput = { name: "", quantity: "" };
        setInputs([...foodDescription, newInput]);
        console.log("User submitter calue")
      } else {
        toast.error("Please fill out all fields in the previous input.");
      }
    };
  
    const handleSubmitInput =async () =>{
      console.log("Input List is  :", foodDescription)
      try {
        const formData = {
          restaurnt_id: userData._id,
          foodDescription,
          pickUpTime  :'9.00PM'
  
        };
        const response = await axios.post("http://localhost:8000/api/add-food-donatation", formData);
        
        console.log("Food List Added", response.data);
      } catch (error) {
        // Handle error
        console.error("Error adding food list :", error.response ? error.response.data.message : error.message);
      }
  
    }
  
    const handleInputChange = (index, e) => {
      const { name, value } = e.target;
      const newInputs = [...foodDescription];
      newInputs[index][name] = value;
      setInputs(newInputs);
    };
  
    const handleUnitChange = (index, e) => {
      const { value } = e.target;
      const newInputs = [...foodDescription];
      // newInputs[index]["unit"] = value;
  
      if (value === "count") {
        newInputs[index]["quantity"] = "";
      } else {
        newInputs[index]["quantity"] = `15${value}`;
      }
      setInputs(newInputs);
    };
  

  return (
    <>
      <div className="w-8/12 mx-auto mt-10 ">
        {foodDescription.map((item, index) => (
          <div key={index} className="flex gap-2 mb-2 bg-gray-300 p-4">
            <input
              type="text"
              placeholder="Item name"
              name="name"
              value={item.name}
              onChange={(e) => handleInputChange(index, e)}
              className="w-1/2 h-10 border-2  outline-none rounded-md pl-2 placeholder-[#386a76]"
            />
            <input
              type="number"
              placeholder="Quantity"
              name="quantity"
              value={item.quantity}
              onChange={(e) => handleInputChange(index, e)}
              className="w-1/4 h-10 border-2  outline-none rounded-md pl-2 placeholder-[#386a76]"
            />
            <select
              value={item.unit}
              onChange={(e) => handleUnitChange(index, e)}
              className="w-1/4 h-10 border-2 outline-none rounded-md pl-2 placeholder-[#386a76]"
            >
              <option value="count">Count</option>
              <option value="kg">Kg</option>
              <option value="liter">Liter</option>
            </select>
          </div>
        ))}
        <Toaster />
        <button
          onClick={handleAddInput}
          className="w-2/12 py-2 rounded-full shadow-gray-600 shadow-md mx-auto border-[#561c24] text-[#561c24] col-start-1 col-end-3 active:shadow-none text-white mt-5"
        >
          Add Field
        </button>
      </div>
      <div className="flex justify-end w-80  items-end fixed bottom-10 right-10">
        <button className="w-2/8 p-2 rounded-full shadow-gray-600 shadow-md mx-auto bg-[#561c24] col-start-1 col-end-3 active:shadow-none text-white mt-5"
        onClick={handleSubmitInput}
        >
          Submit

        </button>
      </div>
    </>
  );
};

export default AddFoodPage;
