import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { getDogName } from "../../redux/actions";
import { useHistory } from "react-router-dom";
import  search  from "../../assets/search.png"
import style from "./SearchBar.module.css"

export default function SearchBar(){

  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const history = useHistory();
  
  const handleInput = (e) => {
      e.preventDefault()
      setSearchValue(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(searchValue)
    dispatch(getDogName(searchValue))
    setSearchValue('')
    history.push('/home')
  }

  return (
    <div>
      <form className={style.searchbar}>
        <input className={style.sb_input} type="text" onChange={e => handleInput(e)} value={searchValue} placeholder="Search a breed..."/>
        <button className={style.searchbar_ico} type="submit" onClick={e => handleSubmit(e)}><img src={search} className={style.searchbar_ico}/></button>
      </form>
    </div>
  )
}