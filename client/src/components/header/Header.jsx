import React from "react";
import { Link } from "react-router-dom";
import style from "./Header.module.css"

export default function Header(){
  return(
    <div className={style.header}> 
     <Link to={'/'} className={style.brand}>DOGS</Link>
    </div>
  )
}

