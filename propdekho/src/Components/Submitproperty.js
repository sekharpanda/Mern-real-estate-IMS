import React, { useState, useRef } from 'react';
import axios from 'axios';
import JoditEditor from 'jodit-react';
import Select from 'react-select';
import cityOptions from './Cityoptions';
import './Submitproperty.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js'; 
import 'bootstrap/dist/js/bootstrap.min.js'; 



function Submitproperty({ handleChange, Property, setProperty, errors }) {
  const editor = useRef(null);
  const user = JSON.parse(localStorage.getItem('username'));
  const [showFacilityModal, setShowFacilityModal] = useState(false);
  const [selectedFacilities, setSelectedFacilities] = useState([]);

  const facilityOptions = [
  
    "Air Conditioning",
    "Heating",
    "Balcony",
    "Walk-in Closet",
    "Fireplace",
    "Hardwood Floors",
    "Carpeted Floors",
    "Tile Floors",
    "High Ceilings",
    "Ceiling Fans",
    "Washer and Dryer",
    "Dishwasher",
    "Refrigerator",
    "Microwave",
    "Garbage Disposal",
    "Central Vacuum",
    "Wine Cellar",
    "Home Theater",
    "Gym",
    "Sauna",
    "Jacuzzi/Hot Tub",
    "Indoor Pool",
    "Swimming Pool",
    "Outdoor Kitchen",
    "BBQ/Grill Area",
    "Garden",
    "Lawn",
    "Playground",
    "Tennis Court",
    "Basketball Court",
    "Golf Course",
    "Waterfront Access",
  
    "Gated Community",
    "Security",
    "Concierge Service",
    "Elevator",
    "Clubhouse",
    "Business Center",
    "Pet-Friendly",
    "Walking Trails",
    "Park",
    "Picnic Area",
    "Recycling Center",
    "Gated Community",
    "Security",
    "Concierge Service",
    "Elevator",
    "Clubhouse",
    "Business Center",
    "Pet-Friendly",
    "Walking Trails",
    "Park",
    "Picnic Area",
    "Recycling Center",
    "Solar Panels",
    "Insulation",
    "Home Automation",
    "Smart Lighting",
    "Security System",
    // Add more facility options here
  ];

  const handleFacilityChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setSelectedFacilities([...selectedFacilities, name]);
    } else {
      setSelectedFacilities(selectedFacilities.filter((facility) => facility !== name));
    }
  };

  const openFacilityModal = () => {
    setShowFacilityModal(true);
  };

  const closeFacilityModal = () => {
    setShowFacilityModal(false);
  };

  return (
    <div className="submithtmlForm">
      <p>Welcome {user.name}</p>

      <div className="label-input-container">
        <label htmlFor="ad_type">Ad Type:</label>
        <select onChange={handleChange} id="ad_type" name="Ad_Type" value={Property.Ad_Type} required>
          <option value="Sale">Sale</option>
          <option value="Rent">Rent</option>
        </select>
      </div>
      {errors?.Ad_Type && <div id="error"> {errors.Ad_Type}</div>}

      <div className="label-input-container">
        <label htmlFor="city">City:</label>
        <select
          id="city"
          name="City"
          value={Property.City}
          onChange={handleChange}
          required
        >
          {cityOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {errors?.City && <div id="error"> {errors.City}</div>}

      <div className="label-input-container">
        <label htmlFor="community">Community:</label>
        <input
          onChange={handleChange}
          type="text"
          id="community"
          name="Community"
          value={Property.Community}
          required
        />
      </div>
      {errors?.Community && <div id="error"> {errors.Community}</div>}

      <div className="label-input-container">
        <label htmlFor="unit_type">Unit Type:</label>
        <select
          onChange={handleChange}
          id="unit_type"
          name="Unit_Type"
          value={Property.Unit_Type}
          required
        >
          <option value="Apartment">Apartment</option>
          <option value="Villa">Villa</option>
          <option value="Penthouse">Penthouse</option>
          <option value="Townhouse">Townhouse</option>
        </select>
      </div>
      {errors?.Unit_Type && <div id="error"> {errors.Unit_Type}</div>}

      <div className="label-input-container">
        <label htmlFor="property_name">Property Name:</label>
        <input
          onChange={handleChange}
          type="text"
          id="property_name"
          name="Property_Name"
          value={Property.Property_Name}
          required
        />
      </div>
      {errors?.Property_Name && <div id="error"> {errors?.Property_Name}</div>}

      <div className="label-input-container">
        <label htmlFor="property_ref_no">Property Reference Number:</label>
        <input
          onChange={handleChange}
          type="text"
          id="property_ref_no"
          name="Property_Ref_No"
          value={Property.Property_Ref_No}
          required
        />
      </div>
      {errors?.Property_Ref_No && <div id="error"> {errors?.Property_Ref_No}</div>}

      <div className="label-input-container">
        <label htmlFor="price">Price:</label>
        <input
          onChange={handleChange}
          type="number"
          id="price"
          name="Price"
          value={Property.Price}
          required
        />
      </div>
      {errors?.Price && <div id="error"> {errors.Price}</div>}

      <div className="label-input-container">
        <label htmlFor="property_title">Property Title:</label>
        <input
          onChange={handleChange}
          type="text"
          id="property_title"
          name="Property_Title"
          value={Property.Property_Title}
          required
        />
      </div>
      {errors?.Property_Title && <div id="error"> {errors.Property_Title}</div>}

      <div className="label-input-container">
        <label htmlFor="listing_agent">Listing Agent:</label>
        <input
          type="text"
          id="listing_agent"
          name="Listing_Agent"
          defaultValue={Property.Listing_Agent=user.name}
          onChange={handleChange}
          required
          readOnly
        />
      </div>
      {errors?.Listing_Agent && <div id="error"> {errors.Listing_Agent}</div>}

      <div className="label-input-container">
        <label htmlFor="listing_agent_email">Listing Agent Email:</label>
        <input
          onChange={handleChange}
          type="email"
          id="listing_agent_email"
          name="Listing_Agent_Email"
          value={Property.Listing_Agent_Email=user.email}
          readOnly
          required
        />
      </div>
      {errors?.Listing_Agent_Email && <div id="error"> {errors.Listing_Agent_Email}</div>}

      <div className="label-input-container">
        <label htmlFor="facilities">Facilities:</label>
        <input
          type="text"
          id="facilities"
          name="Facilities"
          value={Property.Facilities=selectedFacilities.join(', ')}
          readOnly
          onClick={openFacilityModal}
        />
      </div>
      {errors?.Facilities && <div id="error"> {errors.Facilities}</div>}

      {/* Facility Selection Modal */}
      <div className={`modal fade ${showFacilityModal ? 'show' : ''}`} id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" style={{ display: `${showFacilityModal ? 'block' : 'none'}` }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
                           <h4 className="modal-title" id="myModalLabel">Select Facilities</h4>
                           <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeFacilityModal}><span aria-hidden="true">&times;</span></button>

            </div>
            <div className="modal-body">
              <form id="facilities-form" action="#" method="post">
                {facilityOptions.map((facility) => (
                  <div key={facility} style={{ width: '20%', display: 'inline-block' }}>
                    <input
                      name={facility}
                      type="checkbox"
                      value={facility}
                      onChange={handleFacilityChange}
                      checked={selectedFacilities.includes(facility)}
                    />
                    {facility}
                    <br />
                  </div>
                ))}
              </form>
            </div>
            <div className="modal-footer">
              <span className="error"></span>
              <button type="button" className="btn btn-default" data-dismiss="modal" onClick={closeFacilityModal}>Close</button>
              <button id="submit" type="button" className="btn btn-primary" onClick={closeFacilityModal}>Submit Facilities</button>
            </div>
          </div>
        </div>
      </div>

      <div className="label-input-container">
        <label htmlFor="latitude">Latitude:</label>
        <input
          onChange={handleChange}
          type="text"
          data-id="Geopoints"
          name="latitude"
          value={Property.Geopoints.latitude}
        />
      </div>

      <div className="label-input-container">
        <label htmlFor="longitude">Longitude:</label>
        <input
          onChange={handleChange}
          type="text"
          data-id="Geopoints"
          name="longitude"
          value={Property.Geopoints.longitude}
        />
      </div>

      <div className="label-input-container">
        <label htmlFor="bathrooms">Number of Bathrooms:</label>
        <input
          onChange={handleChange}
          type="number"
          id="bathrooms"
          name="No_of_Bathrooms"
          value={Property.No_of_Bathrooms}
          required
        />
      </div>
      {errors?.No_of_Bathrooms && <div id="error"> {errors.No_of_Bathrooms}</div>}

      <div className="label-input-container">
        <label htmlFor="featured">Featured on Company Website:</label>
        <input
          onChange={handleChange}
          type="checkbox"
          id="featured"
          name="featured_on_companywebsite"
          checked={Property.featured_on_companywebsite}
        />
      </div>

      <div className="label-input-container">
        <label htmlFor="under_construction">Under Construction:</label>
        <input
          onChange={handleChange}
          type="checkbox"
          id="under_construction"
          name="under_construction"
          checked={Property.under_construction}
        />
      </div>

      <div className="label-input-container">
        <label htmlFor="off_plan">Off Plan:</label>
        <input
          onChange={handleChange}
          type="checkbox"
          id="off_plan"
          name="Off_Plan"
          checked={Property.Off_Plan}
        />
      </div>

      <div className="label-input-container">
        <label htmlFor="views">Views:</label>
        <input
          onChange={handleChange}
          type="text"
          id="views"
          name="Views"
          value={Property.Views}
          required
        />
      </div>
      {errors?.Views && <div id="error"> {errors.Views}</div>}

      <div className="label-input-container">
        <label htmlFor="builtup_area">Unit Builtup Area:</label>
        <input
          onChange={handleChange}
          type="number"
          id="builtup_area"
          name="Unit_Builtup_Area"
          value={Property.Unit_Builtup_Area}
          required
        />
      </div>
      {errors?.Unit_Builtup_Area && <div id="error"> {errors.Unit_Builtup_Area}</div>}

      <div className="label-input-container">
        <label htmlFor="rooms">Number of Rooms:</label>
        <input
          onChange={handleChange}
          type="number"
          id="rooms"
          name="No_of_Rooms"
          value={Property.No_of_Rooms}
          required
        />
      </div>
      {errors?.No_of_Rooms && <div id="error"> {errors.No_of_Rooms}</div>}

      <div className="label-input-container">
        <label htmlFor="listing_agent_phone">Listing Agent Phone:</label>
        <input
          onChange={handleChange}
          type="tel"
          id="listing_agent_phone"
          name="Listing_Agent_Phone"
          value={Property.Listing_Agent_Phone}
          required
        />
      </div>
      {errors?.Listing_Agent_Phone && <div id="error"> {errors.Listing_Agent_Phone}</div>}

      <div className="label-input-container">
        
        <label htmlFor="ad_type">Unit Measure:</label>
        <select onChange={handleChange} id="ad_type" name="Ad_Type" value={Property.unit_measure} required>
          <option value="Sale">Sqft</option>
          <option value="Rent">Sqmt</option>
        </select>
      </div>
      
      {errors?.unit_measure && <div id="error"> {errors.unit_measure}</div>}

      <div className="label-input-container">
        <label htmlFor="permit_id"s>Permit ID:</label>
        <input
          onChange={handleChange}
          type="number"
          id="permit_id"
          name="Permit_Id"
          value={Property.Permit_Id}
          required
        />
      </div>
      {errors?.Permit_Id && <div id="error"> {errors.Permit_Id}</div>}

      <div className="label-input-container">
        <label htmlFor="description">Description:</label>
        <JoditEditor
          ref={editor}
          value={Property.description}
          tabIndex={1}
          onChange={(newContent) => setProperty((prev) => ({ ...prev, description: newContent }))}
        />
      </div>
      {errors?.description && <div id="error"> {errors.description}</div>}
    </div>
  );
}

export default Submitproperty;
