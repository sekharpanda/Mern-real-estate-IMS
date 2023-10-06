import React, { useEffect } from 'react';
import './Property.css';
import {useNavigate} from "react-router-dom";


function Property({properties,delfunc}) {

    const navigate = useNavigate();

    function handleEdit(id){
        navigate(`/property/edit/${id}`);
    }
    function handleDelete(id){
        console.log(id);
        delfunc(id);
        
        
        
       
    }
    

  return (
    
    <div>
         <table >
       
      <thead>
        <tr>
        <th>Ad Type</th>
          <th>City</th>
          <th>Property Name</th>
          <th>Property Ref No</th>
          <th>Price</th>
          <th>Property Title</th>
          <th>Listing Agent</th>
         

          <th>Number of Bathrooms</th>
          <th>Unit Type</th>
          <th>Community</th>
          <th>Featured </th>
          <th>Under Construction</th>
        
          
          <th>Unit Builtup Area</th>
          <th>Number of Rooms</th>
        
          <th>Unit Measure</th>
         
         
          <th>No Of Images</th>
          <th>No Of Files</th>
          <th>Edit</th>
          <th>Delete</th>
          
          
        </tr>
      </thead>
     

      <tbody>
       
        {properties.map(property=>
            <tr key={property.id}>
              <td>{property.Ad_Type}</td>
            <td>{property.City}</td>
            <td>{property.Property_Name}</td>
            <td>{property.Property_Ref_No}</td>
            <td>{property.Price}</td>
            <td>{property.Property_Title}</td>
            <td>{property.Listing_Agent}</td>
           
           
            <td>{property.No_of_Bathrooms}</td>
            <td>{property.Unit_Type}</td>
            <td>{property.Community}</td>
            <td>{property.featured_on_companywebsite ? 'Yes' : 'No'}</td>
            <td>{property.under_construction ? 'Yes' : 'No'}</td>
          
          
            
            <td>{property.Unit_Builtup_Area}</td>
            <td>{property.No_of_Rooms}</td>
         
            <td>{property.unit_measure}</td>
           
            <td>{property.Images.length}</td>
            <td>{property.Docs.length}</td>
            <td>
                <span className='editIcon' onClick={()=>handleEdit(property._id)}><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
  <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
  <path d="M16 5l3 3" />
</svg></span>
</td>
          <td>
          <span className='deleteIcon' onClick={()=>handleDelete(property._id)}>
            
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
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
                    
            
            )}
         
      </tbody>
      

    </table>
    </div>
  
  )
}

export default Property