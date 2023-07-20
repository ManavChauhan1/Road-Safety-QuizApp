import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

//Redux actions
import * as Action from "../redux/question_reducer"
import { getServerData } from '../helper/helper.js';

//Fetch question hook to fetch api data and set value to store
export const useFetchQuestion = () => {
    const [getData, setGetData] = useState({isLoading : false, apiData : [], serverError : null})
    const dispatch = useDispatch();

    useEffect(()=>{
        setGetData(prev =>({...prev, isLoading : true}));

        //Asynnc function to fetch backend data
        (async () => {
            try{
                
                const [{questions, answers}] = await getServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/questions`, (data) => data);
                // console.log({questions, answers});

                if(questions.length > 0){
                    setGetData(prev =>({...prev, isLoading : false}));
                    setGetData(prev =>({...prev, apiData : {questions, answers}}));

                    //Dispatch an action
                    dispatch(Action.startExamAction({question : questions, answers})); 
                }
                else{
                    throw new Error("No Question Available.");
                }
            }catch(error){
                setGetData(prev =>({...prev, isLoading : false}));
                setGetData(prev =>({...prev, serverError : error}));
            }
        })();
    }, [dispatch]);

    return [getData, setGetData];
}


//MoveActionDispatch Function
export const MoveNextQuestion = () => (dispatch) =>{
    try{
        dispatch(Action.moveNextAction())   //Increase Trace value by one
    } catch(error){
        console.log(error)
    }
}

//PrevActionDispatch Function
export const MovePrevQuestion = () => (dispatch) =>{
    try{
        dispatch(Action.movePrevAction())   //Decrease Trace value by one
    } catch(error){
        console.log(error)
    }
}