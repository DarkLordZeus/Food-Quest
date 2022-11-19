import { SET_CART_ITEM_COUNT, SET_SEARCH_ITEM } from "./constactionname"


export const SetCartitemcount=(itemsincart=0)=>dispatch=>{
    dispatch({
        type:SET_CART_ITEM_COUNT,
        payload:itemsincart
    })
}

export const Setitemsearch=(name)=>dispatch=>{
    dispatch({
        type:SET_SEARCH_ITEM,
        payload:name
    })
}