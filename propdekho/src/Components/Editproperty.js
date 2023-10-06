import React, { useState, useRef, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';

function Editproperty() {

    const editor = useRef(null);
    const {id}=  useParams();
    const navigate = useNavigate();
    const [errors,setErrors]= useState(null);
  const [img,setImg]=useState([]);


  function obj2FormData(obj, formData = new FormData()) {
    const createFormData = function (obj, subKeyStr = "") {
      for (let i in obj) {
        let value = obj[i];
        let subKeyStrTrans = subKeyStr ? subKeyStr + "[" + i + "]" : i;
  
        if (typeof value === "string" || typeof value === "number" || typeof value === "boolean" )  {
          formData.append(subKeyStrTrans, value);
        } else if (typeof value === "object") {
          createFormData(value, subKeyStrTrans);
        }
      }
    };
    createFormData(obj);

  return formData;
  }


    const [Property,setProperty]=useState({
        City:"",
    Property_Name:"",
    Property_Ref_No:"",
    Price:"",
    Property_Title:"",
    Listing_Agent:"",
    Listing_Agent_Email:"",
    Facilities:"",
    Geopoints:{latitude:"", longitude:""},
    No_of_Bathrooms:"",
    Unit_Type:"",
    Community:"",
    featured_on_companywebsite:false,
    under_construction:false,
    Views:"",
    Ad_Type:"",
    Unit_Builtup_Area:"",
    No_of_Rooms:"",
    Listing_Agent_Phone:"",
    unit_measure:"",
    Permit_Id:"",
    Off_Plan:false,
    description:"",
    Images1:[],
 
    });
 useEffect(()=>{
    const getProperties= async()=>{
        try{
            const res = await axios.get(`http://localhost:5000/property/${id}`);
            console.log(res.data);
            setProperty({...res.data.property,Images1:res.data.property.Images.map(img=>({url:img,deleted:false}))});
           ;
        }
        catch(error){
            console.log(error);
        }

    }
    getProperties();

 },[])
    function handleChange(e)
    {
    
       setProperty(p=>{
         if(e.target.dataset.id){
            return{
               ...p,[e.target.dataset.id]:{
                  ...p[e.target.dataset.id],
                  [e.target.name]:e.target.value}
            }
         }
         else{
           if(e.target.type=="checkbox"){
            return{
               ...p,[e.target.name]:!p[e.target.name]
            }
           }
            return{
               ...p,[e.target.name]:e.target.value
           }
         }
           
         
       })
    }

    const handleImage =(e)=>{
        setImg(prev=>[...Array.from(prev),...Array.from(e.target.files)]);
        
     }
     const handleClose=(idx,type)=>{
      if(type=="imgURL"){
        const Pimg = [...Property.Images1];
        Pimg[idx].deleted = true;
        setProperty({...Property,Images1:Pimg})
      }
      else{
        const newImage= [...Array.from(img)];
        newImage.splice(idx,1)
        setImg(newImage);

      }
        
        
     }

     async function  handleedit(){
        try{
            console.log(Property);
            const formData = obj2FormData(Property);
            Array.from(img).forEach(image=>{
                formData.append("images",image,image.name)
            })
            const res = await axios.put("http://localhost:5000/property/"+ id,formData);
            console.log(res.data);
            navigate("/");
        }
        catch(error){
            console.log(error);
        }

     }

  return (
    <div className='editProperty'>
       <div className="editPropertyForm" >

          

<label htmlFor="city">City:</label>
<input onChange={handleChange} type="text" id="city" name="City" value={Property.City} required/><br/><br/>
{errors?.City && <div id="error"> {errors?.City}</div>}
<label htmlFor="property_name">Property Name:</label>
<input onChange={handleChange} type="text" id="property_name" name="Property_Name" value={Property.Property_Name} required/><br/><br/>
{errors?.Property_Name && <div id="error"> {errors?.Property_Name}</div>}

<label htmlFor="property_ref_no">Property Reference Number:</label>
<input onChange={handleChange} type="text" id="property_ref_no" name="Property_Ref_No" value={Property.Property_Ref_No} required/><br/><br/>
{errors?.Property_Ref_No && <div id="error"> {errors?.Property_Ref_No}</div>}


<label htmlFor="price">Price:</label>
<input onChange={handleChange} type="number" id="price" name="Price" value={Property.Price} required/><br/><br/>
{errors?.Price && <div id="error"> {errors.Price}</div>}



<label htmlFor="property_title">Property Title:</label>
<input onChange={handleChange} type="text" id="property_title" name="Property_Title" value={Property.Property_Title} required/><br/><br/>
{errors?.Property_Title && <div id="error"> {errors.Property_Title}</div>}



<label htmlFor="listing_agent">Listing Agent:</label>
<input onChange={handleChange} type="text" id="listing_agent" name="Listing_Agent" value={Property.Listing_Agent} required/><br/><br/>
{errors?.Listing_Agent && <div id="error"> {errors.Listing_Agent}</div>}


<label htmlFor="listing_agent_email">Listing Agent Email:</label>
<input onChange={handleChange} type="email" id="listing_agent_email" name="Listing_Agent_Email" value={Property.Listing_Agent_Email} required/><br/><br/>
{errors?.Listing_Agent_Email && <div id="error"> {errors.Listing_Agent_Email}</div>}


<label htmlFor="facilities">Facilities:</label>
<input onChange={handleChange} type="text" id="facilities" name="Facilities" value={Property.Facilities}/><br/><br/>
{errors?.Facilities && <div id="error"> {errors.Facilities}</div>}



<label htmlFor="latitude">Latitude:</label>
<input onChange={handleChange} type="text" data-id="Geopoints" name="latitude" value={Property.Geopoints.latitude}/><br/><br/>
{errors?.Geopoints?.latitude && <div id="error"> {errors.Geopoints.latitude}</div>}




<label htmlFor="longitude">Longitude:</label>
<input onChange={handleChange} type="text" data-id="Geopoints" name="longitude" value={Property.Geopoints.longitude}/><br/><br/>
{errors?.Geopoints?.longitude && <div id="error"> {errors.Geopoints.longitude}</div>}




<label htmlFor="bathrooms">Number of Bathrooms:</label>
<input onChange={handleChange} type="number" id="bathrooms" name="No_of_Bathrooms" value={Property.No_of_Bathrooms} required/><br/><br/>
{errors?.No_of_Bathrooms && <div id="error"> {errors.No_of_Bathrooms}</div>}



<label htmlFor="unit_type">Unit Type:</label>
<input onChange={handleChange} type="text" id="unit_type" name="Unit_Type" value={Property.Unit_Type} required/><br/><br/>
{errors?.Unit_Type && <div id="error"> {errors.Unit_Type}</div>}



<label htmlFor="community">Community:</label>
<input onChange={handleChange} type="text" id="community" name="Community" value={Property.Community} required/><br/><br/>
{errors?.Community && <div id="error"> {errors.Community}</div>}




<label htmlFor="featured">Featured on Company Website:</label>
<input onChange={handleChange} type="checkbox" id="featured" name="featured_on_companywebsite" checked={Property.featured_on_companywebsite} /><br/><br/>



<label htmlFor="under_construction">Under Construction:</label>
<input onChange={handleChange} type="checkbox" id="under_construction" name="under_construction" checked={Property.under_construction} /><br/><br/>


<label htmlFor="off_plan">Off Plan:</label>
<input onChange={handleChange} type="checkbox" id="off_plan" name="Off_Plan" checked={Property.Off_Plan} /><br/><br/>


<label htmlFor="views">Views:</label>
<input onChange={handleChange} type="text" id="views" name="Views" value={Property.Views} required/><br/><br/>
{errors?.Views && <div id="error"> {errors.Views}</div>}



<label htmlFor="ad_type">Ad Type:</label>
<input onChange={handleChange} type="text" id="ad_type" name="Ad_Type" value={Property.Ad_Type} required/><br/><br/>
{errors?.Ad_Type && <div id="error"> {errors.Ad_Type}</div>}




<label htmlFor="builtup_area">Unit Builtup Area:</label>
<input onChange={handleChange} type="number" id="builtup_area" name="Unit_Builtup_Area" value={Property.Unit_Builtup_Area} required/><br/><br/>
{errors?.Unit_Builtup_Area && <div id="error"> {errors.Unit_Builtup_Area}</div>}



<label htmlFor="rooms">Number of Rooms:</label>
<input onChange={handleChange} type="number" id="rooms" name="No_of_Rooms" value={Property.No_of_Rooms} required/><br/><br/>
{errors?.No_of_Rooms && <div id="error"> {errors.No_of_Rooms}</div>}




<label htmlFor="listing_agent_phone">Listing Agent Phone:</label>
<input onChange={handleChange} type="tel" id="listing_agent_phone" name="Listing_Agent_Phone" value={Property.Listing_Agent_Phone} required/><br/><br/>{errors?.Listing_Agent_Phone && <div id="error"> {errors.Listing_Agent_Phone}</div>}





<label htmlFor="unit_measure">Unit Measure:</label>
<input onChange={handleChange} type="text" id="unit_measure" name="unit_measure" value={Property.unit_measure} required/><br/><br/>
{errors?.unit_measure && <div id="error"> {errors.unit_measure}</div>}




<label htmlFor="permit_id">Permit ID:</label>
<input onChange={handleChange} type="number" id="permit_id" name="Permit_Id" value={Property.Permit_Id} required/><br/><br/>
{errors?.Permit_Id && <div id="error"> {errors.Permit_Id}</div>}





<label htmlFor="description">Description</label>
<JoditEditor
  ref={editor}
  value={Property.description}

  
  tabIndex={1} // tabIndex of textarea
  
    // preferred to use only this option to update the content for performance reasons
  onChange={newContent => 
  setProperty(prev =>({...prev,description:newContent}))
}

/>
{errors?.description && <div id="error"> {errors.description}</div>}

{Property.Images1.map((img,idx)=>{
    if(!img.deleted){
        return <div key={idx}>
        <img  width="10%" src={`http://localhost:5000/${img.url}`}/>
        <span className='close'  onClick={()=>handleClose(idx,"imgURL")}> X</span>

   </div>
    }
})
}

{Array.from(img)?.map((img,idx)=>{
    return <div key={idx}>
    <img  width="10%" src={`${URL.createObjectURL(img)}`}/>
    <span className='close'  onClick={()=>handleClose(idx,"selectedIMG")}> X</span>

</div>
}
    )}

<label htmlFor="images">Select Images:</label>
        <input type="file" onChange={handleImage} name="images" id="images" accept="image/*" multiple required/><br/>

        <button onClick={handleedit}>submit </button>





















</div>

    </div>
  )
}

export default Editproperty