import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Alluser() {
    const [allUsers, setAllUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token")){
            const user =JSON.parse(localStorage.getItem("username"));
            if(user.role !="Admin"){
                navigate("/");
            }
        }
        
        },
    
       
    []);

    function handleEdit(id){
        
    }
    function handleDelete(id){
        console.log(id);
        
        
        
        
       
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/users/allusers');
                setAllUsers(response.data.allUsers);
                console.log("Allusers:", allUsers);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData(); 
    }, []);

    

    return (
        <div className='allUser'>
            <table>
                <thead>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Edit</th>
                    <th>Delete</th>
                    </thead>
                    <tbody>
                    {allUsers?.map(user=>(
                        <tr key ={user._id}>
                           <td>{user.name}</td>
                           <td>{user.username}</td>
                           <td>{user.email}</td>
                           <td>{user.role}</td>
                           <td>
                <span className='editIcon' onClick={()=>handleEdit()}><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
  <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
  <path d="M16 5l3 3" />
</svg></span>
</td>
          <td>
          <span className='deleteIcon' onClick={()=>handleDelete()}>
            
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M4 7l16 0" />
  <path d="M10 11l0 6" />
  <path d="M14 11l0 6" />
  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
</svg>
</span>
</td>


                        </tr>
                    ))}
                    </tbody>
                    
            </table>
        </div>
    )
}

export default Alluser;
