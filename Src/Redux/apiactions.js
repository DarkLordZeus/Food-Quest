import { GET_FOOD_RECOMMENDATION , SEARCH_FOOD ,GET_FOOD_BY_ID,CANCEL} from "./constactionname";

export const getRecommendation=()=>dispatch=>{
    dispatch({
        type:GET_FOOD_RECOMMENDATION
    })
}

export const getSearchfood=(query)=>dispatch=>{
    dispatch({
        type:SEARCH_FOOD,
        payload:query
    })
}

export const getFoodbyId=(id)=>dispatch=>{
    dispatch({
        type:GET_FOOD_BY_ID,
        payload:id
    })
}

export const Clearsearchdata=()=>dispatch=>{
    dispatch({
        type:CANCEL
        
    })
}