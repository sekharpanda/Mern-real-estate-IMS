import React from 'react';
import { useNavigate } from 'react-router-dom';




function Navbar() {
   const name = JSON.parse(localStorage.getItem("username"));
    const navigate = useNavigate();

     const handlelogout=()=>{
        localStorage.removeItem("token");
        navigate("/login");
     }
     
  return (
    <div className='navbar'>
      <h3>Welcome {name?.username}</h3>
        {localStorage.getItem("token")&& 
    <button className='logutButoon'onClick={handlelogout}> Logout</button>}
        

       </div>
  )
}

export default Navbar