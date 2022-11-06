import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, postDog } from "../../redux/actions";
import style from "./Create.module.css"

export default function Create(){
  const dispatch = useDispatch();
  const stateTemperaments = useSelector((state) => state.temperaments);

  const [dog, setDog ] = useState({
    name: "",
    image: "",
    min_height: "",
    max_height: "",
    min_weight: "",
    max_weight: "",
    life_span: "",
    temperament: [],
  })

  function handleSelect(e){
    if (dog.temperament.includes(e.target.value))
      return alert(`This breed is ${e.target.value}, we know it!`);
    if (dog.temperament.length < 8) {
      setDog({
        ...dog,
        temperament: [...dog.temperament, e.target.value]
      });
    } else {
      alert("Those are too many temperaments...");
    }
  }

  async function handleSubmit(){
    dispatch(postDog(dog))
    alert("Breed created!")
  }

  function handleChange(e) {
    setDog({
      ...dog,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    dispatch(getTemperaments());
    console.log(dog.temperament)
  }, []);

  return (
    <div>
      <div className={style.create_row}>
        <h2 className={style.brand}>DOGS</h2>
        <h1 className={style.create_h1}>Create your breed</h1>
      </div>
      <form onSubmit={handleSubmit} className={style.create_form}>
        <div className={style.create_row}>
          <div className={style.create_column}>
            <div className={style.create_row}>
              <label className={style.create_label}>Breed Name:</label>
              <input className={style.create_input_1} name="name" value={dog.name} onChange={handleChange}/>
            </div>
            <div className={style.create_row}>
              <label className={style.create_label}>Image:</label>
              <input className={style.create_input_1} name="image" value={dog.image} onChange={handleChange}/>
            </div>
            <div className={style.create_row}>
              <label className={style.create_label}>Min Height:</label>
              <input className={style.create_input} name="min_height" value={dog.min_height} onChange={handleChange}/>
              <label className={style.create_label}>Max Height:</label>
              <input className={style.create_input} name="max_height" value={dog.max_height} onChange={handleChange}/>
            </div>
            <div className={style.create_row}>
              <label className={style.create_label}>Min Weight:</label>
              <input className={style.create_input} name="min_weight" value={dog.min_weight} onChange={handleChange}/>
              <label className={style.create_label}>Max Weight:</label>
              <input className={style.create_input} name="max_weight" value={dog.max_weight} onChange={handleChange}/>
            </div>
            <div className={style.create_row}>
              <label className={style.create_label}>Life Span:</label>
              <input className={style.create_input} name="life_span" value={dog.life_span} onChange={handleChange}/>
            </div>
          </div> 
          <div className={style.create_temps}>
            <select className={style.create_select} onChange={handleSelect}>
              {stateTemperaments.length > 0 &&
              stateTemperaments.map((t) => {
                return <option key={t.id} value={t.name}>{t.name} </option>;
              })}
            </select>
          </div>
        </div>
        <div className={style.create_row}>
          <div className={style.create_box}>
            {dog.temperament.length > 0 &&
            dog.temperament.map((t) => {
              return <p className={style.create_temp} key={t}>{t}</p>;
            })}
          </div>
          <button className={style.create_dog}type="submit">Create</button>
        </div>
      </form>
      
    </div>
  )
  
}
