import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Property from './Property';
import axios from 'axios';

function Agentdashboard() {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('');
  const [properties, setProperties] = useState([]);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Get the stored data from localStorage
    const storedData = localStorage.getItem('username');

    // Check if there's any data stored
    if (storedData) {
      // Parse the JSON data back into an object
      const userData = JSON.parse(storedData);

      // Now, you can access the properties of the userData object
      const { role, email } = userData;
      setUserRole(role);
      setUserEmail(email); // Set userEmail state

      // Check the role and navigate if needed
      if (role !== "Agent") {
        navigate("/");
      }
    } else {
      console.log('No data found in localStorage.');
    }
  }, [navigate]);

  const deleteProperty = async (id) => {
    try {
      const res = await axios.delete("http://localhost:5000/property/" + id);
      if (res.data.message) {
        const newProperty = properties.filter((p) => p._id !== id);
        setProperties(newProperty);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // Fetch properties data from your API or database
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:5000/property/dashboard');
   

        // Filter properties where Listing_Agent_Email matches user email
        const filteredProperties = response.data.properties.filter(
          (property) => property.Listing_Agent_Email === userEmail
        );
        setProperties(filteredProperties);
        
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties(); // Call the async function
  }, [userEmail]);

  return (
    <div className='agentDashboard'>
      <Navbar />

      <div className='addPropertyButton'>
        <button className='' onClick={() => { navigate("/create") }}>Add Property</button>
      </div>

      {properties.length === 0 && <p>No properties found for this agent.</p>}
      <Property properties={properties} delfunc={deleteProperty} />
    </div>
  );
}

export default Agentdashboard;
