
    
  
    const checkError = (Property) => {
        const errors = { };
      
        if (!Property.City) {
          errors.City = "Please Enter the City Name";
        }
        if (!Property.Property_Ref_No) {
          errors.Property_Ref_No = "Please Enter the Property_Ref_No";
        }
        if (!Property.Price) {
          errors.Price = "Please Enter the Price";
        }
        if (!Property.Property_Title) {
          errors.Property_Title = "Please Enter the Property_Title";
        }
        if (!Property.Listing_Agent) {
          errors.Listing_Agent = "Please Enter the Listing_Agent Name";
        }
        if (!Property.Listing_Agent_Email) {
          errors.Listing_Agent_Email = "Please Enter the Listing_Agent_Email";
        }
        if (!Property.Facilities) {
          errors.Facilities = "Please Enter the Facilities";
        }
        if (!Property.Geopoints.latitude) {
          errors.Geopoints = {
            ...errors.Geopoints,
            latitude: "Please Enter Latitude"
          };
        }
        if (!Property.Geopoints.longitude) {
          errors.Geopoints = {
            ...errors.Geopoints,
            longitude: "Please Enter Longitude"
          };
        }
        if (!Property.No_of_Bathrooms) {
          errors.No_of_Bathrooms = "Please Enter the No_of_Bathrooms";
        }
        if (!Property.Unit_Type) {
          errors.Unit_Type = "Please Enter Unit_Type";
        }
        if (!Property.Community) {
          errors.Community = "Please Enter Community";
        }
        if (!Property.Views) {
          errors.Views = "Please Enter Views";
        }
        if (!Property.Ad_Type) {
          errors.Ad_Type = "Please Enter Ad_Type";
        }
        if (!Property.Unit_Builtup_Area) {
          errors.Unit_Builtup_Area = "Please Enter Unit_Builtup_Area";
        }
        if (!Property.No_of_Rooms) {
          errors.No_of_Rooms = "Please Enter No_of_Rooms";
        }
        if (!Property.Listing_Agent_Phone) {
          errors.Listing_Agent_Phone = "Please Enter Listing_Agent_Phone";
        }
        if (!Property.unit_measure) {
          errors.unit_measure = "Please Enter unit_measure";
        }
        if (!Property.Permit_Id) {
          errors.Permit_Id = "Please Enter Permit_Id";
        }
        if (!Property.description) {
          errors.description = "Please Enter Description";
        }
        return errors;
      };
      export default checkError ;
      
   
   
