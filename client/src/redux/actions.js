import axios from 'axios';

export const GET_DOGS = "GET_DOGS"
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS"
export const GET_DOG_NAME = "GET_DOG_NAME"
export const GET_DOG_DETAIL = "GET_DOG_DETAIL"
export const POST_DOG = "POST_DOG" 
export const FILTER_BY_TEMPERAMENT = 'FILTER_BY_TEMPERAMENT'
export const FILTER_BY_CREATED = 'FILTER_BY_CREATED'
export const SORT_BY_WEIGHT = 'SORT_BY_WEIGHT'
export const SORT_BY_NAME = 'SORT_BY_NAME'

export const DOGS = `http://localhost:3001/dogs`
export const TEMPERAMENTS = `http://localhost:3001/temperaments`
export const CREATE = `http://localhost:3001/dogs/create`


export function getDogs(){
  return async function (dispatch){
    let json = await axios(DOGS)
    return dispatch({
    type: GET_DOGS,
    payload: json.data
    })
  }
}

export function getTemperaments(){
  return async function (dispatch){
    let json = await axios(TEMPERAMENTS)
    return dispatch({
    type: GET_TEMPERAMENTS,
    payload: json.data
    })
  }
}

export function getDogName(name) {
  return async function (dispatch){
    let json = await axios.get(`${DOGS}?name=${name}`)

    if (!Array.isArray(json.data))
    return (
      alert("Did you write well? There is no breed with this name...")
    )

    return dispatch({
      type: GET_DOG_NAME,
      payload: json.data
    })
  }
}

export function getDogDetail(id){
  return async function (dispatch){
    let json = await axios(`${DOGS}/${id}`)
    return dispatch({
      type: GET_DOG_DETAIL,
      payload: json.data
    })
  }
}

export function postDog(dog){
  return async function (){
    let post = await axios.post(`${CREATE}`, dog)
    return post
  }
}

export function sortByName(payload){
  return  {
    type: SORT_BY_NAME,
    payload
  }
}


export function sortByWeight(payload){
  return  {
    type: SORT_BY_WEIGHT,
    payload
  }
}

export function filterByTemperament(payload){
  return  {
    type: FILTER_BY_TEMPERAMENT,
    payload
  }
}

export function filterByCreated(payload){
  return  {
    type: FILTER_BY_CREATED,
    payload
  }
}