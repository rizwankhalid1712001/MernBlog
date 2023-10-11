const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://rizwankhalid696:Rizwan%40123456@cluster0.luohxoi.mongodb.net/?retryWrites=true&w=majority").then(()=>{
// mongoose.connect("mongodb://localhost:27017/Rizwan_B").then(()=>{
    console.log("connected!");
}).catch((err)=>{
    console.log("error", err);
})