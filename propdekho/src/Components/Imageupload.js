import React,{useState} from 'react';
import axios from 'axios';



function Imageupload({setProperty,images,setDocs,docs}) {
 
    const handleChange =(e)=>{
        setProperty(prev=>[...Array.from(prev),...Array.from(e.target.files)]);
        
     }
     const handleClose=(img)=>{
       
        const newImage= Array.from(images).filter(ig=>ig!==img);
      
        setProperty(newImage);
        
     }

     const handledocsChange=(e)=>{
      console.log(e.target.files);
      setDocs(prev=>[...prev,...Array.from(e.target.files)]);
     }

    const closepdf=(index)=>{
      const newDocs = [...docs];
      newDocs.splice(index,1);
      setDocs(newDocs);

    }
     
  return (
    <div className="Imageupload">
 <div className='imagesShow'>
{Array.from(images).map((img,idx)=>{
    return <div key={idx}>
         <img  width="10%" src={`${URL.createObjectURL(img)}`}/>
         <span className='close'  onClick={()=>handleClose(img)}> X</span>

    </div>
}
    )}

 </div>
     
        <label htmlFor="images">Select Images:</label>
        <input type="file" onChange={handleChange} name="images" id="images" accept="image/*" multiple required/><br/>
        
        <label htmlFor="pdfs">Select Brouchers,Payament Plans, Floor Plans etc...:</label>
        <input type="file" onChange={handledocsChange} name="docs" id="docs"  multiple required/><br/>
        {Array.from(docs).map((doc,index)=>
        <div className='pdfshw'>
          {doc?.name}
          <span onClick={()=>closepdf(index)}>X</span>
        </div>
          )}

    </div>
  )
}

export default Imageupload