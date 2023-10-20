import React, { useState, useEffect } from 'react';
import { Link, useNavigate,  } from 'react-router-dom';
import { Button, Input } from '@chakra-ui/react';

import './RecipeSearch.css'; // Import your CSS file

function RecipeSearch() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  let navigate=useNavigate()
  // Check if the user is authenticated on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to the login page if the user is not authenticated
      navigate('/login');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (token) {
        // Make a request to your Express.js backend with the Authorization header
        const response = await fetch(`https://recipe-23.onrender.com/get/recipes?query=${query}`, {
          method: 'GET', // Change this to GET if needed
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          if (data.recipes && Array.isArray(data.recipes)) {
            setRecipes(data.recipes);
          } else {
            console.error('Invalid data format for recipes');
          }
        } else {
          console.error('Error fetching recipes');
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="recipe-search-container"> {/* Apply a container class */}
    <h1>Search you Recipe</h1>
     <div className='logout'>
            
            <Button onClick={()=>{
                localStorage.removeItem("token")
                localStorage.removeItem("email")

navigate("/login")
            }}>LOGOUT</Button>
        </div>
        
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Search for recipes"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button  type="submit">Search</Button>
      </form>
      
      <div className="recipe-grid">
        {recipes.length > 0 &&
          recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <h1>Title: {recipe.title}</h1>
              <img src={recipe.image} alt="" />
              <Link to={`/recipe?id=${recipe.id}`}>View Details</Link>
            </div>
          ))}
      </div>
    </div>
  );
}

export default RecipeSearch;
