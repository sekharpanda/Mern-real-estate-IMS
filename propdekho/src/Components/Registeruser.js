import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Registeruser() {
    const [user,setUser]= useState({name:"",email:"",username:"",password:""});
    const [error,setError]= useState("");
    const navigate= useNavigate();

    async function submituser(){

        try{
            const res = await axios.post("http://localhost:5000/users/registeruser",user);
            console.log(res.data);
            localStorage.setItem("token",res.data.token);
            navigate("/");

        }
        catch(error)
        {
            console.log(error.response.data.message);
            const newError = error.response.data.message||error.message;
            setError(newError);
            console.log(error.message);
        }

    }
   function handleChange(e){
    setUser(prev=>{
        return {
            ...prev,[e.target.name]:e.target.value
        }
    })
   }

  return (
    
    <div className='registeruser'>
        <h3> Welcome To Your Inventory Management System</h3>
        <h4> Registration Form</h4>
        { error && <p>{error}</p>
            
        }
       
              
                    <label htmlFor="name">Enter Name:</label>
                    <input type="text" id="name" name="name" onChange={handleChange} value={user.name} required /><br /><br />

                    <label htmlFor="username">Enter Username:</label>
                    <input type="text" id="username" name="username" onChange={handleChange} value={user.value} required /><br /><br />

                    <label htmlFor="email">Enter Emailid:</label>
                    <input type="email" id="email" name="email" onChange={handleChange} value={user.email} required /><br /><br />

                    <label htmlFor="password">Enter Password:</label>
                    <input type="password" id="password" name="password" onChange={handleChange} value={user.password} required /><br /><br />

                    
                         <button onClick={submituser}>Submit</button>
            
            <p> Already Registered,login here <button className='loginButton'onClick={()=>{navigate("/login")}}> Login</button></p>


    </div>
  )
}

export default Registeruser