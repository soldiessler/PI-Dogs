import React from "react";
import { Link } from "react-router-dom";
import style from "./LandingPage.module.css"
import doggo from "../../assets/doggo.png"

export default function LandingPage () {
  return (
    <div className={style.landing_container}> 
        <div className={style.landing_text}>
          <h1 className={style.brand_title}>DOGS</h1>
          <p className={style.brand_desc}>We're here to help you find <br /> the breed that best suits you and <br /> your lifestyle!</p>
            <Link to='/home'>
              <button className={style.brand_btn}>Let's go</button>
            </Link>
        </div>
      <img className={style.img} src={doggo} alt="doggo"></img>
    </div>
  )
}