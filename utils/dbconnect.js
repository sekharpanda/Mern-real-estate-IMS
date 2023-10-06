const  mongoose = require("mongoose");

const url = "mongodb+srv://sekharp720:9238kZlskwV7LNoA@cluster0.j6l8e8c.mongodb.net/?retryWrites=true&w=majority";
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
