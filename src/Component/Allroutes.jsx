import React from 'react'
import RecipeSearch from './RecipeSearch'
import Login from './Login'
import Signup from './Signup'
import { Route, Routes } from 'react-router-dom'
import RecipeDetails from './RecipeDetails'
import SavedRecipe from './SavedRecipe'
import Home from './Home'

const Allroutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/search" element={<RecipeSearch/>}></Route>
        <Route path="/recipe" element={<RecipeDetails />}> </Route>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/saved" element={<SavedRecipe/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
      </Routes>
    </div>
  )
}

export default Allroutes
