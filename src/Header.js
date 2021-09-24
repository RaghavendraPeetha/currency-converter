import React from 'react'
import "./Header.css"
function Header({userDetails}) {
    const {name,imageUrl}=userDetails
    return (
       
           <div className="name__cnr">
           <img src={imageUrl} alt={name} />
            <h1>{name}</h1>
           </div>
          
           
     
    )
}

export default Header
