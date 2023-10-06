import React,{useEffect, useState} from 'react';
import axios from 'axios';
import Property from './Property';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';




function Dashboard() {
   
    const navigate = useNavigate();

    const [properties,setProperties]=useState([]);
    useEffect(()=>{
        async function getProperties(){
            try{
                const res  = await axios.get("http://localhost:5000/property/dashboard");
                console.log(res.data);
                setProperties(res.data.properties);                

            }
            catch(errors)
            {
                console.log(errors);
            }

        }
getProperties();
    },[])

    useEffect(()=>{
        if(!localStorage.getItem("token")){
            navigate("/login");


        }

    },[])
    const deleteProperty= async (id)=>{
        try{
           const res= await axios.delete("http://localhost:5000/property/"+id);
           if(res.data.message){
            
            const newProperty = properties.filter(p=>{
                console.log(p._id,id);
                return p._id!==id;
            })
            setProperties(newProperty);
            

           }
            
            }
        catch(error){
            console.log(error);
        }        
    }
  return (
    
    <div className='dashboard'>
         <Navbar/>
  

        <div className='addPropertyButoon'>
            <button className='' onClick={()=>{navigate("/create")}}>Add Property</button>
        </div>
        
        
        
        {properties?.length< 0 && <p>Properties not found</p>}
        <Property  properties={properties} delfunc={deleteProperty}/>
        
        

    </div>
  )
}

export default Dashboard