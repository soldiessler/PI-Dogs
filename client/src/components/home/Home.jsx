import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDogs, sortByName, getTemperaments, sortByWeight, filterByTemperament, filterByCreated } from "../../redux/actions";
import SearchBar from "../searchBar/SearchBar";
import Card from "../card/Card";
import Pagination from "../pagination/Pagination";
import { Link } from "react-router-dom";

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
    <div>
      <h2 className={style.brand}>DOGS</h2>

      <div className={style.row}>
       <div className={style.sort}>
        <select className={style.select} onChange={(e)=> handleSortByName(e)}>
          <option className={style.option} value="asc">A-Z</option>
          <option className={style.option} value="des">Z-A</option>
        </select>
      </div>

        <div className={style.sort}>
          <select className={style.select} onChange={(e)=> handleSortByWeight(e)}>
          <option className={style.option} disabled>Weight</option>
            <option className={style.option} value="min">Min Weight</option>
            <option className={style.option} value="max">Max Weight</option>
          </select>
        </div>
      
        <div className={style.sort}>
          <select className={style.select} onChange={(e)=> handleFilterByCreated(e)}>
             <option className={style.option} value="all">All</option>
            <option className={style.option} value="db">Created</option>
            <option className={style.option} value="api">Api</option>
          </select>
        </div>

        <div className={style.sort_by_temp}>
          <select className={style.select_by_temp} onChange={(e)=> handleFilterByTemperament(e)}>
            <option key={1} className={style.option} value="all">Temperaments</option>
            {
              temperaments.map(temp =>(
                <option key={temp.id} className={style.option} value={temp.name} >{temp.name}</option>
              ))
            }
          </select>
        </div>
      
      <Link to={"/create"}>
        <button className={style.btn_create}>Create your Breed</button>
      </Link>
      <SearchBar /> 
      </div>
      <div className={style.container}>
        {currentDogs?
        currentDogs.map((d, i) => 
        <div key={i} className={style.cards_container}>
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
       <Pagination dogsPerPage={dogsPerPage} dogs={filtred.length} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
      </div>

    </div>
  )
}

//i = index: posicion del perrito entre los perritos

//<//Pagination
//        dogs = {filtred.length} //cantidad de perritos
 //       dogsPerPage = {dogsPerPage} //cantidad de perritos por pagina
 //       setCurrentPage = {setCurrentPage}
 //       currentPage = {currentPage} //pagina actual
  //    />