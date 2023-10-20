import React, { useEffect, useState } from 'react';
import './SavedRecipe.css'; // Import your CSS file
import { Button } from '@chakra-ui/react';

const SavedRecipe = () => {
  let [data, setData] = useState([]);

  useEffect(() => {
    getdata();
  }, []);

  let getdata = () => {
    fetch('https://recipe-23.onrender.com/get/saved', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setData(res);
      })
      .catch((err) => console.log(err));
  };
  let deleteData=(recipeId)=>{
    fetch(`https://recipe-23.onrender.com/get/delete-recipe/${recipeId}`,{
        method:"DELETE",
        headers:{
            "Authorization":`Bearer ${localStorage.getItem("token")}`
        },
    })
        .then(res=>res.json())
        .then(res=>{console.log(res)
            window.location.reload(false)
        }).catch(err=>console.log(err))
        
    ;

}
  return (
    <div>
      <h1 style={
      {
        marginTop:"50px"
      }
      }>Saved Recipe</h1>
    <div className="saved-recipe-container">
      
      {data.length > 0 &&
        data.map((el, index) => (
          <div className="recipe-card" key={index}>
            <img src={el.image} alt="" />
            <h1>{el.title}</h1>
            <h3>Ingredients: {el.ingredients}</h3>
            <h5>Instructions: {el.instruction}</h5>
            <Button onClick={()=>deleteData(el.recipeId)} >Delete</Button>
          </div>
        ))}
    </div>
    </div>
  );
};

export default SavedRecipe;
