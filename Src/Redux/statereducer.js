import { SET_CART_ITEM_COUNT, SET_SEARCH_ITEM } from "./constactionname";



initialstate={
    countincart:0,
    itemtosearch:''
}

export const Statereducer=(state=initialstate,action)=>{
    switch (action.type) {
        case SET_CART_ITEM_COUNT:{
            return {...state,countincart:action.payload}
        }
        case SET_SEARCH_ITEM:{
            return{...state,itemtosearch:action.payload}
        }
    default:
            return state
    }
}