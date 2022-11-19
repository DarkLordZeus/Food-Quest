import createSagaMiddleware from "@redux-saga/core"
import { applyMiddleware, combineReducers, createStore } from "redux"
import thunk from "redux-thunk"
import { Apireducer } from "./Apireducer"
import Set_Api_Data from "./apiSaga"
import { Statereducer } from "./statereducer"

const saga=createSagaMiddleware()
const middleware=[thunk,saga]

const rootreducer=combineReducers({Apireducer,Statereducer})

const store =createStore(rootreducer,applyMiddleware(...middleware))
saga.run(Set_Api_Data)
export default store