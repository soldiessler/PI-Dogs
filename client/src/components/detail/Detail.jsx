import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getDogDetail } from "../../redux/actions";
import style from "./Detail.module.css"
import { Link } from "react-router-dom";
import Header from "../header/Header"
import Footer from "../footer/Footer";

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
    min_life,
    max_life,
    temperament,
  } = useSelector((state) => state.detail);

  useEffect(()=> {
    dispatch(getDogDetail(id))
  },[dispatch, id]);

  return(
    <div>
      <Header/>
      <div className={style.detail}>
        <h1 className={style.detail_name}>{name}</h1>
        <h3 className={style.detail_temperament}>{temperament}</h3>
        <div className={style.detail_dog}>
          <img className={style.detail_pic} src={image} alt="dog" width='150rem' height='150rem'/>
          <div className={style.detail_data}>
            <h3>Min Height: {min_height} Cm</h3>
            <h3>Min Weight: {min_weight} Lbs</h3>
            <h3>Min Life: {min_life} years</h3>
          </div>
          <div className={style.detail_data}>
            <div className={style.detail_data}>
              <h3>Max Height: {max_height} Cm</h3>
              <h3>Max Weight: {max_weight} Lbs</h3>
              <h3>Max Life: {max_life} years</h3>
            </div>
            <Link to="/home" className={style.detail_back}> 
              Back
            </Link>
        </div>

        </div> 
       
      </div>
      <Footer/>
    </div>
   
  )
}