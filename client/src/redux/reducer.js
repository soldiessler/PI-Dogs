import { GET_DOGS, GET_TEMPERAMENTS, GET_DOG_NAME, GET_DOG_DETAIL, 
  POST_DOG, SORT_BY_NAME, SORT_BY_WEIGHT, FILTER_BY_TEMPERAMENT, FILTER_BY_CREATED } from "./actions"

const initialState = {
  dogs: [],
  temperaments: [],
  filtred: [],
  detail: [],
}

export default function rootReducer(state  = initialState, action){

  switch(action.type){
    case GET_DOGS:
      return {
        ...state,
        dogs: action.payload,
        filtred: action.payload,
      };

    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload,
      };

    case GET_DOG_NAME:
      return {
        ...state,
        filtred: action.payload,
      };

    case GET_DOG_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };

    case POST_DOG:
      return {
        ...state,
      };

    case SORT_BY_NAME:
      const alphabetical = action.payload === "asc" ? state.filtred.sort((a,b) => {
        if(a.name < b.name) return -1;
        if(a.name > b.name) return 1;
        return 0; 
      }) :
      state.filtred.sort((a,b) => {
        if(a.name > b.name) return -1;
        if(a.name < b.name) return 1;
        return 0;
      })
      
      return {
        ...state,
        filtred: alphabetical
      }
    
    case  SORT_BY_WEIGHT:
      const weight = action.payload === "min" ? 
      state.filtred.sort((a,b) => {
        if(a.min_weight < b.min_weight) return -1;
        if(a.min_weight > b.min_weight) return 1;
        return 0; 
      }) :
      state.filtred.sort((a,b) => {
        if(a.max_weight > b.max_weight) return -1;
        if(a.max_weight < b.max_weight) return 1;
        return 0;

      })
      
      return {
        ...state,
        filtred: weight
      }

    case FILTER_BY_TEMPERAMENT:
        
      const filteredTemp = action.payload === 'all' ? 
      state.dogs : 
      state.dogs.filter(e => {
        return e.temperament?.includes(action.payload)
      })

      return {
        ...state,
        filtred: filteredTemp,
      };

    case FILTER_BY_CREATED:
      const dogss = state.dogs;
      const filterCreated = action.payload === 'db' ?
       dogss.filter(d => d.id.length === 36) : 
      dogss.filter(d => d.id.length !== 36)
      return {
        ...state,
        filtred: action.payload === 'all' ? state.dogs : filterCreated
      };

    default:
      return state;
  }

}