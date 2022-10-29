import { DOGS } from "./actions"

const initialState = {
  //estados
  dogs: [],
  filtred: [],
  detail: {},
  temperaments: [],
}

export default function rootReducer(state  = initialState, action){
  switch(action.type){
    case DOGS:
      return {
        ...state,
        dogs: action.payload,
        filtred: action.payload,
      };
    default:
      return state;
  }

}