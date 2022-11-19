import { SET_FOOD_BY_ID, SET_FOOD_BY_SEARCH, SET_FOOD_DATA,CANCEL} from "./constactionname";

const initialstate={
    data:[],
    databyid:[],
    databysearch:[]
}

export const Apireducer=(state=initialstate,action)=>{
    switch(action.type){
        case SET_FOOD_DATA:{
                return {...state,data:action.payload}}
        case SET_FOOD_BY_ID:{
                return {...state,databyid:action.payload}
        }
        case SET_FOOD_BY_SEARCH:{
                return {...state,databysearch:action.payload}
        }
        case CANCEL:{
                return {...state,databysearch:[]}
        }
        default:
            return state
    }        
}