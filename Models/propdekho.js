

const mongoose = require('mongoose');


const PropertyScheama = new mongoose.Schema({
    

City:{type:String, required:true},
description:{type:String, required:true},
Property_Name:{type:String, required:true},
Property_Ref_No:{type:String, required:true},
Price:{type:Number, required:true},
Property_Title:{type:String, required:true},
Listing_Agent:{type:String, required:true},
Facilities:{type:String,},
Listing_Agent_Email:{type:String, required:true},
Geopoints:{ 
    latitude:{type:Number},
    longitude:{type:Number}
},
No_of_Bathrooms:{type:Number, required:true},
Unit_Type:{type:String, required:true},
Community:{type:String, required:true},
featured_on_companywebsite:{type:Boolean},
under_construction:{type:Boolean, required:true},
Views:{type:String, required:true},
Ad_Type:{type:String, required:true},
Unit_Builtup_Area:{type:Number, required:true},
No_of_Rooms:{type:Number, required:true},
Listing_Agent_Phone:{type:Number},
unit_measure:{type:String , required:true},
Permit_Id:{type:Number},
Off_Plan:{type:String},
Images:[{type:String, required:true}],
Docs:[{type:String}],

    
            
},
{
    timestamp:true
}

);

module.exports= mongoose.model("Property",PropertyScheama);



