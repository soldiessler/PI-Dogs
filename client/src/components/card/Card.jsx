import React from "react";

export default function Card({name, image, temperament, min_weight, max_weight}){
  return(
    <div>
      <div>
        <h1>{name}</h1>
      </div>
      <div>
        <img src={image} alt="dog"/>
        <div>
        <h3>Min Weight: {min_weight} - Max Weight: {max_weight}</h3>
      </div>
      </div>
      <div>
        <h3>{temperament}</h3>
      </div>
    </div>
  )
}