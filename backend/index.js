const express = require("express");
const authRouter = require("./route/authRouter");
const userRouter = require("./route/userRouter");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 8000;
const app = express();
app.use(cors())
app.use(express.json());
app.use(authRouter)
app.use(userRouter)


const DB = "mongodb+srv://admin:prathamesh1305@cluster0.q9ne6tg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose
    .connect(DB)
    .then(() => {
        console.log("Connection is sucessful");
    })
    .catch((e) => {
        console.log(e);
    })

app.listen(PORT, "0.0.0.0", async () => {
    console.log("Server running on port 8000");
})