import axios from 'axios';

export const DOGS = "DOGS"  //obtener_todos
export const GET_DOGS = "http://localhost:3001/dogs"

export function getDogs(){
  return async function (dispatch){
    let back = await axios(GET_DOGS)
    return dispatch({
    type: DOGS,
    payload: back.data //pedidoalback
    })
  }
}