import {combineReducers, configureStore} from '@reduxjs/toolkit';


//Call reducers
import questionReducer from './question_reducer';
import resultReducer from './result_reducer';
const rootReducer = combineReducers({
    questions : questionReducer,
    result : resultReducer
})

//Create store with reducer
export default configureStore( { reducer : rootReducer} );