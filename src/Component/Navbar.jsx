import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
 // Import your CSS file
import "./Navbar.css"
const Navbar = () => {
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
        setData(res);
      })
      .catch((err) => console.log(err));
  };

  const savedRecipesCount = data.length; 


  return (
    <div className="navbar">
        <Link to="/">
            <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHkAAAB5CAMAAAAqJH57AAAAz1BMVEX/wSL////51XYfGhcAAAD42ID52Yf/vg7+vxL/xCHBliwAAxirq6rQ0dBTUlKmpqa3t7fBwcE0MzNHR0YYFRf4vibisCj1wzVRQiMAABMZEw3/xir/yCMJAAAgGRmVlJTz8/M2LRwSDAorKyrp6elmZWP/zS3LnymuiCYACBNoUxrpuzlaSBn46LP45am5kCrcrTHutydZRyDAmjoSDhanhi94YSmMcSttWih0dHOEg4IlIiIpIxiAaCpFOR3GoDMxJw+XeClKOxUeFwc8Lg/m0XbyAAAEgUlEQVRoge3bCXOiPBgHcFiyuw2tJ1chASpVUeRdjoJH64X2+3+mDajtu1t3BBTcg//Ylj4z5ddEAplkpOhrhaL/+3yNfCPy56/XyCcif7mhys9NJVdyJVdyJVdyJVfyny9DCK8iI5F1WBHlw/PJEHmegF2fv5Vl3nex4HlUVj+XDM1ph/Gf+EBjGEYL+Cef6VgmKl5G4W3Aa7ysxTCjMZocaHwgh9lanUOGpswk5j5a/Bt5yatMdA4ZjQPmWPhplrNcUg7Gmd7pnL19LMX3NoUmx2g5W5PzjSo0lrUP8H0Joyqh96Cy/zn0hYznyHn3RD7PqAaB64Q2VCaYZmxxbhlPhqClqwrX5RRVbwE5xMXLyeMJL2RQa6hKu9tW1EYLDBf9rA+urDKUxCTTQNVnBmPo5Gumq/z9ruyltzPK+KlzuGUqhqGqKgCqaigKw+/KnUHqXs8oi+RRYcTR1Ha9N3t+1vXZrFdvq8yuyt+KxciQvdUMrk6iNh9o+iFZ1YoPmmpc5Azmlk3b35lldZZwjzWaboJncqSDJk3XHpPqs1qgDO4So94gTiP+L2Y68e+4pHoHipQbO4P7YR2x3ihN7jI1uttN3uhul67x3dJkWud6L8zjrKa3mZce90yXJT/odQDIDbv90ia3bwDq+kNpbe7WOMA1yZBq1gFX65bW5qTdPfDSqt0B0Hs4lEqSySjW6491vfZeKE3+kOJlrf0xWily81j+8t7+F+U29zGP1RVWyReTk0ngT+FKkVvH8pf39r8oM0eekkx1hZUsN4qUlXar9qu02kqBsqaAX0fRipIpYS7zh7wvib2VeHkupT1VRhm60/tDtAPNz99qUzf1QknmFRok7IOc/WqcNnSFt2JhKzT/D1rsaNnJtZFxzg4K6vDJSms/11+ftXczIo0OlpnXHS8g4yeZDzIsvl1OpvBEXmVe8LyITAlOzr4+f18y9+bgn7sjWsklyPDn29b7ar4gxK+iZGj63g8FkT0sa6PlWlrbaYZaShliDCmM8e4Qi6GwK1FJEYdgQL4jRCpzQ1I2COKTeErZnViON7EiAQqORQ5DwQsti6VgUnTvgR+hyLInIuookuIjdhGeotPJHhhHTxvLebX6i2EUjU1ZWChhBEJhY7O+7QCw9UdgswZLKZZtd8h4J06ZWh5hkxkhF7hghXHfHErWBONwveJHaASkEDh9YSRJm+2IyNtOZ336OZJeHgBjaGzDrRhfYYkMV0YIDGAobvw+m2QGOJwnMgCL08/s9DKrSP1+Xxy6GOJ9mwdzx4iLOG6zBdy+vWvz8h6c3rNLK7vQU8YuGyJ77rCRKUuWb67kCRlBphnBAVguIjAZbJURubYNezQEJ6eC6WRhKZJpp73cRORi3mxC1xastb9ZCNC1XuOi9TpF49dX20Fji3QHYu2Tu9EpR1U8p4ynnaQPERm2FMLk9AJ6L5L7FkqmngjFL4guNZ4/hMh5JyNnylBMvQ14YfmMyci58tmp5Equ5Equ5Equ5N9V/no9+ab8JJ+j+/bpGok/O3itfAch5a1scstujwAAAABJRU5ErkJggg==' alt='xx' />
        </Link>
      <Link to="/search"> Search Recipe</Link>
      <Link to="/login">Login Page</Link>
      <Link to="/signup">Signup Page</Link>
      <Link to="/saved">
        Saved Recipe
        <span className="badge">-{savedRecipesCount}</span>
      </Link>
    </div>
  );
}

export default Navbar;
