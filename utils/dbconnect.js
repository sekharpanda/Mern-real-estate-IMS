const  mongoose = require("mongoose");

const url = "Put Your Mongodb Url";
const connectdb = async ()=>{
   try {
      await mongoose.connect(url);
      console.log("Databse Connected");
   }
   catch(error){
      console.log(error.message);
   }
}
module.exports= connectdb;
