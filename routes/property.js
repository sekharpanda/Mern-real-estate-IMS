const express = require("express");
const router= express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Property = require("../Models/propdekho");

const storage = multer.diskStorage(
    {
       destination:(req,file,cb)=>{
                               cb(null,path.join(__dirname,"../images"));
                                  },
                                  filename:(req,file,cb)=>{
                                     cb(null,`${Date.now()}_${file.originalname}`);
                                  }
 }
 
 );

 const fileFilter = (req,file,cb)=>{
    if(file.fieldname=="docs"){
        if(file.mimetype=="application/pdf"){
            cb(null,true);
        }
        else{
            cb(null,false);
        }
    }
    else {
        if (file.mimetype == "image/jpeg"||file.mimetype =="image/png"||file.mimetype =="image/webp"){
            cb(null,true);
        }
        else{
            cb(null,false)
        }
    }
 }
 const upload = multer({storage,fileFilter,limits:{
    fileSize:"12mb"
 }});
 
//  function uploadMiddleware(req,res,next)
//  {
//     upload.array("images",30)(req,res,error=>{
//        if(error)
//        {
//           return res.status(400).json({error:error.message})
//        }
//        const files= req.files;
//        console.log("Files",files);
//        const errors= [];
//     files.forEach(file=>{
//        const allowedType = ["image/jpeg","image/png","image/webp"];
//        const maxSize = 5*1024*1024;
//        if(!allowedType.includes(file.mimetype))
//        {
//           errors.push(`Invallid File Type:${file.originalname}`);
//        }
//        if (file.size > maxSize)
//        {
//           errors.push(`File is too large, It should not exeed 5Mb:${file.originalname}`);
 
//        }
       
//     })
//     if (errors.length>0)
//     {
//        files.forEach(file=>{
//           fs.unlinkSync(file.path)
//        })
//        return res.status(400).json({errors});
//     }
//     req.files =files;
//     next();
//     })
   
//  }


router.route("/:id").put(upload.fields([{name:"images",maxCount:30},{name:"docs",maxCount:5}]), async (req,res) =>{
    try{
       const propertyId =req.params;
 
       
    const images = [];
    const docs =[];   
       const files = req.files;
       console.log(files);
       files.images.forEach(file=>{
          const newPath = `images/${file.filename}`;
          images.push(newPath);
 
          fs.rename(file.path,newPath,error=>{
            if(error) {
             return res.status(500).json({error:error.message});
            }
          });
       })
       files.docs.forEach(file=>{
        const newPath = `images/${file.filename}`;
        docs.push(newPath);

        fs.rename(file.path,newPath,error=>{
          if(error) {
           return res.status(500).json({error:error.message});
          }
        });
     })

       console.log(Images1);
       Array.from(Images1).forEach(img=>{
          if(img.deleted=="true"){
             fs.unlinkSync(path.join(__dirname,"../"+img.url))
          }
       })
       const deletedImage = Images1.filter(img=>img.deleted!=="true").map(img=>img.url);
       const sendImg = images.concat(deletedImage);
 
       const property = await Property.findByIdAndUpdate(propertyId.id,{
          City,
          description,
          Property_Name,
          Property_Ref_No,
          Price,
          Property_Title,
          Listing_Agent,
          Facilities,
          Listing_Agent_Email,
          Geopoints,
          No_of_Bathrooms,
          Unit_Type,
          Community,
          featured_on_companywebsite,
          under_construction,
          Views,
          Ad_Type,
          Unit_Builtup_Area,
          No_of_Rooms,
          Listing_Agent_Phone,
          unit_measure,
          Permit_Id,
          Off_Plan,
          Images:sendImg,
          Docs:docs
 
       },{new:true}
       );
       res.status(200).json({message:"Property Updated Successfully", property});
    }
    catch(errors){
       console.log(errors);
    }
 });

 router.post("/create-property",upload.fields([{name:"images",maxCount:30},{name:"docs",maxCount:5}]), async (req,res)=>{
    try{
      const images = [];
      const docs =[];
  
      const files = req.files;
      console.log(files);
      files.images.forEach(file=>{
         const newPath = `images/${file.filename}`;
         images.push(newPath);

         fs.rename(file.path,newPath,error=>{
           if(error) {
            return res.status(500).json({error:error.message});
           }
         });
      })
      files.docs.forEach(file=>{
        const newPath = `images/${file.filename}`;
        docs.push(newPath);

        fs.rename(file.path,newPath,error=>{
          if(error) {
           return res.status(500).json({error:error.message});
          }
        });
     })
 const {
    City,
    description,
    Property_Name,
    Property_Ref_No,
    Price,
    Property_Title,
    Listing_Agent,
    Facilities,
    Listing_Agent_Email,
    Geopoints,
    No_of_Bathrooms,
    Unit_Type,
    Community,
    featured_on_companywebsite,
    under_construction,
    Views,
    Ad_Type,
    Unit_Builtup_Area,
    No_of_Rooms,
    Listing_Agent_Phone,
    unit_measure,
    Permit_Id,
    Off_Plan,
   }= req.body;
   const property = await Property.create({
    City,
    description,
    Property_Name,
    Property_Ref_No,
    Price,
    Property_Title,
    Listing_Agent,
    Facilities,
    Listing_Agent_Email,
    Geopoints,
    No_of_Bathrooms,
    Unit_Type,
    Community,
    featured_on_companywebsite,
    under_construction,
    Views,
    Ad_Type,
    Unit_Builtup_Area,
    No_of_Rooms,
    Listing_Agent_Phone,
    unit_measure,
    Permit_Id,
    Off_Plan,
    Images:images,
    Docs:docs
   })
   console.log("body",req.body);
res.status(201).json({message:"Property Created Successfully",property});
}

   catch(error){console.log(error.message)}
})
router.get("/dashboard", async (req,res)=>{
    try{
       const properties = await Property.find({});
       res.status(200).json({message:"Property fetched successfully", properties});
    }
    catch(errors){
       return res.status(400).json({message:errors.message});
    }
 
 })

 router.get("/:id", async(req,res)=>{
    try{
       const {id}= req.params;
       const properties = await  Property.findById(id);
       res.status(200).json({property:properties});
    }
    catch(error){
       console.log(error);
    }
 })
 
 router.delete("/:id", async(req,res)=>{
    try{
       const {id} = req.params;
       const properties = await Property.findById(id);
       properties.Images.forEach(img=>{
          fs.unlinkSync(path.join(__dirname,"../"+img));
 
       })
       await Property.findByIdAndDelete(id);
       res.status(200).json({message:"Property Deleted Succesfully"});
    }
    catch(error){
       console.log(error);
    }
 }
 )
 module.exports= router;