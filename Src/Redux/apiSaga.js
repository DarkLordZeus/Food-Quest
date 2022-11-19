import {GET_FOOD_RECOMMENDATION,SET_FOOD_DATA,SEARCH_FOOD, GET_FOOD_BY_ID, SET_FOOD_BY_ID, SET_FOOD_BY_SEARCH} from './constactionname'
import { takeEvery,put } from '@redux-saga/core/effects'
import {takeLatest} from '@redux-saga/core/effects'
import { APIKEYSPOONACULAR } from '../Utils/constants'


function* Getapidata(){
    
    let result = yield fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEYSPOONACULAR}&number=6&limitLicense=true&sort=random&addRecipeInformation=true&addRecipeNutrition=true&instructionsRequired=true`)
    result = yield result.json()
    yield put({type:SET_FOOD_DATA,payload:result})
}


function* Searchfoodbyid(data){
    let result = yield fetch(`https://api.spoonacular.com/recipes/${data.payload}/information?apiKey=${APIKEYSPOONACULAR}&includeNutrition=true`)
    result = yield result.json()
    yield put({type:SET_FOOD_BY_ID,payload:result})

}

function* Searchfoodbyquery(data){
    let result = yield fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEYSPOONACULAR}&query=${data.payload}&addRecipeNutrition=false&fillIngredients=false&instructionsRequired=false&addRecipeInformation=true&number=25`)
    result = yield result.json()
    yield put({type:SET_FOOD_BY_SEARCH,payload:result})

}


function* Set_Api_Data(){
    yield takeEvery(GET_FOOD_RECOMMENDATION,Getapidata)
    yield takeEvery(GET_FOOD_BY_ID,Searchfoodbyid)
    yield takeLatest(SEARCH_FOOD,Searchfoodbyquery)
}


export default Set_Api_Data