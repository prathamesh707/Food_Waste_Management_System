const express = require("express");
const model = require("../models/models");
const userRouter = express.Router();


// add-food-dontation
userRouter.post("/api/add-food-donatation", async(req, res) => {
    try{
        const { restaurnt_id,foodDescription, pickUpTime } = req.body
        let foodCollectionEntry = new model.foodCollection({
            restaurnt_id,
            foodDescription,
            pickUpTime
        })
        await foodCollectionEntry.save()
        res.status(200).json({msg: "Record added sucessfully"})
    }catch(e){
        return res.status(500).json({ error: e.message });
    }
})

userRouter.get("/api/accept-ngo/:id/:ngo_id/:deliveryType", async(req, res) => {
    try{
        const {id,ngo_id, deliveryType} = req.params;
        const existingFoodCollection = await model.foodCollection.findOne({ _id: id }); 
        if(deliveryType != "self"){
            existingFoodCollection.status = "accept"
        }else{
            existingFoodCollection.status = "in-process"
        }
        existingFoodCollection.ngo_id = ngo_id;
        await existingFoodCollection.save();
        const restaurant = await model.User.findById({ _id: existingFoodCollection.restaurnt_id });
        const combineData = {
            name: restaurant.name,
            address: restaurant.address,
            phone: restaurant.phone,
            foodDescription: existingFoodCollection.foodDescription,
            status: existingFoodCollection.status,
            createdAt: existingFoodCollection.createdAt,
            pickUpTime: existingFoodCollection.pickUpTime,
            id: existingFoodCollection._id,
            ngo_id: existingFoodCollection.ngo_id
        }
        let cart = new model.ngoCart(combineData);
        await cart.save();
        return res.status(200).json({msg: "Accepetd"});
    }catch(e){
        return res.status(500).json({ error: e.message });
    }
})

userRouter.post("/api/accpet-volunteer/:id", async(req, res) => {
    try{
        // id- collection id's
        const existingFoodCollection = await model.foodCollection.findOne({ _id: req.params.id });
        existingFoodCollection.status = "in-process"
        await existingFoodCollection.save();
        const restaurant = await model.User.findById({ _id: existingFoodCollection.restaurnt_id });
        const ngo = await model.User.findById({ _id: existingFoodCollection.ngo_id });
        const combineData = {
            restaurantName: restaurant.name,
            restaurantAddress: restaurant.address,
            restaurantPhone: restaurant.phone,
            fooDescription: existingFoodCollection.fooDescription,
            ngoName: ngo.name,
            ngoAddress: ngo.address,
            ngoPhone: ngo.phone,
            createdAt: existingFoodCollection.createdAt,
            pickUpTime: existingFoodCollection.pickUpTime,
            status: existingFoodCollection.status,
            id: existingFoodCollection._id
        }
        let cart = new model.volunteerCart(combineData);
        await cart.save()
        return res.status(200).json({ msg: "Accepetd" });
    }catch(e){
        return res.status(500).json({ error: e.message });
    }
})

userRouter.get("/api/ngoCart/:id", async(req, res) => {
    try{
        const carts = await model.ngoCart.find({ngo_id:req.params.id});
        const data = carts.map(cart => {
            return {
                restaurantName: cart.name,
                restaurantAddress: cart.address,
                pickUpTime: cart.pickUpTime,
                status: cart.status,
                id: cart._id,
            }
        })
        return res.status(200).json(data);
    }catch(e){
        return res.status(500).json({ error: e.message });
    }
})
userRouter.get("/api/view-cart-details-ngo/:id", async(req, res) => {
    try{
        console.log(req.params.id)
        const cart = await model.ngoCart.findById({_id: req.params.id});
        const data = {
            restaurantName: cart.name,
            restaurantAddress: cart.address,
            restaurantPhone: cart.phone,
            foodDescription: cart.foodDescription,
            createdAt: cart.createdAt,
            status: cart.status,
        }
        return res.status(200).json(data);
    }catch(e){
        return res.status(500).json({ error: e.message });
    }
})
userRouter.get("/api/delivery/:id", async (req, res) => {
    try {
        const collection = await model.foodCollection.findById({ngo_id:req.params.id});
        collection.status = "complete"
        const cartNgoUser = await model.ngoCart.findOne({id:req.params.id})
        // const cartVolUser = await model.volunteerCart.findOne(req.params.id)
        const cartNgo = await model.ngoCart.findByIdAndDelete(cartNgoUser._id);
        // const cartVol = await model.volunteerCart.findByIdAndDelete(cartVolUser._id);
        await collection.save()
        await cartNgo.save()
        // await cartVol.save()
        return res.status(200).json({msg: "delivered"})
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
})
userRouter.get("/api/filter-for-restaurnt/:id", async(req, res) => {
    try{
        req.setTimeout(30000)
        const restaurantId = req.params.id;
        const foodCollectionEntries = await model.foodCollection.find({ restaurnt_id: restaurantId })
        const restaurant = await model.User.findById(req.params.id);
        const dataToSend = foodCollectionEntries.map(entry => {
            return {
                restaurantName: restaurant.name,
                restaurantAddress: restaurant.address,
                pickUpTime: entry.pickUpTime,
                status: entry.status,
                id: entry._id
            };
        });
        return res.status(200).json(dataToSend)
    }catch(e){
        return res.status(500).json({ error: e.message });
    }
})


userRouter.get("/api/filter-for-ngo/:city/:district", async(req, res) => {
    try{
        const city = req.params.city;
        const district = req.params.district;
        const query = {
            'address.city': city,
            'address.district': district,
            userType: "Restaurant"
        };
        const users = await model.User.find(query);
        const userIds = users.map(user => user._id);
        const foodCollectionQuery = {
            'restaurnt_id': { $in: userIds },
        }
        const foodCollections = await model.foodCollection.find(foodCollectionQuery);
        const combinedData = foodCollections.map(entry => {
            const restaurant = users.find(user => user._id.toString() === entry.restaurnt_id.toString());
            return {
                restaurantName: restaurant.name,
                restaurantAddress: restaurant.address,
                pickUpTime: entry.pickUpTime,
                status: entry.status,
                id: entry._id
            };
        });
        return res.status(200).json(combinedData);
    }catch(e){
        return res.status(500).json({ error: e.message });
    }
})

userRouter.get("/api/filter-for-volunteer/:city/:district", async(req, res) => {
    try{
        const city = req.params.city;
        const district = req.params.district;
        const query = {
            'address.city': city,
            'address.district': district,
            userType: "restaurnt"
        };
        const users = await model.User.find(query);
        const userIds = users.map(user => user._id);
        const foodCollectionQuery = {
            'restaurnt_id': { $in: userIds },
            'status': "accept" 
        }
        const foodCollections = await model.foodCollection.find(foodCollectionQuery);
        const combinedData = foodCollections.map(entry => {
            const restaurant = users.find(user => user._id.toString() === entry.restaurnt_id.toString());
            const ngo = users.find(user => user._id.toString() === entry.ngo_id.toString());
            return {
                restaurantName: restaurant.name,
                restaurantAddress: restaurant.address,
                ngoName: ngo.name,
                ngoAddress: ngo.address,
                pickUpTime: entry.pickUpTime,
                status: entry.status,
                id: entry._id
            };
        });
        return res.status(200).json(combinedData);
    }catch(e){
        return res.status(500).json({ error: e.message });
    }
})
userRouter.get("/api/view-details-restaurnt/:id", async(req, res) => {
    try{
        const foodCollection = await model.foodCollection.findById(req.params.id);
        const restaurant = await model.User.findById({_id: foodCollection.restaurnt_id});
        const combineData = {
            restaurantName : restaurant.name,
            restaurantAddress : restaurant.address,
            restaurantPhone: restaurant.phone,
            fooDescription: foodCollection.foodDescription,
            createdAt: foodCollection.createdAt,
            status: foodCollection.status
        }
        if(foodCollection.ngo_id){
            const ngo = await model.User.findById({ _id: foodCollection.ngo_id });
            if (ngo) {
                combineData.ngoName =  ngo.name,
                combineData.ngoAddress = ngo.address
            }
        }
        
        return res.status(200).json(combineData)
    }catch(e){
        return res.status(500).json({ error: e.message });
    }
})



userRouter.get("/api/delete/:id", async(req, res) => {
    try{
        const deleteCollection = await model.foodCollection.findByIdAndDelete(req.params.id);
        if (!deleteCollection) {
            return res.status(404).json({ msg: "Data Not Found" });
        }
        return res.status(200).json({ msg: "Deleted Sucessfully" });
    }catch(e){
        return res.status(500).json({ error: e.message });
    }
})

// delivery sucessfully
userRouter.post("/api/delivery/:id/", async (req, res) => {
    try {
        const collection = await model.foodCollection.findById(req.params.id);
        collection.status = "complete"
        const cartNgoUser = await model.ngoCart.findOne(req.params.id)
        const cartVolUser = await model.volunteerCart.findOne(req.params.id)
        const cartNgo = await model.ngoCart.findByIdAndDelete(cartNgoUser._id);
        const cartVol = await model.volunteerCart.findByIdAndDelete(cartVolUser._id);
        await collection.save()
        await cartNgo.save()
        await cartVol.save()
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
})

module.exports = userRouter;