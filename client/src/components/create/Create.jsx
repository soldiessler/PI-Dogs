import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, postDog } from "../../redux/actions";
import style from "./Create.module.css"
import Header from "../header/Header"
import Footer from "../footer/Footer";

const validate = (input) => {
  let errors = {};

  if(!input.name){
    errors.name = 'The breed must be a name'
  }
  
  if(input.name.length < 4 || input.name.length > 12 ){
    errors.name = 'The name be a length 4 - 12'
  }

  if(input.name && !/^[a-zA-Z]*$/.test(input.name)){
    errors.name = 'The name can not contain numbers or symbols'
  }

  if(input.min_height && !/^[0-9]*$/.test(input.min_height)){
    errors.min_height = 'It must be only numbers'
  }

  if(input.max_height && !/^[0-9]*$/.test(input.max_height)){
    errors.max_height = 'It must be only numbers'
  }

  if(input.min_weight && !/^[0-9]*$/.test(input.min_weight)){
    errors.min_weight = 'It must be only numbers'
  }

  if(input.max_weight && !/^[0-9]*$/.test(input.max_weight)){
    errors.max_weight = 'It must be only numbers'
  }

  if(input.min_life && !/^[0-9]*$/.test(input.min_life)){
    errors.min_life = 'It must be only numbers'
  }

  if(input.max_life && !/^[0-9]*$/.test(input.max_life)){
    errors.max_life = 'It must be only numbers'
  }

  if (!input.min_height || input.min_height <= 0){
    errors.min_height = 'The height must be bigger than zero'
  }

  if (!input.min_weight || input.min_eight <= 0){
    errors.min_weight = 'The weight must be bigger than zero'
  }

  if (!input.min_life || input.min_life <= 0){
    errors.min_life = 'The life must be bigger than zero'
  }

 if(parseInt(input.min_height) > parseInt(input.max_height)){
    errors.comparation1 = 'The weight min can not be bigger than the max weight'
  }

  if(parseInt(input.min_weight) > parseInt(input.max_weight)){
    errors.comparation2 = 'The height min can not be bigger than the max height'
  }

  if(parseInt(input.min_life) > parseInt(input.max_life)){
    errors.comparation3 = 'The life min can not be bigger than the max life'
  }

  /*
  min_(name) <= 0  &&  min_(name) > max_(name)  ----->   max_(name) <= 0
  */

  return errors
}

export default function Create() {
  const dispatch = useDispatch();
  const allTemperaments = useSelector((state) => state.temperaments)
  const [errors , setErrors] = useState({})
  const [note, setNote] = useState('');
  const [input, setInput] = useState({
    name : "",
    image: "",
    min_height: 0,
    max_height: 0,
    min_weight: 0,
    max_weight: 0,
    min_life: 0,
    max_life: 0,
    temperament: [],
  })

  const handleChange = (e) =>{
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })

    setErrors(validate({
      ...input,
      [e.target.name] : e.target.value
    }))
  }

  useEffect(() => {
    dispatch(getTemperaments()) 
  },[dispatch])

  const handleSelect = (e) => {
    if (input.temperament.includes(e.target.value)){
      setNote(`This breed is ${e.target.value}, we know it :)`);
    } else if (input.temperament.length >= 5) {
      setNote('Those are too many temperaments, we will not add more');
    } else {
      setNote('');
      setInput({
        ...input,
        temperament : [...input.temperament, e.target.value]
      })
    }
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    dispatch(postDog(input))
    alert("Breed created") 
  }

  let err = errors && 
    (errors.name ||
     errors.min_height ||
     errors.max_height ||
     errors.min_weight ||
     errors.max_weight ||
     errors.min_life ||
     errors.max_life ||
     errors.comparation1 ||
     errors.comparation2 ||
     errors.comparation3 ||
     !input.name.length ||
     input.min_height <= 0 ||
     input.max_height <= 0 ||
     input.min_height <= 0 ||
     input.max_height <= 0 ||
     input.min_life <= 0 ||
     input.max_life <= 0 ||
     input.min_height > input.max_height ||
     input.min_weight > input.max_weight ||
     input.min_life > input.max_life ||
     !input.temperament.length) ?
     true : false

  return(
    <div>
      <Header/>
      <h1 className={style.create_name}>Create your breed</h1>
      <form onSubmit={e => handleSubmit(e)} className={style.create_form}>
        <div>
          <div className={style.create_bw}>
            <label className={style.create_label}>Breed Name:</label>
            <input className={style.create_inputL} type="text" name="name" value={input.name} onChange={e => handleChange(e)} />
          </div>
          <span className={style.create_span}> {errors.name}</span>
         
          <div className={style.create_bw}>
            <label className={style.create_label}>Image:</label>
            <input className={style.create_inputL} name="image" value={input.image} onChange={e => handleChange(e)}/>
          </div>
          <span className={style.create_span}></span>

          <div>
            <label className={style.create_label}>Min Height:</label>
            <input min='0' className={style.create_input1} type="number" name="min_height" value={input.min_height} onChange={e => handleChange(e)}/>
            <label className={style.create_labelRight}>Max Height:</label>
            <input min='0' className={style.create_input2} type="number" name="max_height" value={input.max_height} onChange={e => handleChange(e)}/>
          </div>
          <span className={style.create_span}>{errors.min_height}{errors.max_height}{errors.comparation1}</span>
   
          <div>
            <label className={style.create_label}>Min Weight:</label>
            <input min='0' className={style.create_input3} type="number" name="min_weight" value={input.min_weight} onChange={e => handleChange(e)}/>
            <label className={style.create_labelRight}>Max Weight:</label>
            <input min='0' className={style.create_input4} type="number" name="max_weight" value={input.max_weight} onChange={e => handleChange(e)}/>
          </div>
          <span className={style.create_span}>{errors.min_weight}{errors.max_weight}{errors.comparation2}</span>
     
          <div>
            <label className={style.create_label}>Min Life:</label>
            <input min='0' className={style.create_input5} type="number" name="min_life" value={input.min_life} onChange={e => handleChange(e)}/>
            <label className={style.create_labelRight}>Max Life:</label>
            <input min='0' className={style.create_input6} type="number" name="max_life" value={input.max_life} onChange={e => handleChange(e)}/>
          </div>
          <span className={style.create_span}>{errors.min_life}{errors.max_life}{errors.comparation3}</span>
          
          <div className={style.create_t}>
            {input.temperament.length > 0 &&
            input.temperament.map((t) => {
            return (
              <p className={style.create_p} key={t}>{t}</p>
            )
          })}
          </div>
          

          {note ? <span>{note}</span> : null }

        </div>
        
        <div className={style.create_temp}>
          <select className={style.create_select} onChange={handleSelect} >
            <option value='all' disabled selected defaultValue>Temperaments</option>   
            {allTemperaments.map(e => {
              return (
                <option value={e.name} key={e.id}>{e.name}</option>
              );
            })}
          </select>
        </div>

        <div className={style.create_b}>
          {err ? <span> Must fill all the fields </span> : null }
          <button disabled= {err} 
          className={style.create_btn}>Create</button>
        </div>
      </form>
      <Footer/>
    </div>
  )
}