const express = require("express");
const cors = require("cors");
const connectdb = require("./utils/dbconnect")
const path = require("path");
const app = express();
const port = 5000;
const PropertyRouter = require("./routes/property");
const UserRouter = require("./routes/user");
app.use(cors());
app.use(express.json());
app.use("/images",express.static(path.join(__dirname,"images")));
app.use("/property",PropertyRouter);
app.use("/users",UserRouter);








app.listen(port,()=>{console.log("App is running at port 5000;");
connectdb();

});





