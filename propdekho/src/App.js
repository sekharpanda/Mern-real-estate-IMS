import logo from './logo.svg';
import './App.css';
import Submitproperty from './Components/Submitproperty';
import Imageupload from './Components/Imageupload';
import { useState } from 'react';
import axios from 'axios';
import checkError from './utils/vallidation';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Editproperty from './Components/Editproperty';
import Registeruser from './Components/Registeruser';
import Loginuser from './Components/Loginuser';
import Navbar from './Components/Navbar';
import Alluser from './Components/Alluser';
import Agentdashboard from './Components/Agentdashboard';



function App() {
  const [step,setStep]= useState(0);
  const [errors,setErrors]= useState(null);
  const [img,setImg]=useState([]);
  const [docs,setDocs]=useState([]);
  const navigate = useNavigate();
  const [Property,setProperty]= useState({
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
 
 });

 
  
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
 console.log(docs);
  function getPage(){
    switch(step){
      case 0:return <Submitproperty handleChange={handleChange} 
      Property={Property} setProperty={setProperty} errors={errors}/>;
      case 1:return <Imageupload setProperty={setImg} images={img} setDocs={setDocs} docs ={docs}/>
    }
  }
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
  
 async function handleNext(){
 const error = checkError(Property);
 if(Object.keys(error).length>0)
 {
  console.log(error);
  setErrors(error);
  return ;
 }
  if(step===1)
  {
    console.log([...obj2FormData(Property)]);
   const formData = obj2FormData(Property);
   Array.from(img).forEach(image=>formData.append("images",image,image.originalname));
   Array.from(docs).forEach(doc=>formData.append("docs",doc,doc.name));

    try{
      const res = await axios({
        method: 'post',
        url: 'http://localhost:5000/property/create-property',
  
    data: formData
        
    })
      
    console.log(res.data);
    setProperty({
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
      
    }
   )
   setImg([]);
   setStep(0);
   const roledata =localStorage.getItem('username');
   if (roledata) {
    // Parse the JSON data back into an object
    const userData = JSON.parse(roledata);

    // Now, you can access the properties of the userData object
    const { role, email } = userData;
    

    // Check the role and navigate if needed
    if (userData.role !== "Agent") {
      navigate("/");
    }
  } else {
    navigate("/agentdashboard");;
  }

    
 
    }
    catch(error){
       console.log(error);
    }

 
  }
  else{

    setStep(prev=>prev+1);
  }
    
 }
 function handlePrevious(){
  setStep(prev=>prev-1);
 }

  return (
    <div className="App">
      
      <Routes>
        <Route path='/create' element={<>
          {getPage()}
      {step!=0 && <button onClick={handlePrevious}> Previous</button>}
      <button onClick={handleNext}>{step==1?"submit":"Next"} </button>
        
        </>}/>
       
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/property/edit/:id' element={<Editproperty/>}/>
        <Route path='/register' element={<Registeruser/>}/>
        <Route path ='/login' element={<Loginuser/>}/>
        <Route path ='/allusers' element={<Alluser/>}/>
        <Route path ='/agentdashboard' element={<Agentdashboard/>}/>
      </Routes>
      
    </div>
  );
}


export default App;
