import { configureStore, createSlice } from "@reduxjs/toolkit"

//Create Reducer
export const questionReducer = createSlice({
    name: 'questions',
    initialState : {
        queue : [], //To store questions
        answers: [], //To store answers
        trace: 0  //The question on which user is currently present
    },
    reducers : {
         startExamAction : (state, action)=>{
            let {question, answers} = action.payload
            return {
                ...state,
                queue : question,
                answers : answers
            }
         },
         moveNextAction : (state) => {
            return{
                ...state,
                trace : state.trace + 1
            }
         },
         movePrevAction : (state) => {
            return{
                ...state,
                trace : state.trace - 1
            }
         },
         resetAllAction : () => {
            return{
                queue : [], //To store questions
                answers: [], //To store answers
                trace: 0  //The question on which user is currently present
            }
         }
    }
})

export const { startExamAction, moveNextAction , movePrevAction, resetAllAction} = questionReducer.actions;

export default questionReducer.reducer;