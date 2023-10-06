import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Loginuser() { 

    const[data,setData]= useState({email:"",password:""});
    const[error,setError]=useState("");
    const navigate = useNavigate();

    const loginuser= async()=>{
        try{
            const  res = await axios.post("http://localhost:5000/users/loginUser",data);
            console.log(res.data);
            if (res.data){
                localStorage.setItem("token",res.data.token);
                localStorage.setItem("username",JSON.stringify(res.data.username));
                if(res.data.username.role==="Agent"){
                    navigate("/agentdashboard");

                }
                else{
                navigate("/");
            }
            }
        }
        catch(error){
            console.log(error);
            const errorMessage = error.response.data.message || error.message;
            setError(errorMessage);
            }

    }
    const  handleChange=(e)=>{
        setData(prev=>({...prev,[e.target.name]:e.target.value}))

    }
  return (
    <div className='loginUser'>
        <h3> Welcome To Your Inventory Management System</h3>


                    <label htmlFor="email">Enter Email:</label>
                    <input type="email" id="email" name="email" onChange={handleChange} value={data.email} required /><br /><br />

                    <label htmlFor="password">Enter Password:</label>
                    <input type="password" id="password" name="password" onChange={handleChange} value={data.password} required /><br /><br />

                    
                         <button onClick={loginuser}>Login</button>
                        <p>{error}</p> 

                        <p> Not yet  Resgistered, Kindly Register here</p>
                        <button className='registerButton' onClick={()=>{navigate("/register")}}>Register</button>
    </div>
  )
}

export default Loginuser