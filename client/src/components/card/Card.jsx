import React from "react";
import { Link } from "react-router-dom";
import style from "./Card.module.css"

export default function Card({name, image, temperament, min_weight, max_weight, id}){
  return(
    <div> 
    <Link to={`dogs/${id}`} className={style.card}>
      <div>
        <img className={style.dog_pic} src={image} alt="dog" width='150rem' height='150rem'/>
      </div>  
      <div>
        <div className={style.card_name}>
          <h1>{name}</h1>
        </div>
        <div>
          <h3 className={style.card_temperaments} >{temperament}</h3>
        </div>
        <div>
          <h3 className={style.card_weight}>Min Weight: {min_weight}Kg | Max Weight: {max_weight}Kg</h3>
        </div>
      </div>
    </Link>
    </div>
  )
}