import React from "react";
import style from "./Footer.module.css"

export default function Footer(){
  return(
    <div className={style.footer}> 
     <p className={style.footer_text}>Made by 
     <a href="https://github.com/soldiessler" className={style.footer_link}> Sol Diessler
     </a> </p>
    </div>
  )
}
