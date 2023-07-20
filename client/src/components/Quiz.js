import React, { useEffect, useState } from "react";

import Questions from './Questions';

import { MoveNextQuestion, MovePrevQuestion } from "../hooks/FetchQuestion";
import { pushAnswer } from "../hooks/setResult";

//Redux store import
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function Quiz(){

    const [check, setChecked] = useState(undefined);

    const result = useSelector(state => state.result.result);
    const { queue, trace} = useSelector(state => state.questions);
    const dispatch = useDispatch();


    //Next button event handler
    function onNext(){
        
        if(trace < queue.length){
            //Update the trace value by 1 using Move next action
            dispatch(MoveNextQuestion());

            //Insert a new result to the array
            if(result.length <= trace){
                dispatch(pushAnswer(check));
            }
        }
        //Reset the value of the check variable
        setChecked(undefined)
    }

    

    //Prev button event handler
    function onPrev(){
        if(trace > 0){
            //Decrease trace value by 1 using MovePrevAction
            dispatch(MovePrevQuestion());
        }
    }

    function onChecked(check){
        // console.log(check);
        setChecked(check)
    }

    //Finish exam after the last question
    if(result.length && result.length >= queue.length){
        return <Navigate to = {'/result'} replace = "true"></Navigate>
    }

    return(
        <div className="container">
             

            {/*Display Questions */}
            <Questions onChecked={onChecked}></Questions>

            <div className="grid">
                { trace > 0 ? <button className="btn prev" onClick={onPrev}>Prev</button> : <div></div>}
                <button className= "btn next" onClick={onNext}> Next</button>
            </div>
        </div>
    )
}