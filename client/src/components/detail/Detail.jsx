import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getDogDetail } from "../../redux/actions";
import style from "./Detail.module.css"
import { Link } from "react-router-dom";

export default function Detail(){

  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    name,
    image,
    min_weight,
    max_weight,
    min_height,
    max_height,
    life_span,
    temperament,
  } = useSelector((state) => state.detail);

  useEffect(()=> {
    dispatch(getDogDetail(id))
  },[dispatch, id]);

  return(
    <div className={style.detail_container}>
      <div>
        <h1 className={style.detail_name}>{name}</h1>
      </div> 
      <div>
        <h3 className={style.detail_temperament}>{temperament}</h3>
      </div>
      <div className={style.row}>
        <img className={style.detail_pic} src={image} alt="dog" width='150rem' height='150rem'/>
        <div className={style.column}>
          <div className={style.detail_data} >
            <h3>Min Weight: {min_weight}Kg</h3>
            <h3>Max Weight: {max_weight}Kg</h3>
            <h3>Min Height: {min_height}Cm</h3>
            <h3>Max Height: {max_height}Cm</h3>
            <h3>Life Span: {life_span}</h3>
            <h3>Life Span: {life_span}</h3>
          </div>
          <Link to="/home">
            <button className={style.detail_btn}>Back</button>
          </Link>
        </div>
      </div>
     
    </div>
  )
}