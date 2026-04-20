// App.jsx

import React from 'react';
import { useState, useEffect } from 'react'

const dummyData = [
  {
    name:"Priya",
    age:30,
    comment: "Good",
    rating: "****"
  },
  {
    name:"Nanu",
    age:31,
    comment: "Good",
    rating: "**"
  }
]

function App() {
  const [reviewData, setReviewData] = useState(dummyData);
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("called -> ", e)
    
    const formData = new FormData(e.target)
    console.log("formData -> ", formData)
    console.log("formData name-> ", formData.get("name"))
    
    const data = {
      name: formData.get("name"),
      age: formData.get("age"),
      comment: formData.get("comment"),
      rating: [...new Array(rating)].map(i => "*").join("")
    }
    
    console.log("formdata -> ",data)
    
    setReviewData(prev => [...prev, data]);
    
    e.target.reset()
    setRating(0)
  }
  
  const handleRating = (val) => {
    console.log("rating -> ", val)
    setRating(val)
  }


  return (
    <>
      <div className="main">
        <h1>Star Ratings</h1>
        <form onSubmit={handleSubmit} className="form-body">
          <input name="name" type="text" placeholder="Enter Name..."/>
          <input name="age" type="number" placeholder="Enter age..."/>
          <input name="comment" type="text" placeholder="Enter Comment/Review..."/>
          <h3>Select Ratings</h3>
          
          <div name="ratings" className="ratings">
            {[...new Array(5)].map((item, index) => 
            <span 
            style={{backgroundColor: rating >= (index + 1) ? "red" : "black"}} 
            onClick={() => handleRating(index + 1)}>{" * "}</span>)}
          </div>
  
          <button type="submit" >Submit</button>
        </form>
      </div> 
      
      <div className="review">
        {reviewData && reviewData.map(item => {
          return(
            <div className="reviewItem">
              <span>{`Name: ${item.name} | Age: ${item.age} | Rating: ${item.rating} | Review: ${item.comment} `}</span>
            </div>
          )
        })}
      </div>
      
    </>
  

  )
}

export default App