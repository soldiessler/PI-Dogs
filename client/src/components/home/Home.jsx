import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDogs, sortByName, getTemperaments, sortByWeight, filterByTemperament, filterByCreated } from "../../redux/actions";
import { Link } from "react-router-dom";
import Header from "../header/Header"
import SearchBar from "../searchBar/SearchBar";
import Card from "../card/Card";
import Pagination from "../pagination/Pagination";
import Footer from "../footer/Footer";
import style from "./Home.module.css"


export default function Home(){
  const dispatch = useDispatch(); 
  let { temperaments, filtred} = useSelector((state) => state);

  //paginado
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage, setDogsPerPage] = useState(8);
  const lastDogIndex = currentPage * dogsPerPage; 
  const firstDogIndex = lastDogIndex - dogsPerPage; 
  const currentDogs = filtred.slice(firstDogIndex, lastDogIndex);


  useEffect(()=> {
    dispatch(getDogs()); 
    dispatch(getTemperaments()); 
  },[dispatch]); 

  
  function handleSortByName(e) {
    e.preventDefault();
    dispatch(sortByName(e.target.value));
    setCurrentPage(1)
  }

  function handleSortByWeight(e) {
    e.preventDefault();
    dispatch(sortByWeight(e.target.value));
    setCurrentPage(1)
  }

  function handleFilterByTemperament(e) {
    e.preventDefault();
    dispatch(filterByTemperament(e.target.value));
    setCurrentPage(1)
  }

  function handleFilterByCreated(e) {
    e.preventDefault();
    dispatch(filterByCreated(e.target.value));
    setCurrentPage(1)
  }

  return(
    <div className={style.page}>
      <Header/>
      
      <div className={style.nav}>
        <div>
          <select className={style.select} defaultValue="alp" onChange={(e)=> handleSortByName(e)}>
            <option className={style.option} value="alp" disabled selected>Order by name</option>
            <option className={style.option} value="asc">A-Z</option>
            <option className={style.option} value="des">Z-A</option>
          </select>
        </div>

        <div>
          <select className={style.select} defaultValue="weight" onChange={(e)=> handleSortByWeight(e)}>
            <option className={style.option} value="weight" disabled selected>Order by weight</option>
            <option className={style.option} value="min">Min Weight</option>
            <option className={style.option} value="max">Max Weight</option>
          </select>
        </div>
      
        <div>
          <select className={style.select} onChange={(e)=> handleFilterByCreated(e)}>
            <option className={style.option} value="all">All</option>
            <option className={style.option} value="db">Created</option>
            <option className={style.option} value="api">Api</option>
          </select>
        </div>

        <div>
          <select className={style.select} onChange={(e)=> handleFilterByTemperament(e)}>
            <option key={1} className={style.option} value="all">Temperaments</option>
            {temperaments.map(temp =>(
                <option key={temp.id} className={style.option} value={temp.name} >{temp.name}</option>
              ))}
          </select>
        </div>

        <Link to={"/create"} className={style.create}>Create your Breed</Link>
        <SearchBar />

      </div>

      <div className={style.container}>
        {currentDogs?
        currentDogs.map((d, i) => 
        <div key={i}>
          <Card 
            key={i}
            id={d.id} 
            name={d.name} 
            image={d.image}
            min_weight={d.min_weight}
            max_weight={d.max_weight}
            temperament={d.temperament}
          />
        </div>
        ) : 
        (<h1>Loading Dogs</h1>)}
      </div>
      
      <Pagination 
        dogsPerPage={dogsPerPage} 
        dogs={filtred.length} 
        setCurrentPage={setCurrentPage} 
        currentPage={currentPage}
      />

      <Footer/>
    </div>
  )
}
