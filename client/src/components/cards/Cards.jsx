import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "../card/Card";
import { getDogs } from "../../redux/actions";

export default function Cards(){
  const dispatch = useDispatch();
  const dogsToRender = useSelector((state) => state.filtred);

  useEffect(()=> {
    dispatch(getDogs())
  },[]);

  return(
    <div>
      <h2>Dogs</h2>
      {dogsToRender.length > 0 ? 
      dogsToRender.map((d, i) => <Card 
      key={i}
      name={d.name} 
      image={d.image}
      min_weight={d.min_weight}
      max_weight={d.max_weight}
      temperament={d.temperament}/>) : 
      (<h1>Loading Dogs</h1>)}
    </div>
  )
}

//i = index: posicion del perrito entre los perritos