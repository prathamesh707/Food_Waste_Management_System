const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        require: true,
        type: String,
        trim: true
    },
    email: {
        require: true,
        type: String,
        trim: true,
        validate: {
            validator: (value) => {
                const re = /^[a-zA-Z0-9_.+]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
                return value.match(re);
            },
            message: "Please enter a valide email",
        },
    },
    phone: {
        require: true,
        type: Number,
    },
    password: {
        require: true,
        type: String,
        validate: {
            validator: (value) => {
                const re = /^(?=.\d)(?=.[!@#$%^&])(?=.[a-z])(?=.*[A-Z]).{8,}$/;
                return value.match(re);
            },
            message: "Make sure you'r passowrd contain the combination of the all letters and symbol",
        }
    },
    userType: String,
    address: {
        localAddress: String,
        district: String,
        taluka: String,
        city: String,
        pinCode: Number
    }
});

const foodDonationSchema = mongoose.Schema({
    restaurnt_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    ngo_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    foodDescription: [
        {
            name: String,
            quantity: String
        }
    ],
    createadAt: {
        type: Date,
        default: Date.now()
    },
    pickUpTime: {
        type: String
    },
    status: {
        type: String,
        default: "pending"
    }
})

const ngoCartSchema = mongoose.Schema({
    name: String,
    address: {
        localAddress: String,
        district: String,
        taluka: String,
        city: String,
        pinCode: Number
    },
    phone: Number,
    foodDescription: [
        {
            name: String,
            quantity: String
        }
    ],
    status: String,
    createadAt: {
        type: Date,
        default: Date.now()
    },
    pickUpTime: {
        type: String
    },
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    ngo_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
})

const volunteerCartSchema = mongoose.Schema({
    restaurantName: String,
    restaurantaddress: {
        localAddress: String,
        district: String,
        taluka: String,
        city: String,
        pinCode: Number
    },
    restaurantphone: Number,
    foodDescription: [
        {
            name: String,
            quantity: String
        }
    ],
    ngoName: String,
    ngoAddress: {
        localAddress: String,
        district: String,
        taluka: String,
        city: String,
        pinCode: Number
    },
    ngoPhone: Number,
    status: String,
    createadAt: {
        type: Date,
        default: Date.now()
    },
    pickUpTime: {
        type: String
    },
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    
})

// ngo 660ff9ddadfceaf3c7280c17
// res 660ffa0a1c4dc8edf6d336fa
const User = mongoose.model("User", userSchema);
const foodCollection = mongoose.model("foodDonation", foodDonationSchema);
const ngoCart = mongoose.model("ngoCart", ngoCartSchema);
const volunteerCart = mongoose.model("volunteerCart", volunteerCartSchema);
module.exports = { User, foodCollection, ngoCart, volunteerCart};